const TOKEN_NAME = "bootstrap_microfrontend_auth_token"

function getToken() {
  return window.localStorage.getItem(TOKEN_NAME)
}

function setToken(token) {
  window.localStorage.setItem(TOKEN_NAME, token)
}

export { getToken, setToken }
