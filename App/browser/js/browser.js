function appCore() {

var appName;
appName = 'LowerPlatform';

var explorerNode, rootNode;
function init() {
    var main, root, delayedResize;
    setUpTheme();
    main = html.get('main');
    __computeAll_rootNode();
    root = rootNode;
    html.setUiTree(main, root);
    delayedResize = debounce(onResize, 200);
    window.addEventListener('resize', delayedResize.push);
    setTimeout(onResize, 0);
}

function onResize() {
    var main;
    console.log('onResize', window.innerWidth, window.innerHeight);
    main = html.get('main');
    main.style.position = 'fixed';
    main.style.display = 'inline-block';
    main.style.left = '0px';
    main.style.top = '0px';
    main.style.width = window.innerWidth + 'px';
    main.style.height = window.innerHeight + 'px';
    html.redrawAll();
}

function setUpTheme() {
    window.globalTheme = {
        background: 'white',
        text: 'black',
        textAlt: '#104a31',
        border: '#c7d4bc',
        hover: '#c7d4bc',
        active: '#104a31',
        activeText: 'white',
        buttonBackground: '#39f7a5',
        buttonText: 'black',
        buttonHover: '#c7d4bc',
        buttonHoverText: 'black',
        buttonActive: '#104a31',
        buttonActiveText: 'white',
        buttonDisabled: '#b3b3b3',
        buttonDisabledText: 'black',
        buttonBad: '#b3b3b3',
        buttonBadText: 'white',
        buttonBadActive: '#b3b3b3',
        buttonBadActiveText: 'white',
        fontFamily: 'Arial',
        fontSize: '14px'
    };
    document.documentElement.style.fontFamily = globalTheme.fontFamily;
    document.documentElement.style.fontSize = globalTheme.fontSize;
}

function dummyNode(color, padding) {
    return {
        render: container => {
            var dummy;
            dummy = html.div({
                display: 'inline-block',
                position: 'absolute',
                left: padding + 'px',
                top: padding + 'px',
                right: padding + 'px',
                bottom: padding + 'px',
                background: color
            });
            html.add(container, dummy);
        }
    };
}

function renderWelcome(container) {
    var top, bottom;
    top = html.div({
        background: globalTheme.background,
        'border-bottom': 'solid 1px ' + globalTheme.border
    }, html.div({
        text: appName,
        color: globalTheme.textAlt,
        position: 'absolute',
        left: '0px',
        top: '0px',
        'line-height': '49px',
        'font-size': '30px',
        'padding-left': '5px'
    }));
    bottom = html.div({ background: globalTheme.background });
    widgets.arrangeTopBottom(top, 50, bottom, container);
}

function __computeAll_rootNode() {
    explorerNode = __compute_explorerNode();
    rootNode = __compute_rootNode();
}

function __compute_explorerNode() {
    return dummyNode('yellow', 20);
}

function __compute_rootNode() {
    return multiView({
        'welcome': html.makeWidget(renderWelcome),
        'explorer': explorerNode
    }, 'welcome');
}

return { init: init };
}

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

function multiView(children, active) {

function render(container) {
    children[active].render(container);
}

function setActive(newActive) {
    if (newActive === active) {
    } else {
        html.unmount(children[active]);
        active = newActive;
        html.requestRedraw();
    }
}

function unmount() {
    html.unmount(children[active]);
}

return {
    render: render,
    setActive: setActive,
    unmount: unmount
};
}

function widgetTools() {

function arrangeTopBottom(top, topHeight, bottom, container) {
    top.style.position = 'fixed';
    top.style.display = 'inline-block';
    top.style.width = '100%';
    top.style.height = topHeight + 'px';
    top.style.left = '0px';
    top.style.top = '0px';
    bottom.style.position = 'fixed';
    bottom.style.display = 'inline-block';
    bottom.style.width = '100%';
    bottom.style.height = 'calc(100% - ' + topHeight + 'px)';
    bottom.style.left = '0px';
    bottom.style.top = topHeight + 'px';
    html.add(container, top);
    html.add(container, bottom);
}

return { arrangeTopBottom: arrangeTopBottom };
}
