pfun(container)

topSize = "49px"

logoImage = widgets.makeImg("lower_platform_logo.png")
html.absRect(logoImage, "0px", "0px", topSize, topSize)

logoText = html.div({
    text: appName,
    "line-height": topSize,
    color: globalTheme.textAlt,
    "font-size": "30px",
    "padding-left": "5px",
})
html.absLeftTop(logoText, topSize, "0px")


top = html.div(
    {
        background: globalTheme.background,
        "border-bottom": "solid 1px " + globalTheme.border
    },
    logoImage,
    logoText
)

header = widgets.makeH1(tr("CONNECT_TO_DATAVERSE"))

clientTop = html.div(
    header,
    widgets.makeButtonPanel(
        [widgets.makeSimpleButton(tr("BUTTON_NEW_CONNECTION"), createNewConnection)],
        []
    )
)

clientBottom = html.div(
    {"overflow-y": "auto"},
    connections.map(makeConnectionLine)
)

bottomClient = html.div(
    {
        width: "700px",
        top: "0px",
        height: "100%",
        "max-width": "100%"
    }
)

widgets.arrangeTopBottom(clientTop, 80, clientBottom, bottomClient)

html.centerHor(bottomClient)
bottom = html.div({
       background: globalTheme.background,    
    },
    bottomClient
)

widgets.arrangeTopBottom(top, 50, bottom, container)