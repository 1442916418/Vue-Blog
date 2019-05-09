<template>
  <el-row>
    <el-col :span="24">
      <div class="title">
        <h1 v-text="name" @click="()=>{$router.push('/')}"></h1>
        <h3 v-text="subTitle"></h3>
      </div>
    </el-col>
    <el-col :span="24">
      <el-menu
        router
        :default-active="$route.path"
        mode="horizontal"
        background-color="rgba(255,255,255,0)"
        text-color="#909399"
        active-text-color="#303133"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="contact">联系</el-menu-item>
        <el-menu-item index="administration">管理</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      name: "吴阿顺的疯狂",
      subTitle: "常在河边走，哪有不湿鞋"
    };
  }
};
</script>

<style scoped>
.title h1 {
  font-family: cursive;
  font-size: 2.5em;
  font-weight: bold;
  color: #303133;
  transition: all 1.5s ease;
  cursor: pointer;
}
.title h1:hover{
  color: #171766;
  padding-left: 120px;
}
.title h3 {
  text-indent: 2.5em;
  font-size: 1em;
  font-weight: 500;
  color: #606266;
}
</style>
