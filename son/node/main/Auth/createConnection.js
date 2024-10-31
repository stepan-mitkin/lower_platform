pfun(event, clientId, url)
existing = findConnection(url)

no(existing)
logonResult = await uiLogon(clientId, url)
return logonResult

yes(existing)
return {ok:false, message:"ERR_CONNECTION_EXISTS"}
