import Vue from 'vue'
import Router from 'vue-router'
import {scrollBehavior} from '~/utils'

Vue.use(Router)

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m)

const routes = [
  {path: '/', name: 'home', component: page('index.vue')},
  {path: '/login', name: 'login', component: page('auth/login.vue')},

  {path: '/groups', name: 'groups', component: page('groups/index.vue')},
  {path: '/groups/:id/:name?', name: 'groups.single', component: page('groups/single.vue')},
  {path: '/project/:id/:name?', name: 'projects.single', component: page('projects/single.vue')},

  {path: '/users', name: 'users', component: page('users/index.vue')},

  {path: '/docs', name: 'docs', component: page('docs.vue')},

];


export function createRouter() {
  return new Router({
    routes,
    scrollBehavior,
    mode: 'history'
  })
}
