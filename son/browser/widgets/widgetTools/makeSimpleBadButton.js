fun(text, action)

button = html.div(
    "generic-button bad-button",
    {text: text}
)

button.addEventListener("click", action)


return button