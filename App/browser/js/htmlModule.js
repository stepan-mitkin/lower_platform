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

function div() {
    var args;
    args = Array.from(arguments);
    return createElement('div', args);
}

function get(id) {
    var element;
    element = document.getElementById(id);
    if (element) {
        return element;
    } else {
        throw new Error('Element not found: ' + id);
    }
}

function redrawAll() {
    console.log('redrawAll');
    redrawPending = false;
    clear(rootElement);
    uiTree.render(rootElement);
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

function requestRedraw() {
    redrawRequested = true;
}

function setUiTree(element, node) {
    rootElement = element;
    uiTree = node;
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
            objFor(arg, (value, key) => setElementProperty(element, key, value));
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
    div: div,
    get: get,
    redrawAll: redrawAll,
    registerEvent: registerEvent,
    requestRedraw: requestRedraw,
    setUiTree: setUiTree
};
}
