<template>
  <div class="welcome-page">
    <div class="text polka-dot-bg">
      <h1>Red Records</h1>
      <div class="separator" />
      <p>LONDON - NEW WORK</p>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/Footer.vue';
import { getEventNames } from '../bootstrap';

export default {
  mounted() {
    function logMouseClick(event) {
      console.log(`x: ${event.clientX} y: ${event.clientY}`)
    }
    window.document.addEventListener("click", logMouseClick);

    const micrFrontendWillUnmountEvent = getEventNames().MICRO_FRONTEND_WILL_UNMOUNT;
    function removeMouseClickListener() {
      window.document.removeEventListener("click", logMouseClick);
      window.document.removeEventListener(micrFrontendWillUnmountEvent, removeMouseClickListener);
    }
    window.document.addEventListener(micrFrontendWillUnmountEvent, removeMouseClickListener);
  },
  components: {
    Footer
  }
}
</script>

<style>
  .welcome-page {
    background-image: url('./vinyl-bg.jpg');
    background-size: cover;
    height: 100vh;
    width: 100%;
    color: var(--mint-cream);
    font-family: sans-serif;
  }

  .polka-dot-bg {
    background-image: radial-gradient(#212121 20%, transparent 20%);
    background-size: 10px 10px;
  }

  .text {
    position: absolute;
    top: 50%;
    height: 250px;
    width: 250px;
    margin-top: -175px;
    margin-left: 50px;
    padding: 0px 20px;
    border: 10px solid var(--mint-cream);
  }

  .separator {
    background-color: var(--cinnabar);
    height: 5px;
    margin-top: -20px;
    margin-bottom: 22px;
  }
</style>
