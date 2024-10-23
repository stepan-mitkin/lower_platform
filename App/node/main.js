const path = require('path');
const {app, ipcMain, BrowserWindow} = require('electron');

var mainWindow;
main();
console.log('main completed');

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

function registerApplicationEvents() {
    app.on('ready', () => {
        createWindow();
        mainWindow.loadFile(path.join(__dirname, '../browser/index.html'));
    });
    app.on('window-all-closed', () => {
        app.quit();
    });
    app.on('activate', createWindowWhenNoWindows);
}

function registerBrowserEvents() {
}

