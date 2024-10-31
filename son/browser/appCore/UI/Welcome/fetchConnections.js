pfun()

html.clear(welcomeConnectionsDiv)
connections = await window.api.getConnections()
sortBy(connections, "url")
table = document.createElement("table")
html.add(welcomeConnectionsDiv, table)
connections.forEach(connection => 
    html.add(
        table,
        makeConnectionLine(connection)
    )
)