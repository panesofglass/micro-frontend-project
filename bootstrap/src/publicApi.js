import { EVENT_NAMES } from "./mount"

function createPublicApi(navigateTo) {
	window.bootstrap = {
    eventNames: EVENT_NAMES,
    router: {
      navigateTo,
    }
  }
}

export { createPublicApi }
