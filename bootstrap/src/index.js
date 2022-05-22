import { navigateTo } from "./router"
import { createPublicApi } from "./publicApi"
import { eventNames } from "./events"
import { getToken, setToken, validateToken } from "./auth"

createPublicApi({
  navigateTo,
  eventNames,
  getToken,
  setToken
})

function loadMicroFrontend() {
  validateToken()
    .then(() => navigateTo(window.location.pathname))
}

document.addEventListener("DOMContentLoaded", loadMicroFrontend, false)

document.addEventListener(
  window.bootstrap.eventNames.MICRO_FRONTEND_WILL_UNMOUNT,
  () => console.log("micro frontend will unmount"))
