pfun()

connections = getConnectionsMap()
list = Object.keys(connections)
return list.map(item => {return {url:item}})
