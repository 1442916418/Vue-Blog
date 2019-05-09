import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Contact from '@/components/contact'

import Administration from '@/back/administration'
import InformalEssay from '@/back/informalEssay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        index: 0,
        showContent: true,
      },
      children: [
        {
          path: '/contact',
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
      path: '/administration',
      name: 'administration',
      components: {
        adminContent: Administration
      }
    },
  ]
})
