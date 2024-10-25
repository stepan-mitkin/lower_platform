fun(src, alt)

element = document.createElement("img")
element.draggable = false
element.src = src
element.alt = alt || ''
element.style.display = "inline-block"
element.style.verticalAlign = "middle"

return element