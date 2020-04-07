import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/gluttonousSnake',
      name: 'gluttonousSnake',
      component: () => import('./views/games/gluttonousSnake.vue')
    },
    {
      path: '/magnifying',
      name: 'magnifying',
      component: () => import('./views/demos/magnifying.vue')
    }
  ]
})
