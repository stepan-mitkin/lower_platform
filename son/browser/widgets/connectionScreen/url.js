prop()

trimmed = dynamicsUrlInput.value.trim()

yes(trimmed)
yes(trimmed.endsWith("/"))
return trimmed

yes(trimmed)
no(trimmed.endsWith("/"))
return trimmed + "/"

no(trimmed)
throw new Error("ERR_DYNAMICS_URL_IS_EMPTY")