pfun()

mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: { preload: path.join(__dirname, "preload.js") },
});

mainWindow.webContents.openDevTools()

