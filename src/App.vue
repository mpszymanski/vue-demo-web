<template>
  <div id="app">
    <the-nav/>
    <main class="section">
      <router-view/>
    </main>
  </div>
</template>

<script>
import TheNav from '@/components/TheNav.vue'

export default {
  name: 'App',
  components: {
    TheNav
  }
}
</script>

<style>
#app {
  background-image: url('/static/background.jpg');
  background-size: cover;
  background-position: fixed;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
