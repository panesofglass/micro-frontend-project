const TOKEN_NAME = "bootstrap_microfrontend_auth_token"

let isUserLoggedIn = false

function getToken() {
  return window.localStorage.getItem(TOKEN_NAME)
}

function setToken(token) {
  if (!token) {
    window.localStorage.removeItem(TOKEN_NAME)
    return
  }
  window.localStorage.setItem(TOKEN_NAME, token)
  isUserLoggedIn = true
}

function validateToken() {
  const token = getToken()
  if (token) {
    return fetch("https://buildingmfe.maxgallo.io/api/validate", {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      method: "POST"
    })
    .then(res => isUserLoggedIn = res.status === 200)
    .catch(() => isUserLoggedIn = false)
  } else {
    return Promise.resolve(false)
  }
}

export {
  getToken,
  setToken,
  validateToken,
  isUserLoggedIn
}
