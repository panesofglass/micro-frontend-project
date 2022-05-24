import {restartApp} from "./bootstrap"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="polka-dot-bg">
      <span className="link" onClick={restartApp}>Sign Out</span>
    </footer>
  )
}

export default Footer
