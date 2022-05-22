const express = require("express", "4.18.1")
const boxen = require("boxen")
const chalk = require("chalk")
const path = require("path")

const app = express()
const port = 3001

// Add mount path to make script type=module work.
// https://stackoverflow.com/a/50053189/13289748
express.static.mime.define({"application/javascript": ["js"]})

app.use("/mfe/music/", express.static(path.join(__dirname, "music", "build")))
app.use("/mfe/welcome/", express.static(path.join(__dirname, "welcome", "dist")))
app.use("/hello/assets/", express.static(path.join(__dirname, "welcome", "dist", "assets")))
app.use("/", express.static(path.join(__dirname, "bootstrap", "dist")))

app.all("/*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "bootstrap", "dist")})
})

app.listen(port, () =>
  console.log(
    boxen(
      chalk.bold("Web server running at: ") + chalk.underline.blue("http://localhost:3001")
      + chalk.bold("\n\n" + chalk.cyan("Welcome ") + "Micro Frontend: ") + chalk.underline.blue("http://localhost:3001/hello")
      + chalk.bold("\n" + chalk.cyan("Music ") + "Micro Frontend:   ") + chalk.underline.blue("http://localhost:3001/play"),
      { padding: 1, borderColor: "green" }
    )
  )
)
