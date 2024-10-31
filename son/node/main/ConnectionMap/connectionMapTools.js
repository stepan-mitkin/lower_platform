
function createConnectionId(url) {
    var connections = getConnectionsMap()
    var id = makeConnectionId()
    while (id in connections) {
        id = makeConnectionId()
    }
    connections[url] = id
    saveConnectionsMap(connections)
    return id    
}

function makeConnectionId() {
    return 'con' + Math.round(Math.random() * 8999 + 1000)
}
