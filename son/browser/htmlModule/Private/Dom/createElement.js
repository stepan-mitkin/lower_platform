pfun(tag, args)

element = document.createElement(tag)
args.forEach(arg => applyArgument(element, arg))
return element