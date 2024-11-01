pfun(newUrl, completed)
console.log('onRedirect:', newUrl);

yes(newUrl.startsWith(redirectUri))
const urlParams = new URL(newUrl);
const authCode = urlParams.searchParams.get('code');

yes(authCode)
authCompleted = true
authWindow.close();

// Exchange the auth code for an access token
const tokenRequest = {
    code: authCode,
    scopes: authCodeUrlParams.scopes,
    redirectUri: authCodeUrlParams.redirectUri,
};


tokenResponse = await clientApplication.acquireTokenByCode(tokenRequest);
account = tokenResponse.account
result = {ok:true, token:tokenResponse.accessToken, account:account}
console.log('onRedirect completed:', result);
saveState()
completed(result)

