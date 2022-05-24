function restartApp() {
  if (!window.bootstrap) {
    console.log('Bootstrap is not available');
    return;
  }
  window.bootstrap.router.restartApp()
}

function getToken() {
  if (!window.bootstrap) {
    console.log('Bootstrap is not available');
    return "";
  }
  return window.bootstrap.auth.getToken()
}

export {
  restartApp,
  getToken,
}
