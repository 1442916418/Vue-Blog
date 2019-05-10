<template>
  <el-container class="container">
    <el-header class="header" height="100%">
      <RearHeader></RearHeader>
    </el-header>
    <el-row>
      <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
        <el-aside class="aside" width="100%">
          <RearAside></RearAside>
        </el-aside>
      </el-col>
      <el-col :xs="24" :sm="19" :md="19" :lg="19" :xl="19">
        <el-main class="main">
          <RearMain></RearMain>
        </el-main>
      </el-col>
    </el-row>
    <!-- <el-footer class="footer">
      <RearFooter></RearFooter>
    </el-footer> -->
  </el-container>
</template>

<script>
import Header from "./header";
import Aside from "./aside";
import Main from "./main";
import Footer from "./footer";

export default {
  data() {
    return {};
  },
  components: {
    RearHeader: Header,
    RearAside: Aside,
    RearMain: Main,
    RearFooter: Footer
  }
};
</script>

<style scoped>
.container {
  background-color: white;
}
</style>
