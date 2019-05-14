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
  height: 3.4375em;
}
/* 页眉 */
.logo {
  width: 6.25em;
  height: 2.5em;
  margin-top: 0.3125em;
  float: left;
  margin-left: 6.25em;
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
  height: 3.4375em;
  line-height: 3.4375em;
  color: #aaa;
  font-size: 0.875em;
}
.msg {
  margin-left: 0.3125em;
}
.user-name {
  margin: 0 0.3125em;
  color: #5cadff;
}
</style>
