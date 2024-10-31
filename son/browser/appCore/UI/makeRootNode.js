pfun()

return multiView(
    {
        "welcome": html.makeWidget(renderWelcome),
        "explorer": html.makeWidget(renderExplorer)
    },
    "welcome"
)