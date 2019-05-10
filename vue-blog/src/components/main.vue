<template>
  <div class="main-box">
    <div v-show="$route.meta.showContent">
      <ArticeleList></ArticeleList>
    </div>
    <transition :name="transitionName">
      <router-view name="mainContent"></router-view>
    </transition>
  </div>
</template>

<script>
import ArticeleList from "./articleList";

export default {
  data() {
    return {
      transitionName: "slide-left"
    };
  },
  components: {
    ArticeleList: ArticeleList
  },
  beforeRouteUpdate() {
    const toDepth = to.path.split("/").length;
    const fromDepth = from.path.split("/").length;
    this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    next();
  }
};
</script>

<style scoped>
.main-box {
  padding: 20px;
}
</style>
