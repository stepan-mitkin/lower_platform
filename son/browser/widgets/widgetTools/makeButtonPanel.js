fun(left, right)

padding = 0
paddingPx = padding + "px"
full = "calc(100% - " + (padding * 2) + "px)"

leftContainer = html.div(
    {"text-align": "left"},
    left
)


leftContainer.style.position = "absolute"
leftContainer.style.display = "inline-block"
leftContainer.style.left = paddingPx
leftContainer.style.top = paddingPx
leftContainer.style.height = full


rightContainer = html.div(
    {"text-align": "right"},
    right
)

rightContainer.style.position = "absolute"
rightContainer.style.display = "inline-block"
rightContainer.style.right = paddingPx
rightContainer.style.top = paddingPx
rightContainer.style.height = full

return html.div(
    {
        "height": "30px",
        "position": "relative"
    },
    leftContainer,
    rightContainer
)
