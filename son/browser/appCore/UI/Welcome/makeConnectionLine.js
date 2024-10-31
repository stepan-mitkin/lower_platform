pfun(connection)

url = connection.url

row = document.createElement("tr")
row.className = "active-background"

left = document.createElement("td")
left.style.padding = "10px"
left.style.lineHeight = "30px"
html.addText(left, url)
html.add(row, left)

right = document.createElement("td")
right.style.padding = "10px"
html.add(right, widgets.makeSimpleDefaultButton(tr("BUTTON_CONNECT"), () => connectTo(url)))
remove = widgets.makeSimpleBadButton(tr("BUTTON_REMOVE"), () => removeConnection(url))
remove.style.marginLeft = "10px"
html.add(right, remove)

html.add(row, right)

return row
