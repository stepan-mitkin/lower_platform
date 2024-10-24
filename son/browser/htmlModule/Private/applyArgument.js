pfun(element, arg)


section()
yes(typeof arg === "string")
element.className = arg
return

section()
yes(Array.isArray(arg))
arg.forEach(child => element.appendChild(child))
return

section()
yes(arg)
yes(typeof arg === "object")
objFor(arg, (value, key) => setElementProperty(element, key, value))

