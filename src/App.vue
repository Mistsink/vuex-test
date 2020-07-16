<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    num:{{this.$store.state.num}}
    getstr: {{this.$store.getters.getStr}}
    <button @click="conMutationClick">直接通过commit调用mutations中的con方法</button>
    <button @click="conActionClick">通过actions调用mutations中的con方法</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    conMutationClick () {
      this.$store.commit('con', 'payload')
    },
    conActionClick () {
      this.$store.dispatch('con', 'dispatch')
    }
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
  margin-top: 60px;
}
</style>
