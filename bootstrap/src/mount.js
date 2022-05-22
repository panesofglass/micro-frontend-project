const CLASS_NAME = "micro-frontend"

function moveNodeToDocument(parent, document, node) {
  if (node.tagName === "SCRIPT") {
    const clonedNode = document.createElement(node.tagName)

    Array.from(node.attributes).forEach(attribute => clonedNode.setAttribute(attribute.name, attribute.value))
    clonedNode.classList.add(CLASS_NAME)
    clonedNode.innerHTML = node.innerHTML

    parent.appendChild(clonedNode)
    return
  }

  const adoptedNode = document.adoptNode(node)
  adoptedNode.classList.add(CLASS_NAME)
  parent.appendChild(adoptedNode)
}

function addOrUpdateBaseTag(microFrontendName) {
  const [existingBaseElement] = document.getElementsByTagName("base")
  if (existingBaseElement) {
    existingBaseElement.setAttribute("href", `/mfe/${microFrontendName}/`)
    return
  }

  const baseElement = document.createElement('base')
  baseElement.setAttribute('href', `/mfe/${microFrontendName}/`)
  document.head.appendChild(baseElement)
}

function mountMicroFrontendInPage(microFrontendName, microFrontendDocument) {
  const microFrontendHeadNodes = microFrontendDocument.querySelectorAll("head>*")
  const microFrontendBodyNodes = microFrontendDocument.querySelectorAll("body>*")

  addOrUpdateBaseTag(microFrontendName)
  for (let headNode of microFrontendHeadNodes) {
    moveNodeToDocument(document.head, document, headNode)
  }
  for (let bodyNode of microFrontendBodyNodes) {
    moveNodeToDocument(document.body, document, bodyNode)
  }
}

function unmountMicroFrontendInPage() {
  const nodesToRemove = document.querySelectorAll(`.${CLASS_NAME}`)
  for (let node of nodesToRemove) {
    if (node.parentElement) {
      node.parentElement.removeChild(node)
    }
  }
}

export { mountMicroFrontendInPage, unmountMicroFrontendInPage }
