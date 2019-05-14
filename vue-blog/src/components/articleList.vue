<template>
  <div class="articleList-box">
    <div
      class="list-item"
      v-for="(list, index) in list"
      :key="index"
      @click="detailsPage(list.id, list.readingVolume)"
    >
      <p>
        <span v-html="list.title"></span>
      </p>
      <p v-text="list.content"></p>
      <p>
        <span v-html="list.releaseTime"></span>
        <span>
          阅读(
          <span v-html="list.readingVolume"></span>)
        </span>
      </p>
    </div>

    <div class="list-item-page">
      <Page
        :total="listPage.countTotal"
        :page-size="listPage.pageSize"
        @on-change="tabData"
        show-elevator
        show-total
        v-show="listPage.length != 0"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      listPage: []
    };
  },
  mounted() {
    this.getArticle(1);
  },
  methods: {
    // 点击跳转详情页面
    detailsPage(id, count) {
      this.$router.push({
        name: "articleDetails",
        params: {
          id: id,
          count: count
        }
      });
    },
    // 分页
    tabData(e) {
      this.getArticle(e);
    },
    // 初始化获取数据
    getArticle(pageNum) {
      this.$http
        .post(
          "http://127.0.0.1:1111/cgi-bin/article_select_all_page.py",
          {
            pageNum: pageNum,
            isConvertFormat: true
          },
          {
            emulateJSON: true
          }
        )
        .then(resp => {
          // console.log(resp);
          if (resp.data === "error") {
            this.$Message.warning("暂无数据");
          } else {
            this.listPage = resp.data;
            this.list = resp.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.list-item {
  padding: 0.9375em;
  border: none;
  border-bottom: 1px dashed #ccc;
  cursor: pointer;
  transition: all 0.3s linear;
}
.list-item:hover {
  /* margin: -10px; */
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.3125em;
  transition: all 0.3s linear;
}
.list-item p:first-of-type {
  padding: 0.625em;
  text-align: left;
  font-weight: 600;
  color: #17233d;
  font-size: 1.25em;
}
.list-item p:nth-of-type(2) {
  margin: 0.625em;
  color: #515a6e;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.list-item p:last-of-type {
  padding: 0.625em;
  text-align: right;
}
.list-item-page {
  padding: 1.25em;
  text-align: right;
}
</style>
