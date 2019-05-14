<template>
  <div class="userInfoPage-box">
    <div class="operation-box">
      <ButtonGroup>
        <Button type="success" icon="md-add" @click="addBtn">新增</Button>
      </ButtonGroup>
    </div>
    <Table border :columns="column" :data="data" :no-data-text="noData"></Table>

    <Modal
      :title="userInfoTitle"
      v-model="isShow"
      class-name="vertical-center-modal" 
      :footer-hide="true"
    >
      <Form :model="newData" :rules="rul" ref="rul">
        <FormItem label="登录名" prop="loginName">
          <Input v-model="newData.loginName" placeholder="请您输入用户名..."></Input>
        </FormItem>
        <FormItem label="登录密码" prop="loginPassword">
          <Input v-model="newData.loginPassword" placeholder="请您输入用户密码..."></Input>
        </FormItem>
        <FormItem label="昵称/姓名" prop="name">
          <Input v-model="newData.name" placeholder="请您输入个人昵称..."></Input>
        </FormItem>
        <FormItem label="副标题" prop="subTitle">
          <Input v-model="newData.subTitle" placeholder="请您输入个人描述..."></Input>
        </FormItem>
        <Form-item :style="{'text-align':'center'}">
          <i-button type="dashed" @click="cancel">取消</i-button>
          <i-button
            type="primary"
            :style="{'margin-left':'20px'}"
            @click="addAndUpdateUserInfo(userInfoTitle)"
          >确定</i-button>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { dateFormat } from "../../publicJs/dateFormat.js";

export default {
  inject: ['reload'],
  data() {
    return {
      temporaryData: "",
      userInfoTitle: "",
      rul: {
        loginName: [
          { required: true, message: "必须 不能为空", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA50-9a-zA-Z_]{3,10}$/,
            message: "必须 不能为空 3-10个中文字符、英文字母、数字及下划线",
            trigger: "blur"
          }
        ],
        loginPassword: [
          { required: true, message: "必须 不能为空", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{3,6}$/,
            message: "必须 不能为空 3-6个英文字母或数字",
            trigger: "blur"
          }
        ],
        name: [
          { required: true, message: "必须 不能为空", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA50-9a-zA-Z_]{3,10}$/,
            message: "必须 不能为空 3-10个中文字符、英文字母、数字及下划线",
            trigger: "blur"
          }
        ],
        subTitle: [
          { required: true, message: "必须 不能为空", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA50-9a-zA-Z，。；！？’‘“”_!"#$%&\'()*+,-./:;<=>?@\[\]^_`{|}~]{0,20}$/,
            message: "必须 不能为空 0-20个中文字符、英文字母、数字及下划线",
            trigger: "blur"
          }
        ]
      },
      newData: {
        name: "",
        subTitle: "",
        createionTime: "",
        loginName: "",
        loginPassword: ""
      },
      isShow: false,
      noData: "加载中",
      data: [],
      column: [
        {
          title: "ID",
          key: "id",
        },
        {
          title: "用户名",
          key: "loginName",
        },
        {
          title: "用户密码",
          key: "loginPassword",
        },
        {
          title: "个人昵称",
          key: "name"
        },
        {
          title: "个人描述",
          key: "subTitle"
        },
        {
          title: "创建时间",
          key: "creationTime",
        },
        {
          title: "上次修改时间",
          key: "lastModificationTime",
        },
        {
          title: "Action",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.temporaryData = params.row;
                      this.newData.loginName = params.row.loginName;
                      this.newData.loginPassword = params.row.loginPassword;
                      this.newData.name = params.row.name;
                      this.newData.subTitle = params.row.subTitle;
                      this.userInfoTitle = "修改用户";
                      this.isShow = true;
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        content: `<p>确定要删除用户<h3><br> ${
                          params.row.name
                        } </h3></p>`,
                        onOk: () => {
                          this.remove(params.row);
                        },
                        onCancel: () => {}
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    // 增加或修改
    addAndUpdateUserInfo(e) {
      if (e === "增加用户") {
        if (
          this.newData.name === "" &&
          this.newData.subTitle === "" &&
          this.newData.loginName === "" &&
          this.newData.loginPassword === ""
        ) {
          this.$Message.warning("请正确填写，否则无法提交");
        } else {
          this.$http
            .post(
              "/cgi-bin/userInfo_insert.py",
              {
                loginName: this.newData.loginName,
                loginPassword: this.newData.loginPassword,
                name: this.newData.name,
                subTitle: this.newData.subTitle,
                createionTime: dateFormat(new Date())
              },
              {
                emulateJSON: true
              }
            )
            .then(resp => {
              // console.log(resp);
              if (resp.data === "success") {
                this.$Message.success("提交成功");
                // this.getUserData();
                this.reload()
                this.isShow = false;
                this.newData = {};
              } else {
                this.$Message.warning("提交失败");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      } else {
        if (
          this.newData.name === this.temporaryData.name &&
          this.newData.subTitle === this.temporaryData.subTitle &&
          this.newData.loginName === this.temporaryData.loginName &&
          this.newData.loginPassword === this.temporaryData.loginPassword
        ) {
          this.$Message.warning("您还没有修改数据哦!");
        } else {
          this.$http
            .post(
              "/cgi-bin/userInfo_update.py",
              {
                name: this.newData.name,
                subTitle: this.newData.subTitle,
                lastModificationTime: dateFormat(new Date()),
                loginName: this.newData.loginName,
                loginPassword: this.newData.loginPassword,
                id: this.temporaryData.id
              },
              {
                emulateJSON: true
              }
            )
            .then(resp => {
              // console.log(resp);
              if (resp.data === "success") {
                this.$Message.success("修改成功");
                // this.getUserData();
                this.reload()
                this.isShow = false;
                this.newData.name = "";
                this.newData.subTitle = "";
                this.newData.loginName = "";
                this.newData.loginPassword = "";
              } else {
                this.$Message.warning("修改失败");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    },
    // 获取全部用户信息
    getUserData() {
      this.$http
        .get("/cgi-bin/userInfo_select_all.py")
        .then(resp => {
          //   console.log(resp);
          if (resp.data === "error") {
            this.noData = '暂无数据...'
          } else {
            this.data = resp.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 取消模态框
    cancel() {
      this.isShow = !this.isShow;
      this.newData.name = "";
      this.newData.subTitle = "";
      this.newData.loginName = "";
      this.newData.loginPassword = "";
    },
    // 新增用户
    addBtn() {
      this.userInfoTitle = "增加用户";
      this.isShow = true;
    },
    // 删除用户
    remove(e) {
      this.$http
        .post(
          "/cgi-bin/userInfo_delete.py",
          { id: e.id },
          { emulateJSON: true }
        )
        .then(resp => {
          //   console.log(resp);
          if (resp.data == "success") {
            this.$Message.success("删除成功");
            // this.getUserData();
            this.reload();
          } else {
            this.$Message.error("删除失败");
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>

<style lang="less" scoped>
.userInfoPage-box {
  padding: 1.25em;
  .operation-box {
    margin-bottom: 1.25em;
  }
}
</style>