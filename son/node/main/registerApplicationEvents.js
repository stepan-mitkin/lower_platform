pfun()


app.on("ready", () => {
    createWindow();
    mainWindow.loadFile(path.join(__dirname, "../browser/index.html"));
});

app.on("window-all-closed", () => {
    app.quit();
});

app.on('activate', createWindowWhenNoWindows)