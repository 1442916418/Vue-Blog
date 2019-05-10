<template>
  <div class="aside-box">
    <Menu :theme="theme" :open-names="['1']" active-name="1-1"  accordion>
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-paper"></Icon>内容管理
        </template>
        <Menu-item name="1-1">文章管理</Menu-item>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-people"></Icon>用户管理(后)
        </template>
        <Menu-item name="2-1">用户管理</Menu-item>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-people"></Icon>用户管理(前)
        </template>
        <Menu-item name="3-1">用户管理</Menu-item>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theme: "light"
    };
  }
};
</script>

<style scoped>
.aside-box{
    margin: 55px auto 0;
}
</style>
