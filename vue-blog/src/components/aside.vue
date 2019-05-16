<template>
  <div class="aside-box">
    <div class="title-box">
      <span>搜索</span>
    </div>
    <div class="tit search-box">
      <AutoComplete
        v-model="searchValue"
        @on-search="handleSearch"
        @on-focus="getInitialValue"
        @on-select="getSelectedValueData"
        placeholder="请输入搜索内容"
        style="width:100%;min-width:150px;"
      >
        <Option v-for="item in searchResult" :value="item" :key="item">{{ item }}</Option>
      </AutoComplete>
    </div>

    <div class="title-box">
      <span>常用链接</span>
    </div>
    <div class="tit">
      <ul>
        <li v-for="(list, index) in UsefulLinks" v-text="list"></li>
      </ul>
    </div>

    <div class="title-box">
      <span>我的标签</span>
    </div>
    <div class="tit">
      <ul>
        <li v-for="(list, index) in MyLabels" v-text="list"></li>
      </ul>
    </div>

    <div class="calendar-box">
      <Calendar></Calendar>
    </div>
  </div>
</template>

<script>
import Calendar from "vue-calendar-component";

export default {
  data() {
    return {
      searchInitialValue: [],
      searchResult: [],
      searchValue: "",
      UsefulLinks: [
        "我的随笔",
        "我的评论",
        "我的参与",
        "最新评论",
        "我的标签",
        "更多连接"
      ],
      MyLabels: ["html", "Css", "JavaScript", "Vue", "Python"]
    };
  },
  methods: {
    // 获取搜索框值的数据
    getSelectedValueData(value) {
      let id = "";
      let title = "";
      let count = 0;

      for (const val of this.searchInitialValue) {
        if (value === val.title) {
          id = val.id;
          title = val.title;
          count = val.readingVolume;
        }
      }

      this.$router.push({
        name: "articleDetails",
        params: {
          id: id,
          count: count,
          title: value
        }
      });
      this.searchValue = "";
    },
    // 搜索框值改变时触发
    handleSearch(value) {
      let v = [];
      this.searchInitialValue.map(val => {
        if (val.title.search(value) != -1) {
          v.push(val.title);
          this.searchResult = v;
        }
      });
    },
    // 搜索框获得焦点是触发
    getInitialValue() {
      this.searchInitialValue = [];
      this.searchResult = [];
      this.$http
        .post(
          "/cgi-bin/article_select_all_page.py",
          {
            pageNum: 1,
            isConvertFormat: true
          },
          {
            emulateJSON: true
          }
        )
        .then(resp => {
          // console.log(resp);
          this.searchInitialValue = resp.data.data;
          for (const res of resp.data.data) {
            this.searchResult.push(res.title);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    Calendar
  }
};
</script>

<style scoped>
.aside-box {
  margin: 4em 1.25em;
}
.calendar-box {
  width: 100%;
  height: 23.75em
}
.title-box {
  width: 100%;
  height: 3.75em;
  border: none;
  line-height: 3.75em;
  text-indent: 1.25em;
  border-radius: 2.1875em;
  margin-bottom: 0.9375em;
  color: rgb(0, 113, 226);
  background-color: rgba(255, 255, 255, 0.7);
  border-left: 0.625em solid #8cc5ff;
}
.title-box span {
  font-size: 1.125em;
  font-weight: 500;
  letter-spacing: 0.3125em;
}
.tit {
  margin: 1.875em;
}
.tit ul {
  padding: 0;
}
.tit ul li {
  list-style-type: none;
  padding: 0.25em 0;
  letter-spacing: 0.125em;
}
</style>