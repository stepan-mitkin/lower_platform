pfun(request, headers)

yes(headers)
forObj(headers, (value, key) => request.setRequestHeader(key, value))
