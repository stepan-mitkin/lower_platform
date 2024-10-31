const {app, ipcMain, BrowserWindow} = require('electron');
const {PublicClientApplication, InteractionRequiredAuthError} = require('@azure/msal-node');
const {shell} = require('electron');
var axios = require('axios');
const {LogLevel} = require('@azure/msal-node');

function authProvider(clientId, url) {

var msalConfig, clientApplication, cache, redirectUri, authWindow, authCodeUrlParams;
msalConfig = createMsalConfig(clientId);
clientApplication = new PublicClientApplication(msalConfig);
cache = clientApplication.getTokenCache();
redirectUri = 'http://localhost';
authWindow = undefined;
authCodeUrlParams = undefined;

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

async function loginCore(completed) {
    var authUrl;
    authWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: { nodeIntegration: false }
    });
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
}

async function onRedirect(newUrl, completed) {
    var tokenResponse, result;
    console.log('onRedirect:', newUrl);
    if (newUrl.startsWith(redirectUri)) {
        const urlParams = new URL(newUrl);
        const authCode = urlParams.searchParams.get('code');
        if (authCode) {
            authWindow.close();
            const tokenRequest = {
                code: authCode,
                scopes: authCodeUrlParams.scopes,
                redirectUri: authCodeUrlParams.redirectUri
            };
            tokenResponse = await clientApplication.acquireTokenByCode(tokenRequest);
            result = {
                ok: true,
                token: tokenResponse
            };
            console.log('onRedirect completed:', result);
            completed(result);
        }
    }
}

return { login: login };
}
module.exports = authProvider;
