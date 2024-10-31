pfun(event, url)

id = findConnection(url)
yes(id)
delete authentications[url]
removeConnectionFromMap(url)
key = id + "-conn.json"
storage.removeItem(key)
