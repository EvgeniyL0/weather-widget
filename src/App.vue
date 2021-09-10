<template>
  <div id="app">
    <main-container></main-container>
  </div>
</template>

<script>
import store from "./store";
import MainContainer from "./components/MainContainer.vue";

export default {
  store,
  name: "App",
  components: {
    MainContainer
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Source Sans Pro", sans-serif;
  box-sizing: border-box;
  width: 320px;
  height: 400px;
  background-color: #ffffff;
}
</style>
