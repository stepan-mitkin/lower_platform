pfun(url)

widgets.showWorking()
result = await window.api.getToken(url)

yes(result.ok)
openExplorer(url)
return

no(result.ok)
widgets.hideWorking()
message = result.message || "ERR_COULD_NOT_CONNECT_TO_DATAVERSE"
widgets.errorSnack(tr(message))
