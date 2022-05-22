import config from "./config"
import download from "./download"
import { mountMicroFrontendInPage, unmountMicroFrontendInPage } from "./mount"

const navigationHistory = []

function getMicroFrontendNameFromPathname(pathname = window.location.pathname) {
  const [ , microFrontendId ] = pathname.split("/")
  const microFrontend = config.microFrontends.find(microFrontend => microFrontend.pathnameId === microFrontendId)

  if (!microFrontend) {
    return
  }

  return microFrontend.name
}

function getMicroFrontendEntryPointUrl(microFrontendName) {
  return `/mfe/${microFrontendName}/index.html`
}

function navigateTo(pathname) {
  if (navigationHistory.length > 0) {
    unmountMicroFrontendInPage()
  }

  const microFrontendName = getMicroFrontendNameFromPathname(pathname)

  if (!microFrontendName) {
    // TODO: load a "default" MFE
    throw new Error("Could not mount a micro frontend based on the current URL :(")
  }

  navigationHistory.push(pathname)
  window.history.pushState({}, "", pathname)

  const microFrontendEntryPointUrl = getMicroFrontendEntryPointUrl(microFrontendName)

  download(microFrontendEntryPointUrl).then(microFrontendDocument => {
    mountMicroFrontendInPage(microFrontendName, microFrontendDocument)
  })
}

window.bootstrap = {
  router: {
    navigateTo: navigateTo
  }
}

function loadMicroFrontend() {
  navigateTo(window.location.pathname)
}

document.addEventListener("DOMContentLoaded", loadMicroFrontend, false)
