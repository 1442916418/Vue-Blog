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
          :style="{'margin-left':'20px'}"
          @click="()=>{$router.push('rearRegister')}"
        >注册</Button>
      </FormItem>
      <div class="bottom-home">
        <Button type="text" ghost @click="()=>{$router.push('/')}">返回首页</Button>
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
                this.rearNmae = sessionStorage.setItem("rearName", resp.data.name);
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
  position: fixed;
  height: 100%;
  width: 100%;
}
.form {
  width: 20%;
  background-color: rgba(240, 240, 240, 0.4);
  margin: 200px auto;
  padding: 20px 20px 0;
  border-radius: 5px;
  position: relative;
}
.bottom-home {
  text-align: right;
}
</style>