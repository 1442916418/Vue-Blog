<template>
  <div id="app">
    <router-view/>
    <router-view name="adminContent"></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(44, 44, 44);
  overflow: hidden;
  background-image: url("/static/images/back.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;    
}
</style>
