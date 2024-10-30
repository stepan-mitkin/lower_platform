fun(widget)

hideCentralDialog()

qroot = html.get("question-root")
root = html.div()
html.add(qroot, root)

html.stretchToScreen(root)

background = html.div({
    "z-order": Z_CENTRAL,
    "background": "rgba(0, 0, 0, 0.5)"
})
html.stretchToParent(background)

client = html.div(
    {
        "z-order": Z_CENTRAL + 1,
        "padding": "10px",
        "top": "0px",
        "width": "400px",
        "max-width": window.innerWidth + "px",
        "max-height": window.innerHeight + "px",
        "background": globalTheme.background,
        "color": globalTheme.text,
        "overflow-y": "auto"
    }
)
html.centerHor(client)

html.add(root, background)
html.add(root, client)
widget.render(client)