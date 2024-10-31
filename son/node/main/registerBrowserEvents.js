pfun()

ipcMain.handle('set-item', async (event, key, value) => {
    storage.setItem(key, value);
    return true;
});

ipcMain.handle('get-item', async (event, key) => {
    const value = storage.getItem(key);
    return value;
});

ipcMain.handle('get-token', async (event, url) => {
    console.log("get-token", url)
    return "token " + url;
});

ipcMain.handle('create-connection', createConnection)
ipcMain.handle('remove-connection', removeConnection)
ipcMain.handle('connect-to', connectTo)
ipcMain.handle('get-connections', getConnections)
