pfun(tag, args)

element = document.createElement(tag)
forEach(args, applyArgument, element)
return element