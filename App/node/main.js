const {LocalStorage} = require('node-localstorage');
const appPackage = require('./package.json');
const path = require('path');
const os = require('os');
const fs = require('fs').promises;
const {app, ipcMain, BrowserWindow} = require('electron');

var mainWindow;
main();

var storage;
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

