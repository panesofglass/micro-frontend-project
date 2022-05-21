function downloadDocument(url, timeoutMs = 5000) {
  const xhr = new XMLHttpRequest()
  xhr.timeout = timeoutMs
  xhr.responseType = "document"

  return new Promise((resolve, reject) => {
    xhr.onerror = () => reject(new Error(`An error occurred while downloading ${url}`))
    xhr.ontimeout = () => reject(new Error(`The following request timed out: ${url}`))
    xhr.onload = () => {
      if (xhr.status >= 400) {
        reject(new Error(`Received HTTP Status ${request.status} for ${url}`))
      }
      resolve(xhr.response)
    }

    xhr.open("GET", url)
    xhr.send()
  })
}

export default downloadDocument
