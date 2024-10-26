pfun(element, arg)

yes(arg)
yes(typeof arg === "string")
element.className = arg
return

yes(arg)
yes(typeof arg === "object")
no(arg.nodeType)
yes(Array.isArray(arg))
arg.forEach(child => element.appendChild(child))
return

yes(arg)
yes(typeof arg === "object")
no(arg.nodeType)
no(Array.isArray(arg))
objFor(arg, (value, key) => setElementProperty(element, key, value))
return

yes(arg)
yes(typeof arg === "object")
yes(arg.nodeType)
element.appendChild(arg)

