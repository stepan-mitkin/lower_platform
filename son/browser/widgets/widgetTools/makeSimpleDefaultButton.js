fun(text, action)

button = html.div(
    "generic-button default-button",
    {text: text}
)

button.addEventListener("click", action)


return button