pfun(request, resolve)


yes(request.readyState === 4)
result = {
    body: request.responseText,
    status: request.status
};
resolve(result)
