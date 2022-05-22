const CLASS_NAME = "micro-frontend"

const EVENT_NAMES = {
  MICRO_FRONTEND_DID_MOUNT: "did_mount",
  MICRO_FRONTEND_WILL_MOUNT: "will_mount",
  MICRO_FRONTEND_DID_UNMOUNT: "did_unmount",
  MICRO_FRONTEND_WILL_UNMOUNT: "will_unmount"
}

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
  document.dispatchEvent(new CustomEvent(EVENT_NAMES.MICRO_FRONTEND_WILL_MOUNT), {
    bubbles: true,
    cancelable: true
  })

  const microFrontendHeadNodes = microFrontendDocument.querySelectorAll("head>*")
  const microFrontendBodyNodes = microFrontendDocument.querySelectorAll("body>*")

  addOrUpdateBaseTag(microFrontendName)
  for (let headNode of microFrontendHeadNodes) {
    moveNodeToDocument(document.head, document, headNode)
  }
  for (let bodyNode of microFrontendBodyNodes) {
    moveNodeToDocument(document.body, document, bodyNode)
  }

  document.dispatchEvent(new CustomEvent(EVENT_NAMES.MICRO_FRONTEND_DID_MOUNT), {
    bubbles: true,
    cancelable: true
  })
}

function unmountMicroFrontendInPage() {
  document.dispatchEvent(new CustomEvent(EVENT_NAMES.MICRO_FRONTEND_WILL_UNMOUNT), {
    bubbles: true,
    cancelable: true
  })

  const nodesToRemove = document.querySelectorAll(`.${CLASS_NAME}`)
  for (let node of nodesToRemove) {
    if (node.parentElement) {
      node.parentElement.removeChild(node)
    }
  }

  document.dispatchEvent(new CustomEvent(EVENT_NAMES.MICRO_FRONTEND_DID_UNMOUNT), {
    bubbles: true,
    cancelable: true
  })
}

export { EVENT_NAMES, mountMicroFrontendInPage, unmountMicroFrontendInPage }
