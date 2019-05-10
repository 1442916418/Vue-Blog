import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$axios = axios

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import './assets/mouse'

import 'normalize.css'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView);

import  VueResource  from 'vue-resource'
Vue.prototype.$http = VueResource
Vue.use(VueResource) 

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
