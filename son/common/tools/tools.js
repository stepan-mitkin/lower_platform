
function objFor(obj, callback, target) {
    for (var key in obj) {
        var value = obj[key]
        callback(key, value, target)
    }
}


function forEach(array, callback, target) {
    var length = array.length
    for (var i = 0; i < length; i++) {
        var value = array[i]
        callback(value, target, i)
    }
}


function loop(begin, end, step, callback) {
    for (var i = begin; i < end; i += step) {
        callback(i)
    }
}