function loadMicroFrontend() {
  const mfe = this.responseXML
  document.head.replaceChildren(...mfe.head.childNodes)
  document.body.replaceChildren(...mfe.body.childNodes)
}

function downloadIndexHtml(url) {
  const xhr = new XMLHttpRequest()
  xhr.responseType = "document"
  xhr.addEventListener("load", loadMicroFrontend)
  xhr.open("GET", url)
  xhr.send()
}

function getMicroFrontend() {
  switch (window.location.pathname) {
    case "/hello":
    case "/hello/":
      downloadIndexHtml(window.location.protocol + "://" + window.location.host + "/mfe/welcome/index.html")
      break
    case "/play":
    case "/play/":
      downloadIndexHtml(window.location.protocol + "://" + window.location.host + "/mfe/music/index.html")
      break
    default:
      throw "No MFE found for the current path"
  }
}

document.addEventListener("DOMContentLoaded", getMicroFrontend, false)
