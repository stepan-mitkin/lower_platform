fun(text, action)

button = html.div(
    "generic-button normal-button",
    {text: text}
)

button.addEventListener("click", action)


return button