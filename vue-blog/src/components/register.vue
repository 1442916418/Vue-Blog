<template>
  <div class="register-box">
    <Form class="form" :ref="userData" :model="userData" :rules="ruleInline">
      <FormItem label="用户名" prop="loginName">
        <Input type="text" v-model="userData.loginName" placeholder="请您输入用户名..."></Input>
      </FormItem>
      <FormItem label="密码" prop="loginPwd">
        <Input type="password" v-model="userData.loginPwd" placeholder="请您输入用户密码.."></Input>
      </FormItem>
      <FormItem label="个性昵称" prop="name">
        <Input v-model="userData.name" placeholder="请您输入个人昵称..."></Input>
      </FormItem>
      <FormItem label="个性描述" prop="subTitle">
        <Input v-model="userData.subTitle" placeholder="请您输入个人描述..."></Input>
      </FormItem>
      <FormItem :style="{'text-align':'center'}">
        <Button type="primary" @click="handleSubmit(userData)">注册</Button>
        <Button type="text" ghost :style="{'margin-left':'20px'}">重置</Button>
      </FormItem>
      <div class="bottom-home">
        <Button type="text" ghost @click="()=>{$router.push('/')}">返回登录</Button>
      </div>
    </Form>
  </div>
</template>

<script>
import { dateFormat } from "../publicJs/dateFormat";
export default {
  data() {
    return {
      userData: {
        loginName: "",
        loginPwd: "",
        name: "",
        subTitle: ""
      },
      ruleInline: {
        loginName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA50-9a-zA-Z\s_]{3,10}$/,
            message: "必须 3-10个中文字符、英文字母、数字及下划线",
            trigger: "blur"
          }
        ],
        loginPwd: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{3,6}$/,
            message: "必须 3-6个英文字母或数字",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "个人昵称不能为空", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA50-9a-zA-Z_\s]{3,10}$/,
            message: "必须 3-10个中文字符、英文字母、数字及下划线",
            trigger: "blur"
          }
        ],
        subTitle: [
          { required: true, message: "个人描述不能为空", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA50-9a-zA-Z_\s]{0,20}$/,
            message: "必须 0-20个中文字符、英文字母、数字及下划线",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit(r) {
      console.log(r);
      this.$refs[r].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "http://127.0.0.1:1111/cgi-bin/userInfo_insert.py",
              {
                loginName: r.loginName,
                loginPassword: r.loginPwd,
                name: r.name,
                subTitle: r.subTitle,
                createionTime: dateFormat(new Date())
              },
              { emulateJSON: true }
            )
            .then(resp => {
              console.log(resp);
              if (resp.data === "success") {
                this.$Message.success("注册成功");
                this.$router.push("/");
              } else {
                this.$Message.error("注册失败");
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$Message.error("注册失败!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.register-box {
  z-index: 1000;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-image: url("../assets/login.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .form {
    width: 20%;
    min-width: 200px;
    margin: 100px auto;
    background-color: rgba(240, 240, 240, 0.7);
    padding: 20px 20px 0;
    border-radius: 5px;
    position: relative;
  }
  .bottom-home {
    text-align: right;
  }
}
</style>