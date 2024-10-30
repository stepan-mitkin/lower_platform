prop()

result = await window.api.createConnection(clientId, url)

yes(result.ok)
return {url: url}

no(result.ok)
yes(result.message)
console.error(result)
throw new Error(result.message)

no(result.ok)
no(result.message)
console.error(result)
throw new Error("ERR_COULD_NOT_CONNECT_TO_DATAVERSE")