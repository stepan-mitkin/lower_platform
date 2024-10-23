pfun(element, arg)


section()
plot()
yes(typeof arg === "string")
element.className = arg
return

section()
plot()
yes(Array.isArray(arg))
arg.forEach(child => element.appendChild(child))
return

section()
plot()
yes(arg)
yes(typeof arg === "object")
objFor(arg, (value, key) => setElementProperty(element, key, value))

