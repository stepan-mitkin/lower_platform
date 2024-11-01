pfun(completed)

authWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
        nodeIntegration: false,
    }
})
authWindow.setMenu(null)

// Get the Auth URL from MSAL
authCodeUrlParams = {
    scopes: [url + '.default'],
    redirectUri: redirectUri,  // redirectUri needs to match the registered redirect URI
}

authUrl = await clientApplication.getAuthCodeUrl(authCodeUrlParams)
// Load the authentication URL in the BrowserWindow
authWindow.loadURL(authUrl)

authWindow.webContents.on('will-redirect', async (event, newUrl) => {
    try {
        await onRedirect(newUrl, completed)
    } catch (ex) {
        console.log("ERROR will-redirect " + ex.message)
        completed({ok:false, message:ex.message})
    }
})

authWindow.on('close', () => onClose(completed))
