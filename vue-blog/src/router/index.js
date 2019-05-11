import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Contact from '@/components/contact'

import Administration from '@/back/administration'
import Main from '@/back/main'
import ArticleMan from '@/back/article/articleManageMent'
import AddArticle from '@/back/article/addArticle'
import UpdateArticle from '@/back/article/updateArticle'

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
      },
      children: [
        {
          path: '/main',  // 后台首页main部分
          name: 'main',
          components: {
            rearMain: Main
          }
        },
        {
          path: '/articleMan',  // 后台文章管理页面
          name: 'articleMan',
          components: {
            rearMain: ArticleMan
          }
        },
        {
          path: '/addArticle',   // 后台新增文章页面
          name: 'addArticle',
          components: {
            rearMain: AddArticle
          }
        },
        {
          path: '/updateArticle/:id',   // 后天修改文章页面
          name: 'updataArticle',
          components: {
            rearMain: UpdateArticle
          }
        }
      ]
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
