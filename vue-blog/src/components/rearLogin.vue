<template>
  <div class="back-box">
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
          :style="{'margin-left':'1.25em'}"
          @click="()=>{$router.push('rearRegister')}"
        >注册</Button>
      </FormItem>
      <div class="bottom-home">
        <Button type="text" ghost @click="()=>{$router.push('/')}">返回首页</Button>
      </div>
      <div :style="{'color': '#808695','text-align':'center'}">
        用户名：
        <b>admin</b> 密码：
        <b>111</b>
      </div>
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
              "http://127.0.0.1:1111/cgi-bin/backstage_login.py",
              {
                name: n.name,
                pwd: n.pwd
              },
              { emulateJSON: true }
            )
            .then(resp => {
              // console.log(resp);
              if (resp.data.isOk == "success") {
                this.rearNmae = sessionStorage.setItem(
                  "rearName",
                  resp.data.name
                );
                this.$Message.success("登录成功");
                this.$router.push("administration");
              } else {
                this.$Message.error("登录失败，用户名或密码错误");
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$Message.error("登录失败");
        }
      });
    }
  }
};
</script>

<style scoped>
.back-box {
  background-image: url("../assets/rearBackground.jpg");
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.form {
  width: 25em;
  min-width: 15.625em;
  background-color: rgba(240, 240, 240, 0.4);
  margin: 12.5em auto;
  padding: 1.25em 1.25em 0;
  border-radius: 0.3125em;
  position: relative;
}
.bottom-home {
  text-align: right;
}
</style>