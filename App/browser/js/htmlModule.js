function htmlModule() {

var redrawRequested = false;
var redrawPending = false;
var rootElement = undefined;
var uiTree = undefined;

function clearViaLastChild(node) {
    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }
}

function add(parent, child) {
    parent.appendChild(child);
}

function clear(element) {
    clearViaLastChild(element);
}

function clearDelay(timer) {
    clearTimeout(timer);
}

function div() {
    var args;
    args = Array.from(arguments);
    return createElement('div', args);
}

function get(id) {
    var element;
    element = document.getElementById(id);
    if (element) {
    } else {
        throw new Error('Element not found: ' + id);
    }
    return element;
}

function makeWidget(render, unmount) {
    return {
        render: render,
        unmount: unmount
    };
}

function redrawAll() {
    console.log('redrawAll');
    redrawPending = false;
    render(uiTree, rootElement);
}

function registerEvent(element, type, listener, options) {
    var callback;
    callback = evt => {
        redrawRequested = false;
        listener(evt);
        checkRedrawRequested();
    };
    element.addEventListener(type, callback, options);
}

function render(widget, container) {
    clear(container);
    widget.render(container);
}

function requestRedraw() {
    redrawRequested = true;
}

function setDelay(action, timeout) {
    var callback;
    callback = () => {
        redrawRequested = false;
        action();
        checkRedrawRequested();
    };
    return setTimeout(callback, timeout);
}

function setUiTree(element, node) {
    rootElement = element;
    uiTree = node;
}

function unmount(widget) {
    if (widget.unmount) {
        widget.unmount();
    }
}

function applyArgument(element, arg) {
    if (typeof arg === 'string') {
        element.className = arg;
        return;
    }
    if (Array.isArray(arg)) {
        arg.forEach(child => element.appendChild(child));
        return;
    }
    if (arg) {
        if (typeof arg === 'object') {
            if (arg.nodeType) {
                element.appendChild(arg);
            } else {
                objFor(arg, (value, key) => setElementProperty(element, key, value));
            }
        }
    }
}

function createElement(tag, args) {
    var element;
    element = document.createElement(tag);
    args.forEach(arg => applyArgument(element, arg));
    return element;
}

function setElementProperty(element, key, value) {
    var newNode;
    if (key === 'text') {
        newNode = document.createTextNode(value);
        element.appendChild(newNode);
        return;
    }
    element.style.setProperty(key, value);
}

function checkRedrawRequested() {
    if (redrawRequested) {
    } else {
        return;
    }
    if (redrawPending) {
        return;
    }
    setTimeout(redrawAll, 0);
}

return {
    add: add,
    clear: clear,
    clearDelay: clearDelay,
    div: div,
    get: get,
    makeWidget: makeWidget,
    redrawAll: redrawAll,
    registerEvent: registerEvent,
    render: render,
    requestRedraw: requestRedraw,
    setDelay: setDelay,
    setUiTree: setUiTree,
    unmount: unmount
};
}
