<template>
  <div class="login-box">
    <Form class="form" :ref="userData" :model="userData" :rules="ruleInline">
      <FormItem prop="name">
        <Input type="text" v-model="userData.name" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="pwd">
        <Input type="password" v-model="userData.pwd" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem :style="{'text-align':'center'}">
        <Button type="primary" @click="handleSubmit(userData)">登录</Button>
        <Button
          type="text"
          ghost
          :style="{'margin-left':'20px'}"
          @click="()=>{$router.push('rearRegister')}"
        >注册</Button>
      </FormItem>
      <div class="bottom-home">
        <Button type="text" ghost @click="()=>{$router.push('/')}">返回首页</Button>
      </div>
        <div :style="{'color': '#808695','text-align':'center'}">用户名:<b>user</b> 密码:<b>111</b></div>
    </Form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      rearNmae: "",
      userData: {
        name: "",
        pwd: ""
      },
      ruleInline: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        pwd: [{ required: true, message: "用户密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(n) {
      this.$refs[n].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "/cgi-bin/userInfo_login.py",
              {
                name: n.name,
                pwd: n.pwd
              },
              { emulateJSON: true }
            )
            .then(resp => {
              // console.log(resp);
              if (resp.data === "error") {
                this.$Message.error("登录失败，用户名或密码错误");
              } else {
                this.storageObj(resp.data[0]);
                this.$Message.success("登录成功");
                this.$router.push("/");
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$Message.error("登录失败");
        }
      });
    },
    storageObj(obj) {
      let checkedIdStr = JSON.stringify(obj);
      sessionStorage.setItem("key", checkedIdStr);
    }
  }
};
</script>

<style lang="less" scoped>
.login-box {
  z-index: 1000;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-image: url("../assets/login.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.form {
  width: 20%;
  background-color: rgba(240, 240, 240, 0.7);
  margin: 200px auto;
  padding: 20px 20px 0;
  border-radius: 5px;
  position: relative;
}
.bottom-home {
  text-align: right;
}
</style>