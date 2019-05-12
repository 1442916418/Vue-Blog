<template>
  <div class="article-details-box" v-show="isShow">
    <h1 class="article-title" v-html="articleData.title"></h1>
    <div class="article-content" v-html="articleData.content"></div>
    <div class="footer">
      <span v-html="articleData.releaseTime"></span>
      <span>
        阅读(
        <span v-html="articleData.readingVolume"></span>)
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      articleData: [],
      isShow: false
    };
  },
  created() {
    this.getArticleData(1);
  },
  methods: {
    getArticleData(pageNum) {
      this.$http
        .post(
          "/cgi-bin/article_select_all_page.py",
          {
            id: this.id,
            pageNum: pageNum
          },
          {
            emulateJSON: true
          }
        )
        .then(resp => {
          console.log(resp);
          if (resp.data === "error") {
            this.$Message.waring("获取文章失败");
            this.$router.push("/");
          } else {
            this.articleData = resp.data.data[0];
            this.isShow = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.article-details-box {
  padding: 20px;
  .article-title {
    margin: 20px 0;
    color: #17233d;
    text-align: center;
  }
  .article-content {
    color: #515a6e;
  }
  .footer {
    margin: 20px 0;
    text-align: right;
  }
}
</style>