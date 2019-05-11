<template>
  <Layout class="container">
    <Header class="header" style="padding:0">
      <RearHeader></RearHeader>
    </Header>

    <Sider class="aside">
      <RearAside></RearAside>
    </Sider>

    <Content style="margin: 55px 0 0 200px;">
      <router-view name="rearMain"></router-view>
    </Content>
  </Layout>
</template>

<script>
import Header from "./header";
import Aside from "./aside";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$router.push({
      name: "main"
    });
  },
  components: {
    RearHeader: Header,
    RearAside: Aside
  }
};
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
}
.header {
  background-color: #ebeef5;
  width: 100%;
  height: 55px;
  line-height: 55px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.aside {
  background-color: #515a6e;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>
