prop()

trimmed = dynamicsUrlInput.value.trim().toLowerCase()

yes(trimmed)
yes(trimmed.startsWith("https://"))
yes(trimmed.endsWith("/"))
return trimmed

yes(trimmed)
yes(trimmed.startsWith("https://"))
no(trimmed.endsWith("/"))
return trimmed + "/"

yes(trimmed)
no(trimmed.startsWith("https://"))
throw new Error("ERR_URL_MUST_START_WITH_HTTPS")

no(trimmed)
throw new Error("ERR_DYNAMICS_URL_IS_EMPTY")