pfun(resolve, reject, method, url, body, headers)

request = new XMLHttpRequest()
request.onreadystatechange = () => onDataWhenReady(request, resolve)
request.open(method, url, true);


yes(headers)
forObj(headers, (value, key) => request.setRequestHeader(key, value))

section()
request.send(body);