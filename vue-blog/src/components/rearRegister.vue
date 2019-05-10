<template>
  <div class="reg-box">
    <Form class="form" :ref="user" :model="user" :label-width="50" :rules="rules">
      <FormItem label="姓名" prop="name">
        <Input v-model="user.name" placeholder="姓名"/>
      </FormItem>
      <FormItem label="密码" prop="pwd">
        <Input v-model="user.pwd" type="password" placeholder="密码"/>
      </FormItem>
      <FormItem style="text-align:center;">
        <Button type="primary" @click="reg(user)">注册</Button>
        <Button type="text" style="margin-left:20px;margin-right:50px;" @click="rest">重置</Button>
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
      user: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA50-9a-zA-Z_]{3,10}$/,
            message: "必须 3-10个中文字符、英文字母、数字及下划线",
            trigger: "blur"
          }
        ],
        pwd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{3,6}$/,
            message: "必须 不能含有非法字符，长度在3,6之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    rest() {
      this.user = {};
    },
    home() {
      this.$router.push("/");
    },
    reg(r) {
      this.$refs[r].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "http://127.0.0.1:1111/cgi-bin/backstage_reg.py",
              {
                name: r.name,
                pwd: r.pwd
              },
              { emulateJSON: true }
            )
            .then(resp => {
              this.$router.push("rearLogin");
            })
            .catch(error => {
              console.log(error);
            });
          this.$Message.success("注册成功!");
        } else {
          this.$Message.error("注册失败!");
        }
      });
    }
  }
};
</script>


<style scoped>
.reg-box {
  background-image: url("../assets/reg.jpg");
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
}
.left {
  text-align: left;
}
.bottom-home {
  text-align: right;
}
</style>
