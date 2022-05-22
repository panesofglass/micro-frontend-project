<template>
  <div class="signin-page">
    <div class="text polka-dot-bg">
      <header>
        <h1>Sign In</h1>
      </header>
      <form class="signin-form" action="https://buildingmfe.maxgallo.io/api/login" method="post" @submit.prevent="onSubmit">
        <input
          id="username"
          name="username"
          v-model="username"
          type="text"
          placeholder="Username" />
        <input
          id="password"
          name="password"
          v-model="password"
          type="password"
          placeholder="Password" />
        <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "../components/Footer.vue"
import { goToMusicMicroFrontend } from "../bootstrap"

export default {
  components: {
    Footer
  },
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    onSubmit() {
      const payload = {
        username: this.username,
        password: this.password
      }
      fetch("https://buildingmfe.maxgallo.io/api/login", {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(({status, data}) => {
        if (status === "success") {
          this.username = ""
          this.password = ""
          window.sessionStorage.setItem("token", data.token)
          goToMusicMicroFrontend()
        } else {
          window.sessionStorage.removeItem("token")
          alert("Authentication failed")
          console.error(res)
        }
      })
      .catch(e => {
        window.sessionStorage.removeItem("token")
        alert("Authentication failed")
        console.error(e)
      })
    }
  }
}
</script>

<style>
.signin-page {
  background-image: url('./vinyl2-bg.jpg');
  background-size: cover;
  height: 100vh;
  width: 100%;
  color: var(--mint-cream);
  font-family: sans-serif;
}
button {
  display: block;
  margin-top: 5px;
}

input {
  margin: 5px 0px;
}
</style>