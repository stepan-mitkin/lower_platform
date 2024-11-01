pfun(error)

yes(error instanceof InteractionRequiredAuthError)
console.log('Silent token acquisition failed, acquiring token interactive', error);
return await login();

no(error instanceof InteractionRequiredAuthError)
return {ok:false, message:error.message}