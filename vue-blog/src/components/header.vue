<template>
  <el-row>
    <el-col :span="24">
      <transition name="tit">
        <div class="title" v-show="!isShow">
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
      name: sessionStorage.getItem("name"),
      subTitle: sessionStorage.getItem("subTitle"),
      isShow: true
    };
  },
  mounted() {
    if (sessionStorage.getItem("name") == null) {
      this.getUserInfo();
    } else {
      this.name = sessionStorage.getItem("name");
      this.subTitle = sessionStorage.getItem("subTitle");
      this.isShow = !this.isShow;
    }
  },
  methods: {
    getUserInfo() {
      this.$http
        .get("http://127.0.0.1:1111/cgi-bin/userInfo_select_all.py")
        .then(resp => {
          console.log(resp);
          sessionStorage.setItem("name", resp.data[0].name);
          sessionStorage.setItem("subTitle", resp.data[0].subTitle);

          this.name = sessionStorage.getItem("name");
          this.subTitle = sessionStorage.getItem("subTitle");
          this.isShow = !this.isShow;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
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
