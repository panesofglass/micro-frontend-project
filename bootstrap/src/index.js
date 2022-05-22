import { checkAuthentication, navigateTo } from "./router"
import { createPublicApi } from "./publicApi"
import { eventNames } from "./events"

createPublicApi({navigateTo, eventNames})

function loadMicroFrontend() {
  checkAuthentication()
    .then(isAuthenticated => {
      const pathname = isAuthenticated ?
        window.location.pathname === "/" ? "/play" : window.location.pathname :
        "/hello"
      navigateTo(pathname)
    })
}

document.addEventListener("DOMContentLoaded", loadMicroFrontend, false)

document.addEventListener(
  window.bootstrap.eventNames.MICRO_FRONTEND_WILL_UNMOUNT,
  () => console.log("micro frontend will unmount"))
