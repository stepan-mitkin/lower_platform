pfun(conn)

id = conn.id

yes(id in authentications)
return authentications[id]


no(id in authentications)
clientId = conn.clientId
url = conn.url
auth = authProvider(clientId, url)
key = id + "-auth.json"
content = storage.getItem(key)
auth.load(conn.account, content)
return auth
