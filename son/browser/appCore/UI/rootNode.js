prop()

return multiView(
    {
        "welcome": html.makeWidget(renderWelcome),
        "explorer": explorerNode
    },
    "welcome"
)