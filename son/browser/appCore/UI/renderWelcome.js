pfun(container)



top = html.div(
    {
        background: globalTheme.background,
        "border-bottom": "solid 1px " + globalTheme.border
    },
    html.div({
        text: appName,
        color: globalTheme.textAlt,
        position: "absolute",
        left: "0px",
        top: "0px",
        "line-height": "49px",
        "font-size": "30px",
        "padding-left": "5px"
    })
)
bottom = html.div({
    background: globalTheme.background,
})

widgets.arrangeTopBottom(top, 50, bottom, container)