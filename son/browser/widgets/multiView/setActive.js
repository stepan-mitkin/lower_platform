fun(newActive)

no(newActive === active)
html.unmount(children[active])
active = newActive
html.requestRedraw()
