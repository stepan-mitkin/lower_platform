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
    onResize();
    main = html.get('main');
    __computeAll_rootNode();
    html.render(rootNode, main);
    delayedResize = debounce(onResize, 200);
    window.addEventListener('resize', delayedResize.push);
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
        buttonDefault: '#004d03',
        buttonDefaultText: 'white',
        buttonDefaultHover: '#013003',
        buttonDefaultHoverText: 'white',
        buttonDefaultActive: 'black',
        buttonDefaultActiveText: 'white',
        fontFamily: 'Arial',
        fontSize: '14px'
    };
    document.documentElement.style.fontFamily = globalTheme.fontFamily;
    document.documentElement.style.fontSize = globalTheme.fontSize;
}

function connected(connection) {
    console.log('connected', connection);
}

function createNewConnection() {
    var widget;
    widget = connectionScreen(connected);
    widgets.showCentralDialog(widget);
}

async function initStrings() {
    var language, response;
    language = 'en-us';
    response = await html.sendRequest('GET', './strings/' + language + '.json');
    globalStrings = JSON.parse(response.body);
    window.tr = tr;
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

function makeConnectionLine(connection) {
    return html.div({
        'padding': '10px',
        'text': connection.url
    });
}

function renderWelcome(container) {
    var topSize, logoImage, logoText, top, header, clientTop, clientBottom, bottomClient, bottom;
    topSize = '49px';
    logoImage = widgets.makeImg('lower_platform_logo.png');
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
    header = widgets.makeH1(tr('CONNECT_TO_DATAVERSE'));
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
    forEach(styles, printStyle, lines);
    content = lines.join('\n');
    addText(styleSheet, content);
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

function setText(element, text) {
    clear(element);
    addText(element, text);
}

function stretchToParent(element) {
    element.style.position = 'absolute';
    element.style.display = 'inline-block';
    element.style.left = '0px';
    element.style.top = '0px';
    element.style.width = '100%';
    element.style.height = '100%';
}

function stretchToScreen(element) {
    element.style.position = 'fixed';
    element.style.display = 'inline-block';
    element.style.left = '0px';
    element.style.top = '0px';
    element.style.width = '100vw';
    element.style.height = '100vh';
}

function unmount(widget) {
    if (widget.unmount) {
        widget.unmount();
    }
}

function applyArgument(arg, element) {
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
                        objFor(arg, setElementProperty, element);
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
    forEach(args, applyArgument, element);
    return element;
}

function removeExisting(id) {
    var element;
    element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

function setElementProperty(key, value, element) {
    if (key === 'text') {
        if (value) {
            addText(element, value);
            return;
        }
    } else {
        element.style.setProperty(key, value);
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
    createStyle: createStyle,
    div: div,
    get: get,
    img: img,
    makeWidget: makeWidget,
    render: render,
    replaceStyleSheet: replaceStyleSheet,
    sendRequest: sendRequest,
    setText: setText,
    stretchToParent: stretchToParent,
    stretchToScreen: stretchToScreen,
    unmount: unmount
};
}

function connectionScreen(connected) {

var active = true;
var clientIdRequested = false;
var clientIdInput;
var dynamicsUrlInput;
var errorMessage;
var connectButton;
var cancelButton;

var clientId, connection, url;
async function connect() {
    html.clear(errorMessage);
    connectButton.disable();
    cancelButton.disable();
    try {
        await __computeAll_connection();
    } catch (ex) {
        handleError(ex.message);
        return;
    }
    if (active) {
        await window.api.setItem('clientid.txt', clientId);
        html.hideCentralDialog();
        connected(connection);
    }
}

function handleError(message) {
    html.setText(errorMessage, tr(message));
    connectButton.enable();
    cancelButton.enable();
}

function render(container) {
    var controls;
    clientIdInput = widgets.makeWideTextInput();
    dynamicsUrlInput = widgets.makeWideTextInput();
    errorMessage = widgets.makeErrorMessage();
    connectButton = widgets.defaultButton(tr('BUTTON_LOGIN'), connect);
    cancelButton = widgets.normalButton(tr('BUTTON_CANCEL'), widgets.hideCentralDialog);
    controls = [
        widgets.makeH1(tr('BUTTON_NEW_CONNECTION')),
        widgets.makeSpacer10(),
        widgets.makeWideLabel('Client Id'),
        clientIdInput,
        widgets.makeSpacer10(),
        widgets.makeWideLabel(tr('DYNAMICS_URL')),
        dynamicsUrlInput,
        widgets.makeWideLabel(tr('FOR_EXAMPLE') + ', https://example.crm4.dynamics.com/'),
        widgets.makeSpacer10(),
        widgets.makeButtonPanel([connectButton.build()], [cancelButton.build()]),
        widgets.makeSpacer10(),
        errorMessage
    ];
    controls.forEach(widget => html.add(container, widget));
    if (clientIdRequested) {
    } else {
        clientIdRequested = true;
        requestClientId();
    }
}

async function requestClientId() {
    var savedClientId;
    savedClientId = await window.api.getItem('clientid.txt');
    if (active) {
        if (clientIdInput.value) {
        } else {
            clientIdInput.value = savedClientId;
        }
    }
}

function unmount() {
    active = false;
}

async function __computeAll_connection() {
    clientId = __compute_clientId();
    url = __compute_url();
    connection = await __compute_connection();
}

function __compute_clientId() {
    var result;
    result = clientIdInput.value.trim();
    if (result) {
        return result;
    } else {
        throw new Error('ERR_CLIENT_ID_IS_EMPTY');
    }
}

async function __compute_connection() {
    var result;
    result = await window.api.createConnection(clientId, url);
    if (result.ok) {
        return { url: url };
    } else {
        if (result.message) {
            console.error(result);
            throw new Error(result.message);
        } else {
            console.error(result);
            throw new Error('ERR_COULD_NOT_CONNECT_TO_DATAVERSE');
        }
    }
}

function __compute_url() {
    var trimmed;
    trimmed = dynamicsUrlInput.value.trim();
    if (trimmed) {
        if (trimmed.endsWith('/')) {
            return trimmed;
        } else {
            return trimmed + '/';
        }
    } else {
        throw new Error('ERR_DYNAMICS_URL_IS_EMPTY');
    }
}

return {
    render: render,
    unmount: unmount
};
}

function genericButton(text, callback, enabledClass, disabledClass) {

var container = undefined;
var enabled = true;

function action() {
    if (enabled) {
        callback();
    }
}

function build() {
    container = html.div(enabledClass, { text: text });
    container.addEventListener('click', action);
    return container;
}

function disable() {
    enabled = false;
    container.className = disabledClass;
}

function enable() {
    enabled = true;
    container.className = enabledClass;
}

return {
    build: build,
    disable: disable,
    enable: enable
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

const Z_CENTRAL = 100;
const Z_POPUP = 200;
const Z_SNACK = 300;

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

function defaultButton(text, callback) {
    return genericButton(text, callback, 'generic-button default-button', 'generic-button disabled-button');
}

function hideCentralDialog() {
    var root;
    root = html.get('question-root');
    html.clear(root);
}

function imgSrc(filename) {
    return './images/' + filename;
}

function initStyles() {
    html.replaceStyleSheet('widgets-basic', [
        html.createStyle('.generic-button', [
            'display',
            'inline-block',
            'padding-left',
            '10px',
            'padding-right',
            '10px',
            'border-radius',
            '3px',
            'user-select',
            'none',
            'cursor',
            'default',
            'line-height',
            '30px'
        ]),
        html.createStyle('.normal-button', [
            'color',
            globalTheme.buttonText,
            'background',
            globalTheme.buttonBackground
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
        ]),
        html.createStyle('.default-button', [
            'color',
            globalTheme.buttonDefaultText,
            'background',
            globalTheme.buttonDefault
        ]),
        html.createStyle('.default-button:hover', [
            'color',
            globalTheme.buttonDefaultHoverText,
            'background',
            globalTheme.buttonDefaultHover
        ]),
        html.createStyle('.default-button:active', [
            'color',
            globalTheme.buttonDefaultActiveText,
            'background',
            globalTheme.buttonDefaultActive
        ]),
        html.createStyle('.disabled-button', [
            'color',
            globalTheme.buttonDisabledText,
            'background',
            globalTheme.buttonDisabled
        ]),
        html.createStyle('input[type="text"]', [
            'padding',
            '5px',
            'font-family',
            globalTheme.fontFamily,
            'font-size',
            globalTheme.fontSize,
            'color',
            globalTheme.text,
            'background',
            globalTheme.background
        ])
    ]);
}

function makeButtonPanel(left, right) {
    var padding, paddingPx, full, leftContainer, rightContainer;
    padding = 0;
    paddingPx = padding + 'px';
    full = 'calc(100% - ' + padding * 2 + 'px)';
    leftContainer = html.div({ 'text-align': 'left' }, left);
    leftContainer.style.position = 'absolute';
    leftContainer.style.display = 'inline-block';
    leftContainer.style.left = paddingPx;
    leftContainer.style.top = paddingPx;
    leftContainer.style.height = full;
    rightContainer = html.div({ 'text-align': 'right' }, right);
    rightContainer.style.position = 'absolute';
    rightContainer.style.display = 'inline-block';
    rightContainer.style.right = paddingPx;
    rightContainer.style.top = paddingPx;
    rightContainer.style.height = full;
    return html.div({
        'height': '30px',
        'position': 'relative'
    }, leftContainer, rightContainer);
}

function makeErrorMessage(text) {
    return html.div({
        text: text,
        color: 'red'
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

function makeSimpleButton(text, action) {
    var button;
    button = html.div('generic-button normal-button', { text: text });
    button.addEventListener('click', action);
    return button;
}

function makeSpacer10() {
    return html.div({ height: '10px' });
}

function makeSpacer5() {
    return html.div({ height: '5px' });
}

function makeWideLabel(text) {
    return html.div({
        text: text,
        'margin-top': '3px',
        'margin-bottom': '3px'
    });
}

function makeWideTextInput(value) {
    var input;
    input = document.createElement('input');
    input.type = 'text';
    input.style.width = '100%';
    input.value = value || '';
    return input;
}

function normalButton(text, callback) {
    return genericButton(text, callback, 'generic-button normal-button', 'generic-button disabled-button');
}

function showCentralDialog(widget) {
    var qroot, root, background, client;
    hideCentralDialog();
    qroot = html.get('question-root');
    root = html.div();
    html.add(qroot, root);
    html.stretchToScreen(root);
    background = html.div({
        'z-order': Z_CENTRAL,
        'background': 'rgba(0, 0, 0, 0.5)'
    });
    html.stretchToParent(background);
    client = html.div({
        'z-order': Z_CENTRAL + 1,
        'padding': '10px',
        'top': '0px',
        'width': '400px',
        'max-width': window.innerWidth + 'px',
        'max-height': window.innerHeight + 'px',
        'background': globalTheme.background,
        'color': globalTheme.text,
        'overflow-y': 'auto'
    });
    html.centerHor(client);
    html.add(root, background);
    html.add(root, client);
    widget.render(client);
}

return {
    arrangeTopBottom: arrangeTopBottom,
    defaultButton: defaultButton,
    hideCentralDialog: hideCentralDialog,
    initStyles: initStyles,
    makeButtonPanel: makeButtonPanel,
    makeErrorMessage: makeErrorMessage,
    makeH1: makeH1,
    makeImg: makeImg,
    makeSimpleButton: makeSimpleButton,
    makeSpacer10: makeSpacer10,
    makeSpacer5: makeSpacer5,
    makeWideLabel: makeWideLabel,
    makeWideTextInput: makeWideTextInput,
    normalButton: normalButton,
    showCentralDialog: showCentralDialog
};
}
