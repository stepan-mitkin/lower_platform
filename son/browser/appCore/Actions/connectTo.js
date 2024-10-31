pfun(url)

widgets.showWorking()
result = await window.api.connectTo(url)
widgets.hideWorking()

yes(result.ok)
openExplorer(url)

no(result.ok)
message = result.message || "ERR_COULD_NOT_CONNECT_TO_DATAVERSE"
widgets.errorSnack(tr(message))
