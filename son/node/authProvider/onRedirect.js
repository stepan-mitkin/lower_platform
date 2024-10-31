pfun(newUrl, completed)
console.log('onRedirect:', newUrl);

yes(newUrl.startsWith(redirectUri))
const urlParams = new URL(newUrl);
const authCode = urlParams.searchParams.get('code');

yes(authCode)
authWindow.close();

// Exchange the auth code for an access token
const tokenRequest = {
    code: authCode,
    scopes: authCodeUrlParams.scopes,
    redirectUri: authCodeUrlParams.redirectUri,
};


tokenResponse = await clientApplication.acquireTokenByCode(tokenRequest);
result = {ok:true, token:tokenResponse}
console.log('onRedirect completed:', result);
completed(result)

