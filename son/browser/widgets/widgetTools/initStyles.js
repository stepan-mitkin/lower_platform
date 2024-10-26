fun()

html.replaceStyleSheet(
    "widgets-basic",
    [
        html.createStyle(
            ".normal-button",
            [
                "display", "inline-block",
                "padding-left", "10px",
                "padding-right", "10px",
                "color", globalTheme.buttonText,
                "background", globalTheme.buttonBackground,
                "border-radius", "3px",
                "user-select", "none",
                "cursor", "default",
                "line-height", "30px"
            ]
        ),
        html.createStyle(
            ".normal-button:hover",
            [
                "color", globalTheme.buttonHoverText,
                "background", globalTheme.buttonHover,
            ]
        ),
        html.createStyle(
            ".normal-button:active",
            [
                "color", globalTheme.buttonActiveText,
                "background", globalTheme.buttonActive
            ]
        )        
    ]
)