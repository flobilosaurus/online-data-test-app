import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: {
        name: 'CucumberRunner'
      }
    },
    {
      path: '/cucumber-runner',
      name: 'CucumberRunner',
      component: () => import('./views/CucumberRunner.vue')
    },
    {
      path: '/test-case-extractor',
      name: 'TestCaseExtractor',
      component: () => import('./views/TestCaseExtractor.vue')
    }
  ]
})
