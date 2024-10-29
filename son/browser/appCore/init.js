fun()

await initStrings()
setUpTheme()
widgets.initStyles()

main = html.get("main")
compute(rootNode)
html.setUiTree(main, rootNode)

delayedResize = debounce(onResize, 200)
window.addEventListener("resize", delayedResize.push);
setTimeout(onResize, 0)
