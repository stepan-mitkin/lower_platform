fun(text, action)

button = html.div(
    "normal-button",
    {text: text}
)

html.registerEvent(button, "click", action)

return button