
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

function sortBy(array, property) {
    var comparer = function(left, right) {
        var leftValue = left[property]
        var rightValue = right[property]
        if (leftValue < rightValue) { return -1 }
        if (leftValue > rightValue) { return 1 }
        return 0
    }
    array.sort(comparer)
}

if (typeof module !== "undefined") {
    module.exports = {
        objFor: objFor,
        forEach: forEach,
        loop: loop,
        sortBy: sortBy
    }
}

