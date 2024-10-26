fun(id)

element = document.getElementById(id)

yes(element)
return element

no(element)
throw new Error("Element not found: " + id)

