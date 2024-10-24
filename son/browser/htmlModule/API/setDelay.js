fun(action, timeout)

callback = () => {
    redrawRequested = false
    action()
    checkRedrawRequested()
}

return setTimeout(callback, timeout)