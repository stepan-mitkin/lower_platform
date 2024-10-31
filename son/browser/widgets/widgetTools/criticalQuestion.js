fun(message, yesText, noText)

return new Promise(resolve => {
    hideCentralDialog()
    render = container => renderQuestion(
        container,
        message,
        yesText,
        noText,
        "generic-button bad-button",
        resolve
    )
    widget = html.makeWidget(render)
    showCentralDialog(widget)
})
