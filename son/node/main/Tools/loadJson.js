pfun(key)

content = storage.getItem(key + ".json") || "{}"
return deserialize(content)
