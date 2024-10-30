prop()

result = clientIdInput.value.trim()

yes(result)
return result

no(result)
throw new Error("ERR_CLIENT_ID_IS_EMPTY")