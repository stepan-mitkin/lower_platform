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
