<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface');

:root {
  --cinnabar: #E63B2E;
  --mint-cream: #F2F7F2;
}

html, body {
  height: 100%;
  margin: 0;
}

h1 {
  font-family: 'Abril Fatface', cursive;
  font-size: 50px;
}
</style>
