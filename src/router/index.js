import Vue from 'vue'
import VueRouter from 'vue-router'

import axios from 'axios'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE,
  scrollBehavior: () => ({y: 0}),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/login') {
    let token = sessionStorage.getItem('Authorization')
    if (token) {
      axios.get('/api-system/state', {headers: {'Authorization': token}}).then((response) => {
        console.log(response)
        if (response.data) {
          next()
        } else {
          next('/login')
        }
      }).catch((e) => {
        console.log(e)
        next('/login')
      })
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
