const {app, ipcMain, BrowserWindow} = require('electron');
const {PublicClientApplication, InteractionRequiredAuthError} = require('@azure/msal-node');
const {shell} = require('electron');
var axios = require('axios');
const {LogLevel} = require('@azure/msal-node');

function authProvider(clientId, url) {

var msalConfig, clientApplication, cache, redirectUri, authWindow, authCodeUrlParams, authCompleted, account, save;
msalConfig = createMsalConfig(clientId);
clientApplication = new PublicClientApplication(msalConfig);
cache = clientApplication.getTokenCache();
redirectUri = 'http://localhost';
authWindow = undefined;
authCodeUrlParams = undefined;
authCompleted = false;
account = undefined;
save = undefined;

async function getToken() {
    var tokenRequest, result;
    tokenRequest = {
        scopes: [],
        account: account
    };
    try {
        result = await clientApplication.acquireTokenSilent(tokenRequest);
        saveState();
        return {
            ok: true,
            token: result.accessToken,
            account: account
        };
    } catch (error) {
        return await handleSilentError(error);
    }
}

function load(accountInfo, cacheContent) {
    account = accountInfo;
    cache.deserialize(cacheContent);
}

function login() {
    return new Promise(async resolve => {
        try {
            await loginCore(resolve);
        } catch (ex) {
            console.log('ERROR loginCore ' + ex.message);
            resolve({
                ok: false,
                message: ex.message
            });
        }
    });
}

function registerSave(saveCallback) {
    save = saveCallback;
    saveState();
}

function createMsalConfig(clientId) {
    const AAD_ENDPOINT_HOST = 'https://login.microsoftonline.com/';
    return {
        auth: {
            clientId: clientId,
            authority: AAD_ENDPOINT_HOST + 'organizations'
        },
        system: {
            loggerOptions: {
                loggerCallback(loglevel, message, containsPii) {
                    console.log(message);
                },
                piiLoggingEnabled: false,
                logLevel: LogLevel.Verbose
            }
        }
    };
}

async function handleSilentError(error) {
    if (error instanceof InteractionRequiredAuthError) {
        console.log('Silent token acquisition failed, acquiring token interactive', error);
        return await login();
    }
    return {
        ok: false,
        message: error.message
    };
}

async function loginCore(completed) {
    var authUrl;
    authWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: { nodeIntegration: false }
    });
    authWindow.setMenu(null);
    authCodeUrlParams = {
        scopes: [url + '.default'],
        redirectUri: redirectUri
    };
    authUrl = await clientApplication.getAuthCodeUrl(authCodeUrlParams);
    authWindow.loadURL(authUrl);
    authWindow.webContents.on('will-redirect', async (event, newUrl) => {
        try {
            await onRedirect(newUrl, completed);
        } catch (ex) {
            console.log('ERROR will-redirect ' + ex.message);
            completed({
                ok: false,
                message: ex.message
            });
        }
    });
    authWindow.on('close', () => onClose(completed));
}

function onClose(completed) {
    if (authCompleted) {
    } else {
        authCompleted = true;
        completed({
            ok: false,
            message: 'MES_CANCELLED_BY_USER'
        });
    }
}

async function onRedirect(newUrl, completed) {
    var tokenResponse, result;
    console.log('onRedirect:', newUrl);
    if (newUrl.startsWith(redirectUri)) {
        const urlParams = new URL(newUrl);
        const authCode = urlParams.searchParams.get('code');
        if (authCode) {
            authCompleted = true;
            authWindow.close();
            const tokenRequest = {
                code: authCode,
                scopes: authCodeUrlParams.scopes,
                redirectUri: authCodeUrlParams.redirectUri
            };
            tokenResponse = await clientApplication.acquireTokenByCode(tokenRequest);
            account = tokenResponse.account;
            result = {
                ok: true,
                token: tokenResponse.accessToken,
                account: account
            };
            console.log('onRedirect completed:', result);
            saveState();
            completed(result);
        }
    }
}

function saveState() {
    if (save) {
        const cacheData = cache.serialize();
        save(cacheData);
    }
}

return {
    getToken: getToken,
    load: load,
    login: login,
    registerSave: registerSave
};
}
module.exports = authProvider;
