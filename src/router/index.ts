import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Meetings from '../views/Meetings.vue'
import Home from '../views/Home.vue'
import store from '../store/index'

import { AmplifyEventBus } from 'aws-amplify-vue'
import * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

Vue.use(VueRouter)
Vue.use(AmplifyPlugin, AmplifyModules)

let user

function getUser() {
  return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser().then((data: any) => {
    if (data && data.signInUserSession) {
      store.commit('setUser', data)
      return data
    }
  }).catch(() => {
    store.commit('setUser', null)
    return null
  })
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/meetings',
    name: 'meetings',
    component: Meetings,
    meta: { requireAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

AmplifyEventBus.$on('authState', async (state: any) => {
  if (state === 'signedOut'){
    user = null
    store.commit('setUser', null)
    router.push({path: '/signin'})
  } else if (state === 'signedIn') {
    user = await getUser();
    router.push({path: '/'})
  }
})

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    user = await getUser()
    if (!user) {
      return next({
        path: '/signin'
      })
    }
    return next()
  }
  return next()
})

export default router
