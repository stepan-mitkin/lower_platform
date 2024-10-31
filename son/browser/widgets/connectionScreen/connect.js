pfun()

html.clear(errorMessage)
connectButton.disable()
cancelButton.disable()
try {
    compute(connection)    
} catch (ex) {
    handleError(ex.message)
    return
}

yes(active)
await window.api.setItem("clientid.txt", clientId)
widgets.hideCentralDialog()
connected(url)
