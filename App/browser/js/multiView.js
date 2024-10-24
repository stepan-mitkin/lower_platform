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
