<template>
  <div id="app">
    <Loading :isLoading="isLoading" />
    <div v-if="!isLoading">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Loading from './components/LoadingScreen'

export default {
  name: 'App',
  components: {
    Loading
  },
  data() {
    return { isLoading: true }
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  },
  methods: {
    ...mapActions(['interceptorRequest', 'interceptorResponse'])
  },
  created() {
    this.interceptorRequest()
    this.interceptorResponse()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
