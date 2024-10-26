fun(id, styles)

removeExisting(id)

styleSheet = document.createElement('style')
styleSheet.type = 'text/css'
document.head.appendChild(styleSheet)

lines = []
styles.forEach(style => printStyle(style, lines))
content = lines.join("\n")
addText(styleSheet, content)