import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Contact from '@/components/contact'
import Login from '@/components/login'
import RearLogin from '@/components/rearLogin'
import RearRegister from '@/components/rearRegister'
import ArticleDetails from '@/components/articleDetails'

import Main from '@/back/main'
import Administration from '@/back/administration'
import ArticleMan from '@/back/article/articleManageMent'
import AddArticle from '@/back/article/addArticle'
import UpdateArticle from '@/back/article/updateArticle'
import UserInfoPage from '@/back/userInfo/userInfoPage'
import BackstageUserInfo from '@/back/backstageUserInfo/backstageUserInfo'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',  // 前台首页
      name: 'home',
      component: Home,
      meta: {
        index: 0,
        showContent: true,
        verifyLogin: true
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
        {
          path: '/articleDetails/:id',    // 前台文章详情页面
          name: 'articleDetails',
          components: {
            mainContent: ArticleDetails
          },
          meta: {
            index: 1,
            showContent: false,
          },
        }
      ]
    },
    {
      path: '/login',   // 前台登录
      name: 'login',
      component: Login
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
        },
        {
          path: '/userInfoPage',    // 前台用户管理页面
          name: 'userInfoPage',
          components: {
            rearMain: UserInfoPage
          }
        },
        {
          path: '/backstageUserInfo',  // 后天用户管理页面
          name: 'backstageUserInfo',
          components: {
            rearMain: BackstageUserInfo
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



router.beforeEach((to, from, next) => {
  // console.log('to----', to)
  // console.log('from------', from)
  // console.log('next---------', next)

  if (to.meta.verifyLogin) {
    if (sessionStorage.getItem('key') === null) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;