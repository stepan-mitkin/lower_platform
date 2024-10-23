fun()

setUpModules()

main = html.get("main")
root = dummyNode("orangered", 50)
html.setUiTree(main, root)

delayedResize = debounce(onResize, 200)
window.addEventListener("resize", delayedResize.push);
setTimeout(onResize, 0)