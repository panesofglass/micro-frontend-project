<template>
  <div class="signin">
    <header>
      <h1>Sign In</h1>
    </header>
    <form class="signin-form" action="https://buildingmfe.maxgallo.io/api/login" method="post" @submit="onSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          id="username"
          name="username"
          v-model="username"
          type="text"
          class="form-control form-control-lg" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          v-model="password"
          type="password"
          class="form-control form-control-lg" />
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>
    </form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
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
          window.bootstrap.router.navigateTo("/play")
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
