fun(method, url, body, headers)

return new Promise((resolve, reject) => {
    try {
        sendRequestInPromise(resolve, reject, method, url, body, headers)
    } catch (ex) {
        reject(ex)
    }
})
