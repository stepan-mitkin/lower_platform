pfun(url)

message = tr("QUEST_ARE_YOU_SURE_YOU_WANT_TO_REMOVE_CONNECTION") + " " + url + "?"
ok = await widgets.criticalQuestion(message, tr("BUTTON_REMOVE"), tr("BUTTON_CANCEL"))

yes(ok)
widgets.showWorking()
await window.api.removeConnection(url)
await fetchConnections()
widgets.hideWorking()


