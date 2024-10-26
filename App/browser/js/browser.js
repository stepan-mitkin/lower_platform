function appCore() {

var appName, globalStrings, connections;
appName = 'LowerPlatform';
globalStrings = {};
connections = [
    { url: 'http://boscrm-transformation.crm4.dynamics.com/' },
    { url: 'http://boscrm-dev.crm4.dynamics.com/' },
    { url: 'http://boscrm-test.crm4.dynamics.com/' },
    { url: 'http://boscrm-uat.crm4.dynamics.com/' },
    { url: 'http://boscrm-prod.crm4.dynamics.com/' }
];

var explorerNode, rootNode;
async function init() {
    var main, delayedResize;
    await initStrings();
    setUpTheme();
    widgets.initStyles();
    main = html.get('main');
    __computeAll_rootNode();
    html.setUiTree(main, rootNode);
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
        border: '#73de85',
        hover: '#73de85',
        active: '#104a31',
        activeText: 'white',
        buttonBackground: '#9ad9a4',
        buttonText: 'black',
        buttonHover: '#73de85',
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

function createNewConnection() {
    console.log('createNewConnection');
}

async function initStrings() {
    var language, response;
    language = 'en-us';
    response = await html.sendRequest('GET', './strings/' + language + '.json');
    globalStrings = JSON.parse(response.body);
}

function tr(text) {
    return globalStrings[text] || text;
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

function imgSrc(filename) {
    return './images/' + filename;
}

function makeConnectionLine(connection) {
    return html.div({
        'padding': '10px',
        'text': connection.url
    });
}

function makeH1(text) {
    var div;
    div = html.div({
        text: text,
        'font-size': '20px',
        'line-height': '30px',
        'font-weight': 'bold',
        'text-align': 'center',
        'margin-left': '5px',
        'margin-right': '5px'
    });
    return div;
}

function makeImg(src) {
    return html.img(imgSrc(src));
}

function renderWelcome(container) {
    var topSize, logoImage, logoText, top, header, clientTop, clientBottom, bottomClient, bottom;
    topSize = '49px';
    logoImage = makeImg('lower_platform_logo.png');
    html.absRect(logoImage, '0px', '0px', topSize, topSize);
    logoText = html.div({
        text: appName,
        'line-height': topSize,
        color: globalTheme.textAlt,
        'font-size': '30px',
        'padding-left': '5px'
    });
    html.absLeftTop(logoText, topSize, '0px');
    top = html.div({
        background: globalTheme.background,
        'border-bottom': 'solid 1px ' + globalTheme.border
    }, logoImage, logoText);
    header = makeH1(tr('CONNECT_TO_DATAVERSE'));
    clientTop = html.div(header, widgets.makeButtonPanel([widgets.makeSimpleButton(tr('BUTTON_NEW_CONNECTION'), createNewConnection)], []));
    clientBottom = html.div({ 'overflow-y': 'auto' }, connections.map(makeConnectionLine));
    bottomClient = html.div({
        width: '700px',
        top: '0px',
        height: '100%',
        'max-width': '100%'
    });
    widgets.arrangeTopBottom(clientTop, 80, clientBottom, bottomClient);
    html.centerHor(bottomClient);
    bottom = html.div({ background: globalTheme.background }, bottomClient);
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

function absLeftTop(element, left, top) {
    element.style.position = 'absolute';
    element.style.display = 'inline-block';
    element.style.left = left;
    element.style.top = top;
}

function absRect(element, left, top, width, height) {
    element.style.position = 'absolute';
    element.style.display = 'inline-block';
    element.style.left = left;
    element.style.top = top;
    element.style.width = width;
    element.style.height = height;
}

function add(parent, child) {
    parent.appendChild(child);
}

function addText(element, text) {
    var newNode;
    newNode = document.createTextNode(text);
    element.appendChild(newNode);
}

function centerHor(element) {
    element.style.position = 'absolute';
    element.style.display = 'inline-block';
    element.style.left = '50%';
    element.style.transform = 'translate(-50%, 0px)';
}

function clear(element) {
    clearViaLastChild(element);
}

function clearDelay(timer) {
    clearTimeout(timer);
}

function createStyle(header, body) {
    return {
        header: header,
        body: body
    };
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

function img(src, alt) {
    var element;
    element = document.createElement('img');
    element.draggable = false;
    element.src = src;
    element.alt = alt || '';
    element.style.display = 'inline-block';
    element.style.verticalAlign = 'middle';
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

function replaceStyleSheet(id, styles) {
    var styleSheet, lines, content;
    removeExisting(id);
    styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    document.head.appendChild(styleSheet);
    lines = [];
    styles.forEach(style => printStyle(style, lines));
    content = lines.join('\n');
    addText(styleSheet, content);
}

function requestRedraw() {
    redrawRequested = true;
}

function sendRequest(method, url, body, headers) {
    return new Promise((resolve, reject) => {
        try {
            sendRequestInPromise(resolve, reject, method, url, body, headers);
        } catch (ex) {
            reject(ex);
        }
    });
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
    if (arg) {
        if (typeof arg === 'string') {
            element.className = arg;
            return;
        } else {
            if (typeof arg === 'object') {
                if (arg.nodeType) {
                    element.appendChild(arg);
                } else {
                    if (Array.isArray(arg)) {
                        arg.forEach(child => element.appendChild(child));
                        return;
                    } else {
                        objFor(arg, (value, key) => setElementProperty(element, key, value));
                        return;
                    }
                }
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

function removeExisting(id) {
    var element;
    element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

function setElementProperty(element, key, value) {
    if (key === 'text') {
        addText(element, value);
        return;
    } else {
        element.style.setProperty(key, value);
    }
}

function checkRedrawRequested() {
    if (redrawRequested) {
        if (redrawPending) {
        } else {
            redrawPending = true;
            setTimeout(redrawAll, 0);
        }
    }
}

function onDataWhenReady(request, resolve) {
    var result;
    if (request.readyState === 4) {
        result = {
            body: request.responseText,
            status: request.status
        };
        resolve(result);
    }
}

function sendRequestInPromise(resolve, reject, method, url, body, headers) {
    var request;
    request = new XMLHttpRequest();
    request.onreadystatechange = () => onDataWhenReady(request, resolve);
    request.open(method, url, true);
    setHeaders(request, headers);
    request.send(body);
}

function setHeaders(request, headers) {
    if (headers) {
        forObj(headers, (value, key) => request.setRequestHeader(key, value));
    }
}

function appendStyleLine(body, i, lines) {
    var line;
    line = '  ' + body[i] + ': ' + body[i + 1] + ';';
    lines.push(line);
}

function printStyle(style, lines) {
    lines.push(style.header + ' {');
    loop(0, style.body.length, 2, i => appendStyleLine(style.body, i, lines));
    lines.push('}');
    lines.push('');
}

return {
    absLeftTop: absLeftTop,
    absRect: absRect,
    add: add,
    addText: addText,
    centerHor: centerHor,
    clear: clear,
    clearDelay: clearDelay,
    createStyle: createStyle,
    div: div,
    get: get,
    img: img,
    makeWidget: makeWidget,
    redrawAll: redrawAll,
    registerEvent: registerEvent,
    render: render,
    replaceStyleSheet: replaceStyleSheet,
    requestRedraw: requestRedraw,
    sendRequest: sendRequest,
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

function initStyles() {
    html.replaceStyleSheet('widgets-basic', [
        html.createStyle('.normal-button', [
            'display',
            'inline-block',
            'padding-left',
            '10px',
            'padding-right',
            '10px',
            'color',
            globalTheme.buttonText,
            'background',
            globalTheme.buttonBackground,
            'border-radius',
            '3px',
            'user-select',
            'none',
            'cursor',
            'default',
            'line-height',
            '30px'
        ]),
        html.createStyle('.normal-button:hover', [
            'color',
            globalTheme.buttonHoverText,
            'background',
            globalTheme.buttonHover
        ]),
        html.createStyle('.normal-button:active', [
            'color',
            globalTheme.buttonActiveText,
            'background',
            globalTheme.buttonActive
        ])
    ]);
}

function makeButtonPanel(left, right) {
    var padding, paddingPx, full, leftContainer, rightContainer;
    padding = 10;
    paddingPx = padding + 'px';
    full = 'calc(100% - ' + padding * 2 + 'px)';
    leftContainer = html.div({ 'text-align': 'left' }, left);
    html.absRect(leftContainer, paddingPx, paddingPx, full, full);
    rightContainer = html.div({ 'text-align': 'right' }, right);
    html.absRect(rightContainer, paddingPx, paddingPx, full, full);
    return html.div({
        'height': '30px',
        'position': 'relative'
    }, leftContainer, rightContainer);
}

function makeSimpleButton(text, action) {
    var button;
    button = html.div('normal-button', { text: text });
    html.registerEvent(button, 'click', action);
    return button;
}

return {
    arrangeTopBottom: arrangeTopBottom,
    initStyles: initStyles,
    makeButtonPanel: makeButtonPanel,
    makeSimpleButton: makeSimpleButton
};
}
