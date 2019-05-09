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
      children: [
        {
          path: '/contact',
          name: 'contact',
          components: {
            mainContent: Contact
          }
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
