fun(left, right)

padding = 10
paddingPx = padding + "px"
full = "calc(100% - " + (padding * 2) + "px)"

leftContainer = html.div(
    {"text-align": "left"},
    left
)

html.absRect(
    leftContainer,
    paddingPx,
    paddingPx,
    full,
    full
)

rightContainer = html.div(
    {"text-align": "right"},
    right
)

html.absRect(
    rightContainer,
    paddingPx,
    paddingPx,
    full,
    full
)

return html.div(
    {
        "height": "30px",
        "position": "relative"
    },
    leftContainer,
    rightContainer
)
