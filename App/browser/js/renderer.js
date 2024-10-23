init();

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

function init() {
    var main, root, delayedResize;
    setUpModules();
    main = html.get('main');
    root = dummyNode('orangered', 50);
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
}

