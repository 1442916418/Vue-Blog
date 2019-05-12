<template>
  <div class="aside-box">
    <Menu :theme="theme" :open-names="['1']" width="100%" router>
      <Menu-item name="1" to="/main">
        <Icon type="ios-home"/>首页
      </Menu-item>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-paper"></Icon>内容管理
        </template>
        <Menu-item name="2-1" to="/articleMan">文章管理</Menu-item>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-people"></Icon>用户管理(后)
        </template>
        <Menu-item name="3-1" to="/backstageUserInfo">用户管理</Menu-item>
      </Submenu>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-people"></Icon>用户管理(前)
        </template>
        <Menu-item name="4-1" to="/userInfoPage">用户管理</Menu-item>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "dark"
    };
  }
};
</script>

<style lang="less" scoped>
</style>
