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
      count: this.$route.params.count,
      articleData: [],
      isShow: false
    };
  },
  created() {
    this.setAddCount(this.id, this.count);
    this.getArticleData(1);
  },
  methods: {
    setAddCount(id, count) {
      let con = parseInt(count) + 1;
      this.$http
        .post(
          "/cgi-bin/article_update_readingVolume.py",
          {
            id: id,
            readingVolume: con
          },
          { emulateJSON: true }
        )
        .then(resp => {
          // console.log(resp);
          if (resp.data === "success") {
            return resp.data;
          } else {
            return resp.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
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
          // console.log(resp);
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
  .article-title {
    letter-spacing: 1px;
    font-size: 40px;
    margin: 20px 0;
    color: #17233d;
    text-align: center;
    transition: all 0.5s linear;
    &:hover {
      color: #515a6e;
      text-shadow: 1px 1px #d7e8f9, 2px 2px #d7e8f9, 3px 3px #d7e8f9,
        4px 4px #d7e8f9, 5px 5px #d7e8f9, 6px 6px #d7e8f9;
      transition: all 0.5s linear;
    }
  }
  .article-content {
    color: #515a6e;
    padding: 20px;
  }
  .footer {
    margin: 20px 0;
    text-align: right;
  }
}
</style>