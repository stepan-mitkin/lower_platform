function appCore() {

var appName;
appName = 'LowerPlatform';

var explorerNode, rootNode;
function init() {
    var main, root, delayedResize;
    setUpModules();
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

function setUpModules() {
    window.html = htmlModule();
    window.widgets = widgetTools();
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
