pfun()
language = "en-us"
response = await html.sendRequest("GET", "./strings/" + language + ".json")
globalStrings = JSON.parse(response.body)
console.log(globalStrings)