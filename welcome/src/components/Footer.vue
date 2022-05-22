<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="footer polka-dot-bg">
    <RouterLink to="/" class="sign-in-link">Home</RouterLink>
    <RouterLink to="/signin" class="sign-in-link">Sign In</RouterLink>
  </nav>
</template>

<style>
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 90px;
    line-height: 90px;
    text-align: center;
  }

  .footer a:not(:first-child) {
    border-left: 5px solid var(--cinnabar);
  }

  .footer a {
    padding: 0px 15px;
  }

  .footer a:hover {
    text-decoration: underline;
    text-decoration-color: var(--cinnabar);
  }

  .sign-in-link {
    font-family: 'Abril Fatface', cursive;
    color: var(--mint-cream);
    font-size: 25px;
  }
</style>
