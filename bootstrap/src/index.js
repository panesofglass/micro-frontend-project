import { navigateTo } from "./router"
import { createPublicApi } from "./publicApi"

createPublicApi(navigateTo)

function loadMicroFrontend() {
  navigateTo(window.location.pathname)
}

document.addEventListener("DOMContentLoaded", loadMicroFrontend, false)
