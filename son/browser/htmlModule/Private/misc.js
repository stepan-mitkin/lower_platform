function clearViaLastChild(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}