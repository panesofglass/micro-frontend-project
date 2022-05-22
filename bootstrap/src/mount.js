function moveNodeToDocument(parent, document, node) {
  if (node.tagName === "SCRIPT") {
    const clonedNode = document.createElement(node.tagName)

    clonedNode.classList.add("micro-frontend")
    Array.from(node.attributes).forEach(attribute => clonedNode.setAttribute(attribute.name, attribute.value))
    clonedNode.innerHTML = node.innerHTML

    parent.appendChild(clonedNode)
    return
  }

  const adoptedNode = document.adoptNode(node)
  adoptedNode.classList.add("micro-frontend")
  parent.appendChild(adoptedNode)
}

function addOrUpdateBaseTag(microFrontendName) {
  const baseElements = document.getElementsByTagName("base")
  const baseElement = baseElements.length > 0 ?  baseElements[0] : document.createElement('base')
  baseElement.setAttribute('href', `/mfe/${microFrontendName}/`)
  document.head.appendChild(baseElement)
}

export function mountMicroFrontendInPage(microFrontendName, microFrontendDocument) {
  const microFrontendHeadNodes = microFrontendDocument.head.children
  const microFrontendBodyNodes = microFrontendDocument.body.children

  addOrUpdateBaseTag(microFrontendName)
  for (let headNode of microFrontendHeadNodes) {
    moveNodeToDocument(document.head, document, headNode)
  }
  for (let bodyNode of microFrontendBodyNodes) {
    moveNodeToDocument(document.body, document, bodyNode)
  }
}

export function unmountMicroFrontendInPage() {
  const nodesToRemove = document.querySelectorAll(".micro-frontend")
  for (let node of nodesToRemove) {
    if (node.parentElement) {
      node.parentElement.removeChild(node)
    }
  }
}
