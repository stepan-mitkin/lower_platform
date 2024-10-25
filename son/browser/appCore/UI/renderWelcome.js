pfun(container)

topSize = "49px"

logoImage = makeImg("lower_platform_logo.png")
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

header = makeH1(tr("CONNECT_TO_DATAVERSE"))

bottomClient = html.div({
        background: "orangered",
        width: "700px",
        top: "0px",
        height: "100%",
        "max-width": "100%"
    },
    header
)

html.centerHor(bottomClient)
bottom = html.div({
       background: globalTheme.background,    
    },
    bottomClient
)

widgets.arrangeTopBottom(top, 50, bottom, container)