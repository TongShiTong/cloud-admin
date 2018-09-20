import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const components = {
  login: () => import('@/views/login/login'),
  layout: () => import('@/views/layout/layout'),
  index: () => import('@/views/index/index'),
  users: () => import('@/views/users/index'),
  uploadDemo: () => import('@/views/testUploadDemo/index'),
  userEdit: () => import('@/views/userEdit/userEdit')
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: components.login
    },
    {
      path: '/layout',
      component: components.layout,
      //重定向到首页
      redirect: '/layout/index',
      meta: {
        title: '首页'
      },
      //嵌套路由
      children: [
        {
          path: 'index',
          component: components.index
        },
        {
          path: 'users',
          meta: {
            title:'用户管理'
          },
          component: components.users
        },
        {
          path: 'uploadDemo',
          meta: {
            title: '上传图片测试页'
          },
          component: components.uploadDemo
        },
        {
          path: 'userEdit',
          meta: {
            title: '修改个人信息',
          },
          component: components.userEdit
        }
      ]
    }
  ]
})
