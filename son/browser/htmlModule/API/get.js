fun(id)

element = document.getElementById(id)

plot()
yes(element)
return element

plot()
no(element)
throw new Error("Element not found: " + id)