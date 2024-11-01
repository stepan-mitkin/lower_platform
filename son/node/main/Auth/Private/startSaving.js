pfun(auth, url, id)

authentications[url] = auth
save = data => {
    key = id + "-auth.json"
    storage.setItem(key, data)
}
auth.registerSave(save)