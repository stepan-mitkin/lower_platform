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
