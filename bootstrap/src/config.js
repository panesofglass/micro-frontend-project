const configuration = {
	microFrontends: [
    {
      name: "welcome",
      pathnameId: "hello",
      restricted: false
    },
    {
      name: "music",
      pathnameId: "play",
      restricted: true
    }
  ],
  defaultPathname: "/hello",
  defaultPathnameWhenLoggedIn: "/play"
}

export default configuration