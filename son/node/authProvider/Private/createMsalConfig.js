pfun(clientId)

const AAD_ENDPOINT_HOST = "https://login.microsoftonline.com/"; // include the trailing slash

return {
    auth: {
        clientId: clientId,
        authority: AAD_ENDPOINT_HOST + "organizations"
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: LogLevel.Verbose,
        }
    }
}