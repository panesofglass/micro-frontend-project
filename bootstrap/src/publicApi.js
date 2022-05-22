function createPublicApi({ navigateTo, eventNames, getToken, setToken }) {
	window.bootstrap = {
    auth: {
      getToken,
      setToken
    },
    router: {
      navigateTo,
    },
    eventNames
  }
}

export { createPublicApi }
