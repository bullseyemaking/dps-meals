const auth0 = {
    domain: AUTH0_DOMAIN,
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    callbackUrl: AUTH0_CALLBACK_URL,
  }
  
  const redirectUrl = state => `${auth0.domain}/authorize?response_type=code&client_id=${auth0.clientId}&redirect_uri=${auth0.callbackUrl}&scope=openid%20profile%20email&state=${encodeURIComponent(state)}`
  
  const generateStateParam = () => "stub"
  
  const verify = async event => {
    // Verify a user based on an auth cookie and Workers KV data
    return { accessToken: "123" }
  }
  
  // Returns an array with the format
  //   [authorized, context]
  export const authorize = async event => {
    const authorization = await verify(event)
    if (authorization.accessToken) {
      return [true, { authorization }]
    } else {
      const state = await generateStateParam()
      return [false, { redirectUrl: redirectUrl(state) }]
    }
  }