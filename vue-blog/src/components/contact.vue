<template>
  <div class="contact-box">
    <p>
      <img src="../assets/github.jpg" alt="logo">
    </p>
    <p>穷在闹市无人问，富在深山有远亲</p>
    <ol>
      <li>我叫余水生</li>
      <li>一名工程师实习生</li>
      <li>19884189676</li>
    </ol>
    <div class="content">
      <div @click="change">技术栈</div>
      <transition name="con">
        <ol v-show="!show">
          <li>熟悉 Html、Css、JavaScript</li>
          <li>熟悉 BootStarp、jQuery</li>
          <li>熟悉 Vue 框架</li>
          <li>熟悉 ElementUI 组件和 iView 组件</li>
          <li>了解 Angular2 框架和 React 框架</li>
          <li>了解 Python</li>
        </ol>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  methods: {
    change() {
      this.show = !this.show;
    }
  }
};
</script>

<style scoped>
.con-enter {
  opacity: 0;
}
.con-enter-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.con-enter-to {
  opacity: 1;
}
.con-leave {
  opacity: 1;
}
.con-leave-active {
  transition: all 1.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.con-leave-to {
  opacity: 0;
}

.contact-box {
  margin: 6.25em 15% 6.25em 10%;
}
.contact-box p {
  margin: 0;
  padding: 0;
}
.contact-box p:first-child {
  text-align: center;
}
.contact-box p:first-child img {
  width: 9.375em;
  height: 9.375em;
  border-radius: 50%;
  transition: box-shadow 1.5s, -webkit-box-shadow 1.2s;
}
.contact-box p:first-child img:hover {
  -webkit-box-shadow: 0 0 0.625em 0.1875em rgba(0, 191, 255, 0.7);
  box-shadow: 0 0 0.625em 0.1875em rgba(0, 191, 255, 0.7);
  -webkit-transition: -webkit-box-shadow 1.5s;
  transition: -webkit-box-shadow 1.5s;
  transition: box-shadow 1.5s;
  transition: box-shadow 1.5s, -webkit-box-shadow 1.2s;
}
.contact-box p:nth-of-type(2) {
  font-size: 1.25em;
  font-weight: 600;
  text-align: center;
  padding: 0.625em;
  border-bottom: 1px solid #ddd;
}
.contact-box ol {
  width: 100%;
  margin: 0;
  padding: 0;
}
.contact-box ol li {
  list-style-type: none;
  padding: 0.625em 0;
  text-align: center;
}
.content {
  margin: 0.625em 0;
}
.content div:first-child {
  width: 100%;
  height: 3.75em;
  border: none;
  line-height: 3.75em;
  text-indent: 0.625em;
  border-radius: 2.1875em;
  margin-bottom: 0.9375em;
  color: rgb(0, 98, 255);
  background-color: rgba(255, 255, 255, 0.7);
  border-left: 0.625em solid #8cc5ff;
  border-right: 0.625em solid #8cc5ff;
  text-align: center;
  font-weight: 600;
  letter-spacing: 0.3125em;
  cursor: pointer;
}
.content ol {
  width: 100%;
  margin: 0;
  padding: 0;
}
.content ol li {
  list-style-type: none;
  text-align: left;
  padding: 0.625em;
  margin: 0 30%;
  font-family: 600;
}
</style>
