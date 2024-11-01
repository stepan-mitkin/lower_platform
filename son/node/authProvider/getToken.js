fun()

tokenRequest = {
    // If there are scopes that you would like users to consent up front, add them below
    // by default, MSAL will add the OIDC scopes to every token request, so we omit those here
    scopes: [],
    account: account
}

try {
    result = await clientApplication.acquireTokenSilent(tokenRequest);
    saveState()
    return {
        ok: true,
        token: result.accessToken,
        account: account
    }
} catch (error) {
    return await handleSilentError(error)
}