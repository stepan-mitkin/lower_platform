const {LocalStorage} = require('node-localstorage');
const appPackage = require('./package.json');
const path = require('path');
const os = require('os');
const fs = require('fs').promises;
const {app, ipcMain, BrowserWindow} = require('electron');
const authProvider = require('./authProvider');

var authentications = {};
var mainWindow;
main();

var storage;

function createConnectionId(url) {
    var connections = getConnectionsMap()
    var id = makeConnectionId()
    while (id in connections) {
        id = makeConnectionId()
    }
    connections[url] = id
    saveConnectionsMap(connections)
    return id    
}

function makeConnectionId() {
    return 'con' + Math.round(Math.random() * 8999 + 1000)
}


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: { preload: path.join(__dirname, 'preload.js') }
    });
    mainWindow.webContents.openDevTools();
}

function createWindowWhenNoWindows() {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
}

function main() {
    registerApplicationEvents();
    registerBrowserEvents();
}

async function makeDirIfNotExist(folder) {
    try {
        await fs.mkdir(folder, { recursive: true });
    } catch (error) {
    }
}

function registerApplicationEvents() {
    app.on('ready', async () => {
        await __computeAll_storage();
        createWindow();
        mainWindow.loadFile(path.join(__dirname, '../browser/index.html'));
    });
    app.on('window-all-closed', () => {
        app.quit();
    });
    app.on('activate', createWindowWhenNoWindows);
}

function registerBrowserEvents() {
    ipcMain.handle('set-item', async (event, key, value) => {
        storage.setItem(key, value);
        return true;
    });
    ipcMain.handle('get-item', async (event, key) => {
        const value = storage.getItem(key);
        return value;
    });
    ipcMain.handle('get-token', async (event, url) => {
        console.log('get-token', url);
        return 'token ' + url;
    });
    ipcMain.handle('create-connection', createConnection);
    ipcMain.handle('remove-connection', removeConnection);
    ipcMain.handle('connect-to', connectTo);
    ipcMain.handle('get-connections', getConnections);
}

function connectTo(event, url) {
    return { ok: true };
}

async function createConnection(event, clientId, url) {
    var existing, logonResult;
    existing = findConnection(url);
    if (existing) {
        return {
            ok: false,
            message: 'ERR_CONNECTION_EXISTS'
        };
    } else {
        logonResult = await uiLogon(clientId, url);
        return logonResult;
    }
}

function getConnections() {
    var connections, list;
    connections = getConnectionsMap();
    list = Object.keys(connections);
    return list.map(item => {
        return { url: item };
    });
}

function removeConnection(event, url) {
    var id, key;
    id = findConnection(url);
    if (id) {
        delete authentications[url];
        removeConnectionFromMap(url);
        key = id + '-conn.json';
        storage.removeItem(key);
    }
}

function saveConnectionData(id, connectionData) {
    saveJson(id + '-conn', connectionData);
}

async function uiLogon(clientId, url) {
    var provider, result, id, connectionData;
    provider = authProvider(clientId, url);
    result = await provider.login();
    if (result.ok) {
        id = createConnectionId(url);
        connectionData = {
            url: url,
            token: result.token,
            clientId: clientId
        };
        saveConnectionData(id, connectionData);
        authentications[url] = provider;
        return { ok: true };
    } else {
        return result;
    }
}

function findConnection(url) {
    var urlToConId;
    urlToConId = getConnectionsMap();
    return urlToConId[url];
}

function getConnectionsMap() {
    return loadJson('connections');
}

function removeConnectionFromMap(url) {
    var connections;
    connections = getConnectionsMap();
    if (url in connections) {
        delete connections[url];
        saveConnectionsMap(connections);
    }
}

function saveConnectionsMap(connections) {
    saveJson('connections', connections);
}

function deserialize(str) {
    return JSON.parse(str);
}

function loadJson(key) {
    var content;
    content = storage.getItem(key + '.json') || '{}';
    return deserialize(content);
}

function saveJson(key, obj) {
    var content;
    content = serialize(obj);
    storage.setItem(key + '.json', content);
}

function serialize(obj) {
    return JSON.stringify(obj, null, 4);
}

async function __computeAll_storage() {
    storage = await __compute_storage();
}

async function __compute_storage() {
    var folder, fullname, quota;
    folder = os.homedir();
    fullname = path.join(folder, '.' + appPackage.name);
    await makeDirIfNotExist(fullname);
    quota = 50 * 1024 * 1024;
    return new LocalStorage(fullname, quota);
}

