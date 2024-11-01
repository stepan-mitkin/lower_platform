pfun(url)

baseUrl = url
token = await window.api.getToken(url)
console.log(token)
rootNode.setActive("explorer")
widgets.hideWorking()
