<template>
  <div class="updateArticle-box">
    <Form :model="article">
      <FormItem label="标题">
        <Input v-model="article.title" placeholder="请输入文章标题..."></Input>
      </FormItem>
      <FormItem label="内容">
        <br>
        <div id="we" :style="{'background-color':'white'}"></div>
      </FormItem>
      <Form-item :style="{'text-align':'center'}">
        <i-button type="primary" long @click="update">修改</i-button>
        <br>
        <br>
        <i-button type="dashed" long @click="()=>{$router.push('/articleMan')}">取消</i-button>
      </Form-item>
    </Form>
  </div>
</template>

<script>
import wangEditor from "wangeditor";
import { dateFormat } from "../../publicJs/dateFormat.js";

export default {
  name: "upadteArticle",
  data() {
    return {
      getArticle: [],
      editor: null,
      article: {
        title: "",
        content: ""
      },
      id: this.$route.params.id // 文章id
    };
  },
  mounted() {
    this.getUpdateArticleData(this.id);
  },
  methods: {
    update() {
      if (this.article.title === "" && this.editor.txt.text() === "") {
        this.$Message.warning("所有信息不能为空");
        return;
      } else {
        this.$http
          .post("/cgi-bin/article_update.py", {
            title: this.article.title,
            content: this.editor.txt.html(),
            modificationTime: dateFormat(new Date()),
            id: this.id
          },{
              emulateJSON: true
          })
          .then(resp => {
            console.log(resp);
            if (resp.data === "success") {
              this.$Message.success("修改成功");
              this.$router.push({
                name: "articleMan"
              });
            } else {
              this.$Message.warning("修改失败");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    // 页面初始加载时，根据父组件传过来的id，页面显示相应的信息
    getUpdateArticleData(id) {
      this.$http
        .post(
          "/cgi-bin/article_select_all_page.py",
          {
            id: id,
            pageNum: 1
          },
          {
            emulateJSON: true
          }
        )
        .then(resp => {
          console.log(resp);
          this.getArticle = resp.data.data;

          this.article.title = this.getArticle[0].title;
          this.article.content = this.getArticle[0].content;

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
          this.editor.txt.html(this.article.content);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.updateArticle-box {
  padding: 6.25em 20%;
}
</style>