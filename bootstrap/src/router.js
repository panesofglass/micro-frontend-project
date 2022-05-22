import config from "./config"
import download from "./download"
import { mountMicroFrontendInPage, unmountMicroFrontendInPage } from "./mount"
import { dispatchEvent, eventNames } from "./events"
import { isUserLoggedIn } from "./auth"

const {
    MICRO_FRONTEND_WILL_UNMOUNT,
    MICRO_FRONTEND_DID_UNMOUNT,
    MICRO_FRONTEND_WILL_MOUNT,
    MICRO_FRONTEND_DID_MOUNT,
} = eventNames;

function getMicroFrontendFromPathname(pathname = window.location.pathname) {
  const [ , microFrontendId ] = pathname.split("/")
  const microFrontend = config.microFrontends.find(microFrontend => microFrontend.pathnameId === microFrontendId)

  if (!microFrontend) {
    return
  }

  return microFrontend
}

function getMicroFrontendEntryPointUrl(microFrontendName) {
  return `/mfe/${microFrontendName}/index.html`
}

const navigationHistory = []

function navigateTo(pathname) {
  const microFrontend = getMicroFrontendFromPathname(pathname)

  if (!microFrontend) {
    console.log(`Could not mount a micro frontend based on ${pathname}; redirecting to ${config.defaultPathname}`)
    return navigateTo(config.defaultPathname)
  }

  if (!isUserLoggedIn && microFrontend.restricted) {
    console.log(`You're not authorized to access this micro frontend; redirecting to ${config.defaultPathname}`)
    return navigateTo(config.defaultPathname)
  }

  if (isUserLoggedIn && !microFrontend.restricted) {
    console.log(`Redirecting to ${config.defaultPathnameWhenLoggedIn}`)
    return navigateTo(config.defaultPathnameWhenLoggedIn)
  }

  const microFrontendName = microFrontend.name

  if (navigationHistory.length > 0) {
    const currentMicroFrontend = getMicroFrontendFromPathname(navigationHistory[navigationHistory.length - 1])
    dispatchEvent(MICRO_FRONTEND_WILL_UNMOUNT, { microFrontendName: currentMicroFrontend.name })
    unmountMicroFrontendInPage()
    dispatchEvent(MICRO_FRONTEND_DID_UNMOUNT, { microFrontendName: currentMicroFrontend.name })
  }

  dispatchEvent(MICRO_FRONTEND_WILL_MOUNT, { microFrontendName })
  navigationHistory.push(pathname)
  window.history.pushState({}, "", pathname)

  const microFrontendEntryPointUrl = getMicroFrontendEntryPointUrl(microFrontendName)

  download(microFrontendEntryPointUrl)
    .then(microFrontendDocument => {
      mountMicroFrontendInPage(microFrontendName, microFrontendDocument)
    })
    .then(() => {
      dispatchEvent(MICRO_FRONTEND_DID_MOUNT, { microFrontendName })
    })
}

export { navigateTo }
