<template>
  <div class="articleList-box">
    <div class="list-item" v-for="(list, index) in list" :key="index">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.$http
        .get("http://127.0.0.1:1111/cgi-bin/article_all.py")
        .then(resp => {
          // console.log(resp);
          this.list = resp.data
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
  padding: 15px;
  border: none;
  border-bottom: 1px dashed #ccc;
  color: black;
  transition: all 0.3s linear;
}
.list-item:hover {
  /* margin: -10px; */
  padding: 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  transition: all 0.3s linear;
}
.list-item p:first-of-type {
  padding: 10px;
  text-align: left;
  font-weight: 600;
  color: #17233d;
}
.list-item p:nth-of-type(2) {
  padding: 10px;
  color: #515a6e;
}
.list-item p:last-of-type {
  padding: 10px;
  text-align: right;
}
</style>
