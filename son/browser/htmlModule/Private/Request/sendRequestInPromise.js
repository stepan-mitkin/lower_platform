pfun(resolve, reject, method, url, body, headers)

request = new XMLHttpRequest()
request.onreadystatechange = () => onDataWhenReady(request, resolve)
request.open(method, url, true);
setHeaders(request, headers)
request.send(body);