<template>
  <el-row>
    <el-col :span="24">
      <transition name="tit">
        <div class="title">
          <h1 v-text="name" @click="()=>{$router.push('/')}"></h1>
          <h3 v-text="subTitle"></h3>
        </div>
      </transition>
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
        <el-menu-item index="rearLogin">管理</el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
   data() {
    return {
      name: JSON.parse(sessionStorage.getItem('key')).name,
      subTitle: JSON.parse(sessionStorage.getItem('key')).subTitle,
    };
  },
  created(){
    let getUserInfo = JSON.parse(sessionStorage.getItem('key'));
    this.name = getUserInfo.name;
    this.subTitle = getUserInfo.subTitle;
  }
}
</script>

<style scoped>
.tit-enter {
  opacity: 0;
  height: 0;
}
.tit-enter-active {
  transition: all 0.2s linear;
}
.tit-enter-to {
  opacity: 1;
  height: 83px;
}

.title h1 {
  margin: 20px;
  font-family: cursive;
  font-size: 2.5em;
  font-weight: bold;
  color: #303133;
  transition: all 1.5s ease;
  cursor: pointer;
}
.title h1:hover {
  color: #171766;
  padding-left: 120px;
}
.title h3 {
  margin: 10px;
  text-indent: 2.5em;
  font-size: 1em;
  font-weight: 500;
  color: #606266;
}
</style>
