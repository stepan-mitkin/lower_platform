fun()

return new Promise(async (resolve) => {
    try {
        await loginCore(resolve)
    } catch (ex) {
        console.log("ERROR loginCore " + ex.message)
        resolve({ok:false, message:ex.message})
    }
})
