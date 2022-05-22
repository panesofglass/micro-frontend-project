function moveNodeToDocument(parent, document, microFrontendName) {
	return function moveNode(node) {
    if (node.tagName === "SCRIPT") {
      const clonedNode = document.createElement(node.tagName)

      clonedNode.dataset.mfe = microFrontendName
      Array.from(node.attributes).forEach(attribute => clonedNode.setAttribute(attribute.name, attribute.value))
      clonedNode.innerHTML = node.innerHTML

      parent.appendChild(clonedNode)
      return
    }

    const adoptedNode = document.adoptNode(node)
    adoptedNode.dataset.mfe = microFrontendName
    parent.appendChild(adoptedNode)
  }
}

function addOrUpdateBaseTag(microFrontendName) {
  const baseElements = document.getElementsByTagName("base")
  const baseElement = baseElements.length !== 0 ?  baseElements[0] : document.createElement('base')
  baseElement.setAttribute('href', `/mfe/${microFrontendName}/`)
  document.head.appendChild(baseElement)
}

function removeChildren(parent, nodes) {
  for (let node of nodes) {
    parent.removeChild(node)
  }
}

function removeMicroFrontendPreviousNodes(microFrontendName) {
  const headNodesToRemove = document.head.querySelectorAll(`:not([data-mfe=${microFrontendName}])`)
  const bodyNodesToRemove = document.body.querySelectorAll(`:not([data-mfe=${microFrontendName}])`)
  removeChildren(document.head, headNodesToRemove)
  removeChildren(document.body, bodyNodesToRemove)
}

function mountMicroFrontendInPage(microFrontendName, microFrontendDocument) {
  const microFrontendHeadNodes = microFrontendDocument.head.children
  const microFrontendBodyNodes = microFrontendDocument.body.children

  addOrUpdateBaseTag(microFrontendName)
  removeMicroFrontendPreviousNodes(microFrontendName)
  for (let headNode of microFrontendHeadNodes) {
    moveNodeToDocument(document.head, document, microFrontendName)(headNode)
  }
  for (let bodyNode of microFrontendBodyNodes) {
    moveNodeToDocument(document.body, document, microFrontendName)(bodyNode)
  }
}

export default mountMicroFrontendInPage