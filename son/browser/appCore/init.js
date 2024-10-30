fun()

await initStrings()
setUpTheme()
widgets.initStyles()

onResize()

main = html.get("main")
compute(rootNode)
html.render(rootNode, main)

delayedResize = debounce(onResize, 200)
window.addEventListener("resize", delayedResize.push);

