function debounce(action, timeoutMs) {

var timer, latestArg;
timer = undefined;
latestArg = undefined;

function cancel() {
    if (timer) {
        clearTimeout(timer);
        timer = undefined;
    }
}

function push(arg) {
    latestArg = arg;
    cancel();
    timer = setTimeout(runAction, timeoutMs);
}

function runAction() {
    timer = undefined;
    action(latestArg);
}

return {
    cancel: cancel,
    push: push
};
}


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

