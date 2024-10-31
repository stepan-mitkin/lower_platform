pfun(url)

connections = getConnectionsMap()

yes(url in connections)
delete connections[url]
saveConnectionsMap(connections)