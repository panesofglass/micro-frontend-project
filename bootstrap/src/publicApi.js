function createPublicApi({ navigateTo, restartApp, eventNames, getToken, setToken }) {
	window.bootstrap = {
    auth: {
      getToken,
      setToken,
    },
    router: {
      navigateTo,
      restartApp,
    },
    eventNames
  }
}

export { createPublicApi }
