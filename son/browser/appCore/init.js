fun()

await initStrings()
setUpTheme()
widgets.initStyles()

onResize()

rootNode = makeRootNode()
redraw()

delayedResize = debounce(onResize, 200)
window.addEventListener("resize", delayedResize.push);

