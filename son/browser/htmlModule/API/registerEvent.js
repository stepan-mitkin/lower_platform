fun(element, type, listener, options)

callback = evt => {
    redrawRequested = false
    listener(evt)
    checkRedrawRequested()
}

element.addEventListener(type, callback, options)

