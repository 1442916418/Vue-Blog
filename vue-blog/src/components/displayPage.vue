<template>
  <el-container class="container">
    <myGithub></myGithub>
    <el-header class="header" height="100%">
      <myheader></myheader>
    </el-header>
    <el-row>
      <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
        <el-aside class="aside" width="100%">
          <myAside></myAside>
        </el-aside>
      </el-col>
      <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
        <el-main class="main">
          <myMain></myMain>
        </el-main>
      </el-col>
    </el-row>
    <el-footer class="footer">
      <myFooter></myFooter>
    </el-footer>
  </el-container>
</template>

<script>
import Header from "./header";
import Aside from "./aside";
import Main from "./main";
import Footer from "./footer";
import MyGithub from "./github";

export default {
  data() {
    return {};
  },
  components: {
    myheader: Header,
    myAside: Aside,
    myMain: Main,
    myFooter: Footer,
    myGithub: MyGithub
  },
  
};
</script>

<style scoped>
.container {
  margin: 1.875em 10%;
  border-radius: 1.5625em;
  background-color: rgba(255, 255, 255, 0.5);
  opacity: 0.7;
  transition: all 0.6s linear;
}
.container:hover {
  transition: all 0.6s linear;
  opacity: 0.9;
}
</style>


