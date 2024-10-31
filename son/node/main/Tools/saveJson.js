pfun(key, obj)
content = serialize(obj)
storage.setItem(key + ".json", content)