<template>
  <div class="home">
    <MyDisplayPage></MyDisplayPage>
  </div>
</template>

<script>
import DisplayPage from './displayPage'

export default {
  components: {
    MyDisplayPage: DisplayPage
  }
}
</script>


<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-image: url("/static/images/back.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

</style>
