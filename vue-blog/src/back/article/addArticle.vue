<template>
  <div class="addArticle-box">
    <Form :model="article">
      <FormItem label="标题">
        <Input v-model="article.title" placeholder="请输入文章标题..."></Input>
      </FormItem>
      <FormItem label="内容">
        <br>
        <div id="we" :style="{'background-color':'white'}"></div>
      </FormItem>
      <Form-item :style="{'text-align':'center'}">
        <i-button type="primary" long @click="add">提交</i-button>
        <br>
        <br>
        <i-button type="dashed" long @click="cancel">取消</i-button>
      </Form-item>
    </Form>
  </div>
</template>

<script>
import wangEditor from "wangeditor";

export default {
  data() {
    return {
      editor: null,
      article: {
        title: ""
      }
    };
  },
  methods: {
    cancel(){
      this.article = {};
      this.editor.txt.html('<p>请输入文章内容...</p>')
    },
    add() {
      if (this.article.title === "") {
        this.$Message.warning("必须 文章标题不能为空");
        return;
      } else if (!/^[\u4e00-\u9fa50-9a-zA-Z\s]{0,30}$/.test(this.article.title)) {
        this.$Message.warning("必须 文章标题不能超过30个字符");
        return;
      } else if (this.editor.txt.text() === "") {
        this.$Message.warning("必须 文章内容不能为空");
        return;
      } else {
        this.$http
          .post(
            "/cgi-bin/article_insert.py",
            {
              title: this.article.title,
              content: this.editor.txt.html(),
              releaseTime: this.dateFormat(new Date())
            },
            {
              emulateJSON: true
            }
          )
          .then(resp => {
            // console.log(resp);
            if (resp.data === "success") {
              this.$Message.success("提交成功");
              this.article = {};
              this.editor.txt.html("<p>请输入内容<p>");
            } else {
              this.$Message.error("提交失败");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    dateFormat: function(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
    }
  },
  mounted() {
    this.editor = new wangEditor(document.getElementById("we"));
    this.editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      // "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      // "image", // 插入图片
      "table", // 表格
      // "video", // 插入视频
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.create();
    this.editor.txt.html('<p>请输入文章内容...</p>')
  }
};
</script>

<style lang="less" scoped>
.addArticle-box {
  padding: 6.25em 20%;
}
</style>
