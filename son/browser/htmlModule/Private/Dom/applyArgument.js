pfun(arg, element)

no(arg)
return

yes(typeof arg === "string")
element.className = arg
return

yes(typeof arg === "object")
no(arg.nodeType)
yes(Array.isArray(arg))
arg.forEach(child => element.appendChild(child))
return

yes(typeof arg === "object")
no(arg.nodeType)
no(Array.isArray(arg))
objFor(arg, setElementProperty, element)
return

yes(typeof arg === "object")
yes(arg.nodeType)
element.appendChild(arg)

