pfun(container, message, yesText, noText, className, onAnswer)


confirm = () => {
    widgets.hideCentralDialog()
    onAnswer(true)
}
confirmButton = makeSimpleButton(yesText, confirm)
confirmButton.className = className || "generic-button normal-button"

cancel = () => {
    widgets.hideCentralDialog()
    onAnswer(false)
}
cancelButton = makeSimpleButton(noText, cancel)

controls = [
    widgets.makeSpacer10(),
    widgets.makeH1(tr("WARN_WARNING")),
    widgets.makeSpacer10(),
    widgets.makeWideLabel(message),
    widgets.makeSpacer10(),
    widgets.makeButtonPanel([confirmButton], [cancelButton]),
    widgets.makeSpacer10()
]

controls.forEach(widget => html.add(container, widget))



