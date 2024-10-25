
function objFor(obj, callback) {
    for (var key in obj) {
        var value = obj[key]
        callback(value, key, obj)
    }
}
