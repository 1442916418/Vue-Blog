<template>
  <div class="header-box">
    <header class="header">
      <div class="logo">
        <img src="https://file.iviewui.com/dist/e1cf12c07bf6458992569e67927d767e.png">
      </div>
      <ul>
        <li>
          <Icon type="ios-chatboxes-outline" size="20"/>
          <span class="msg">消息</span>
        </li>
        <li>
          <span>
            欢迎
            <span class="user-name" v-html="rearName"></span>登录
          </span>
        </li>
        <li>
          <Icon :style="{cursor:'pointer'}" @click="signOut" type="ios-log-out" size="20"/>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rearName: sessionStorage.getItem("rearName")
    };
  },
  methods: {
    signOut() {
      this.$router.push("/");
      sessionStorage.removeItem("rearName");
    }
  }
};
</script>

<style scoped>
.hader-box {
  width: 100%;
  height: 55px;
}
/* 页眉 */
.header {
  background-color: rgb(241, 241, 241);
  width: 100%;
  height: 55px;
  line-height: 55px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.logo {
  width: 100px;
  height: 40px;
  margin-top: 5px;
  float: left;
  margin-left: 100px;
  color: blue;
}
.logo img {
  width: 100%;
  height: 100%;
}
.header ul {
  float: right;
}
.header ul li {
  list-style-type: none;
  float: left;
  width: 120px;
  height: 55px;
  line-height: 55px;
  color: #aaa;
  font-size: 14px;
}
.msg {
  margin-left: 5px;
}
.user-name {
  margin: 0 5px;
  color: #5cadff;
}
</style>
