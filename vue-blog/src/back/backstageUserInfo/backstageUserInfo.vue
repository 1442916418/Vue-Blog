<template>
  <div class="backstageUserInfo-box">
    <div class="operation-box">
      <ButtonGroup>
        <Button type="success" icon="md-add" @click="addBtn">新增</Button>
      </ButtonGroup>
    </div>
    <Table border :no-data-text="noData" :columns="column" :data="data"></Table>

    <Modal
      :title="userInfoTitle"
      v-model="isShow"
      class-name="vertical-center-modal"
      :footer-hide="true"
    >
      <Form :model="newData" :rules="rul" ref="rul">
        <FormItem label="用户名" prop="name">
          <Input v-model="newData.name" placeholder="请输入用户名..."></Input>
        </FormItem>
        <FormItem label="密码" prop="pwd">
          <Input v-model="newData.pwd" placeholder="请输入密码..."></Input>
        </FormItem>
        <Form-item :style="{'text-align':'center'}">
          <i-button type="dashed" @click="cancel">取消</i-button>
          <i-button
            type="primary"
            :style="{'margin-left':'1.25em'}"
            @click="addAndUpdateUserInfo(userInfoTitle)"
          >确定</i-button>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      temporaryData: "",
      rul: {
        name: [
          { required: true, message: "必须 不能为空", trigger: "blur" },
          {
            pattern: /^[\u4E00-\u9FA50-9a-zA-Z_]{3,10}$/,
            message: "必须 不能为空 3-10个中文字符、英文字母、数字及下划线",
            trigger: "blur"
          }
        ],
        pwd: [
          { required: true, message: "必须 不能为空", trigger: "blur" },
          {
            pattern: /^[0-9a-zA-Z]{3,6}$/,
            message: "必须 不能为空 不能含有非法字符，长度在3-6之间",
            trigger: "blur"
          }
        ]
      },
      newData: {
        name: "",
        pwd: ""
      },
      isShow: false,
      userInfoTitle: "",
      noData: "加载中",
      column: [
        {
          title: "ID",
          key: "id",
          align: "center"
        },
        {
          title: "用户名",
          key: "name",
          align: "center"
        },
        {
          title: "密码",
          key: "pwd",
          align: "center"
        },
        {
          title: "Action",
          key: "action",
          width: "180",
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
                      this.newData.name = params.row.name;
                      this.newData.pwd = params.row.pwd;
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
      ],
      data: []
    };
  },
  methods: {
    // 增加或修改
    addAndUpdateUserInfo(e) {
      if (e === "增加用户") {
        if (this.newData.name === "" && this.newData.pwd === "") {
          this.$Message.warning("请正确填写，否则无法提交");
        } else {
          this.$http
            .post(
              "http://127.0.0.1:1111/cgi-bin/backstage_reg.py",
              {
                name: this.newData.name,
                pwd: this.newData.pwd
              },
              {
                emulateJSON: true
              }
            )
            .then(resp => {
              // console.log(resp);
              if (resp.data === "success") {
                this.$Message.success("提交成功");
                // this.getBackstageUserInfoData();
                this.reload()
                this.isShow = false;
                this.newData.name = "";
                this.newData.pwd = "";
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
          this.newData.pwd === this.temporaryData.pwd
        ) {
          this.$Message.warning("您还没有修改数据哦!");
        } else {
          this.$http
            .post(
              "/cgi-bin/backstage_update.py",
              {
                name: this.newData.name,
                pwd: this.newData.pwd,
                id: this.temporaryData.id
              },
              {
                emulateJSON: true
              }
            )
            .then(resp => {
              console.log(resp);
              if (resp.data === "success") {
                this.$Message.success("修改成功");
                // this.getBackstageUserInfoData();
                this.reload();
                this.isShow = false;
                this.newData.name = "";
                this.newData.pwd = "";
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
    // 删除用户
    remove(e) {
      this.$http
        .post(
          "/cgi-bin/backstage_delete.py",
          { id: e.id },
          { emulateJSON: true }
        )
        .then(resp => {
          //   console.log(resp);
          if (resp.data == "success") {
            this.$Message.success("删除成功");
            // this.getBackstageUserInfoData();
            this.reload();
          } else {
            this.$Message.error("删除失败");
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    // 取消模态框
    cancel() {
      this.isShow = !this.isShow;
      this.newData.name = "";
      this.newData.pwd = "";
    },
    // 新增用户
    addBtn() {
      this.userInfoTitle = "增加用户";
      this.isShow = true;
    },
    // 获取初始化数据
    getBackstageUserInfoData() {
      this.$http
        .get("/cgi-bin/backstage_select_all.py")
        .then(resp => {
          //   console.log(resp);
          if (resp.data != "error") {
            this.data = resp.data;
          } else {
            this.$Message.error("获取初始数据失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getBackstageUserInfoData();
  }
};
</script>

<style lang="less" scoped>
.backstageUserInfo-box {
  padding: 1.25em;
  .operation-box {
    margin-bottom: 1.25em;
  }
}
</style>