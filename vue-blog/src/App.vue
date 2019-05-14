<template>
  <div id="app">
    <router-view/>
    <router-view name="adminContent"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  watch: {
    $route: {
      handler: function(to, from) {
        if (to != from) {
          sessionStorage.removeItem("count");
        }
      },
      // 深度观察监听
      deep: true
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(44, 44, 44);
  overflow-x: hidden;
}
</style>
