pfun(style, lines)

lines.push(style.header + " {")
loop(0, style.body.length, 2, i => appendStyleLine(style.body, i, lines))
lines.push("}")
lines.push("")