<template>
  <div class="aside-box">
    <div class="title-box">
      <span>搜索</span>
    </div>
    <div class="tit search-box">
      <el-input placeholder="请输入内容" v-model="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
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
      search: "",
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
  components: {
    Calendar
  }
};
</script>

<style scoped>
.aside-box {
  margin: 20px;
}
.calendar-box {
  width: 100%;
  height: 380px;
}
.title-box {
  width: 100%;
  height: 60px;
  border: none;
  line-height: 60px;
  text-indent: 20px;
  border-radius: 35px;
  margin-bottom: 15px;
  color: rgb(0, 113, 226);
  background-color: rgba(255, 255, 255, 0.7);
  border-left: 10px solid #8cc5ff;
}
.title-box span {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 5px;
}
.tit {
  margin: 30px;
}
.tit ul {
  padding: 0;
}
.tit ul li {
  list-style-type: none;
  padding: 4px 0;
  letter-spacing: 2px;
}
</style>
