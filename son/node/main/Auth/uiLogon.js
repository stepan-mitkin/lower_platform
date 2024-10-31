pfun(clientId, url)

provider = authProvider(clientId, url)
result = await provider.login()

yes(result.ok)
id = createConnectionId(url)
connectionData = {
    url: url,
    token: result.token,
    clientId: clientId
}
saveConnectionData(id, connectionData)
authentications[url] = provider
return {ok:true}

no(result.ok)
return result