pfun()

console.log("onResize", window.innerWidth, window.innerHeight)
main = html.get("main")

main.style.position = "fixed" 
main.style.display = "inline-block"
main.style.left = "0px"
main.style.top = "0px"
main.style.width = window.innerWidth + "px"
main.style.height = window.innerHeight + "px"


