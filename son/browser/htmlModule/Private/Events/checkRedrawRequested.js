pfun()

section()
no(redrawRequested)
return

section()
yes(redrawPending)
return

section()
redrawPending = true
setTimeout(redrawAll, 0)
