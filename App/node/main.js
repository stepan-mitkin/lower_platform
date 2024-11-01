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
    ipcMain.handle('get-token', getToken);
    ipcMain.handle('create-connection', createConnection);
    ipcMain.handle('remove-connection', removeConnection);
    ipcMain.handle('get-connections', getConnections);
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

async function getToken(event, url) {
    var id, conn, auth, result;
    id = findConnection(url);
    conn = loadConnectionData(id);
    auth = getOrDeserializeAuth(conn);
    result = await auth.getToken();
    if (result.ok) {
        startSaving(auth, url, id);
        return result;
    } else {
        return result;
    }
}

function removeConnection(event, url) {
    var id, key, key2;
    id = findConnection(url);
    if (id) {
        delete authentications[url];
        removeConnectionFromMap(url);
        key = id + '-conn.json';
        storage.removeItem(key);
        key2 = id + '-auth.json';
        storage.removeItem(key2);
    }
}

function getOrDeserializeAuth(conn) {
    var id, clientId, url, auth, key, content;
    id = conn.id;
    if (id in authentications) {
        return authentications[id];
    } else {
        clientId = conn.clientId;
        url = conn.url;
        auth = authProvider(clientId, url);
        key = id + '-auth.json';
        content = storage.getItem(key);
        auth.load(conn.account, content);
        return auth;
    }
}

function loadConnectionData(id) {
    return loadJson(id + '-conn');
}

function saveConnectionData(id, connectionData) {
    saveJson(id + '-conn', connectionData);
}

function startSaving(auth, url, id) {
    var save;
    authentications[url] = auth;
    save = data => {
        var key;
        key = id + '-auth.json';
        storage.setItem(key, data);
    };
    auth.registerSave(save);
}

async function uiLogon(clientId, url) {
    var auth, result, id, connectionData;
    auth = authProvider(clientId, url);
    result = await auth.login();
    if (result.ok) {
        id = createConnectionId(url);
        connectionData = {
            id: id,
            url: url,
            clientId: clientId,
            account: result.account
        };
        saveConnectionData(id, connectionData);
        startSaving(auth, url, id);
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

