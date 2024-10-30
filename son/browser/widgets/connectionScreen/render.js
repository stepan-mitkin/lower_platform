fun(container)

clientIdInput = widgets.makeWideTextInput()
dynamicsUrlInput = widgets.makeWideTextInput()
errorMessage = widgets.makeErrorMessage()
connectButton = widgets.defaultButton(tr("BUTTON_LOGIN"), connect)
cancelButton = widgets.normalButton(tr("BUTTON_CANCEL"), widgets.hideCentralDialog)

controls = [
    widgets.makeH1(tr("BUTTON_NEW_CONNECTION")),
    widgets.makeSpacer10(),
    widgets.makeWideLabel("Client Id"),
    clientIdInput,
    widgets.makeSpacer10(),
    widgets.makeWideLabel(tr("DYNAMICS_URL")),
    dynamicsUrlInput,
    widgets.makeWideLabel(tr("FOR_EXAMPLE") + ", https://example.crm4.dynamics.com/"),
    widgets.makeSpacer10(),
    widgets.makeButtonPanel([connectButton.build()], [cancelButton.build()]),
    widgets.makeSpacer10(),
    errorMessage
]

controls.forEach(widget => html.add(container, widget))

no(clientIdRequested)
clientIdRequested = true
requestClientId()