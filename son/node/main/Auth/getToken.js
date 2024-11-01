pfun(event, url)

id = findConnection(url)
conn = loadConnectionData(id)
auth = getOrDeserializeAuth(conn)
result = await auth.getToken()

yes(result.ok)
startSaving(auth, url, id)
return result

no(result.ok)
return result



