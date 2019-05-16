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
      title: this.$route.params.title ? this.$route.params : "",
      articleData: [],
      isShow: false
    };
  },
  watch: {
    $route: {
      handler: function(to, from) {
        if (to.path != from.path) {
          if (sessionStorage.getItem("count") === null) {
            this.setAddCount(to.params.id, to.params.count);
          }
          this.getArticleData(1, to.params.id, to.params.title);
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    let count = this.$route.params.count;

    if (sessionStorage.getItem("count") === null) {
      this.setAddCount(this.id, count);
    } else {
      this.setAddCount(this.id, sessionStorage.getItem("count"));
    }
    this.getArticleData(1, this.id, this.title);
  },
  methods: {
    setAddCount(id, count) {
      let con = parseInt(count) + 1;
      sessionStorage.setItem("count", con);
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
    getArticleData(pageNum, id, title) {
      this.$http
        .post(
          "/cgi-bin/article_select_all_page.py",
          {
            id: id,
            pageNum: pageNum,
            title: title
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

<style lang="less">
.parent-transition {
  transition: all 0.4s linear;
}
.transition {
  text-shadow: 5px 5px 2px #b7b7b7;
  transition: all 0.4s linear;
}
.article-details-box {
  .article-title {
    letter-spacing: 1px;
    font-size: 2.5em;
    margin: 1.25em 0;
    color: #17233d;
    text-align: center;
    .parent-transition;
    &:hover {
      color: #515a6e;
      .transition;
    }
  }
  .article-content {
    font-size: 14px;
    color: #515a6e;
    padding: 1.25em;
    code {
      color: #476582;
      margin: 0;
      background-color: rgba(27, 31, 35, 0.04);
      border-radius: 0.1875em;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 1.25em 0;
      color: #17233d;
      border-bottom: 1px solid #dcdee2;
      .parent-transition;
      &:hover {
        color: #001a52;
        .transition;
      }
    }
    pre {
      overflow-x: auto;
      margin: 0.625em 0;
      padding: 1.25em;
      border: none;
      border-radius: 0.3125em;
      background: rgba(248, 248, 248, 0.4);
    }
    table {
      margin: 1.25em 0;
      border-collapse: collapse;
    }

    table,
    th,
    td {
      border: 0.0625em solid #aaa;
      text-align: center;
      padding: 0.625em;
    }
  }
  .footer {
    margin: 1.25em 0;
    text-align: right;
  }
}
</style>