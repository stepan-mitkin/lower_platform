fun()

html.replaceStyleSheet(
    "widgets-basic",
    [
        html.createStyle(
            ".generic-button",
            [
                "display", "inline-block",
                "padding-left", "10px",
                "padding-right", "10px",
                "border-radius", "3px",
                "user-select", "none",
                "cursor", "default",
                "line-height", "30px"
            ]
        ),        
        html.createStyle(
            ".normal-button",
            [
                "color", globalTheme.buttonText,
                "background", globalTheme.buttonBackground
            ]
        ),
        html.createStyle(
            ".normal-button:hover",
            [
                "color", globalTheme.buttonHoverText,
                "background", globalTheme.buttonHover
            ]
        ),
        html.createStyle(
            ".normal-button:active",
            [
                "color", globalTheme.buttonActiveText,
                "background", globalTheme.buttonActive
            ]
        ),
        html.createStyle(
            ".default-button",
            [
                "color", globalTheme.buttonDefaultText,
                "background", globalTheme.buttonDefault
            ]
        ),
        html.createStyle(
            ".default-button:hover",
            [
                "color", globalTheme.buttonDefaultHoverText,
                "background", globalTheme.buttonDefaultHover
            ]
        ),
        html.createStyle(
            ".default-button:active",
            [
                "color", globalTheme.buttonDefaultActiveText,
                "background", globalTheme.buttonDefaultActive
            ]
        ),        
        html.createStyle(
            ".disabled-button",
            [
                "color", globalTheme.buttonDisabledText,
                "background", globalTheme.buttonDisabled
            ]
        ),
        html.createStyle(
            'input[type="text"]',
            [
                "padding", "5px",
                "font-family", globalTheme.fontFamily,
                "font-size", globalTheme.fontSize,
                "color", globalTheme.text,
                "background", globalTheme.background
            ]
        )        
    ]
)