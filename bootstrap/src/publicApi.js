import { getToken, setToken } from "./auth"

function createPublicApi({ navigateTo, eventNames }) {
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
