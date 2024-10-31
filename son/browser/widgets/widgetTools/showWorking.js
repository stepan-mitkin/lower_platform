fun()

root = html.get("working-root")
message = html.div({
    padding: "20px",
    background: globalTheme.background,
    opacity: 1,
    color: globalTheme.text,
    text: tr("WAIT_WORKING")
})
html.centerHorVer(message)
back = html.div({
    "z-order": Z_WORKING,
    opacity: 0.5,
    background: globalTheme.background,
    },
    message
)
html.stretchToScreen(back)
html.add(root, back)
