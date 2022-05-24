import {restartApp} from "./bootstrap"

const Footer = () => {
  return (
    <nav className="footer polka-dot-bg">
      <a href="/signout" class="footer-link" onClick={restartApp}>Sign Out</a>
    </nav>
  )
}

export default Footer
