pfun(clientId, url)

auth = authProvider(clientId, url)
result = await auth.login()

yes(result.ok)
id = createConnectionId(url)
connectionData = {
    id: id,
    url: url,
    clientId: clientId,
    account: result.account
}
saveConnectionData(id, connectionData)
startSaving(auth, url, id)
return {ok:true}

no(result.ok)
return result