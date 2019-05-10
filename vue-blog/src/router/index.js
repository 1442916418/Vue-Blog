import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Contact from '@/components/contact'

import Administration from '@/back/administration'
import InformalEssay from '@/back/informalEssay'

import RearLogin from '@/components/rearLogin'
import RearRegister from '@/components/rearRegister'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',  // 前台首页
      name: 'home',
      component: Home,
      meta: {
        index: 0,
        showContent: true,
      },
      children: [
        {
          path: '/contact', // 前台联系页面
          name: 'contact',
          components: {
            mainContent: Contact
          },
          meta: {
            index: 1,
            showContent: false,
          },
        },
      ]
    },
    {
      path: '/administration',  // 后台管理首页
      name: 'administration',
      components: {
        adminContent: Administration
      }
    },
    {
      path: '/rearLogin',   // 后台登录页面
      name: 'rearLogin',
      components: {
        adminContent: RearLogin
      }
    },
    {
      path: '/rearRegister',  // 后台注册页面
      name: 'rearRegister',
      components: {
        adminContent: RearRegister
      }
    }
  ]
})
