fun()

setUpModules()
setUpTheme()

main = html.get("main")
compute(rootNode)
root = rootNode
html.setUiTree(main, root)

delayedResize = debounce(onResize, 200)
window.addEventListener("resize", delayedResize.push);
setTimeout(onResize, 0)