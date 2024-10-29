pfun()

ipcMain.handle('set-item', async (event, key, value) => {
    storage.setItem(key, value);
    return true;
});

ipcMain.handle('get-item', async (event, key) => {
    const value = storage.getItem(key);
    return value;
});