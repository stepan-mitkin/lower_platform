pfun()

console.log("createNewConnection")
existing = await window.api.getItem("bar-bar") || "[]"
console.log(existing)
items = JSON.parse(existing)
items.push(new Date().toString())
newValue = JSON.stringify(items)
await window.api.setItem("bar-bar", newValue)
console.log(newValue)