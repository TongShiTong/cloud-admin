import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const components = {
  login: () => import('@/views/login/login'),
  layout: () => import('@/views/layout/layout'),
  index: () => import('@/views/index/index'),
  users: () => import('@/views/users/index'),
  uploadDemo: () => import('@/views/testUploadDemo/index'),
  userEdit: () => import('@/views/userEdit/userEdit'),
  addUser: () => import('@/views/addUser/index'),
  addSwiperDemo: () => import('@/views/swiper/addSwiperDemo'),
  swiper: () => import('@/views/swiper/index'),
  addBook: () => import('@/views/book/addBook'),
  managementBook: () => import('@/views/book/index')

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
        },
        {
          path: 'addUser',
          meta: {
            title: '添加管理员',
          },
          component: components.addUser
        },
        {
          path: 'swiper',
          name: 'swiper',
          meta: {
            title: '轮播图管理'
          },
          component: components.swiper
        },
        {
          path: 'addSwiperDemo',
          name: 'addSwiperDemo',
          meta: {
            title: '添加轮播图',
          },
          component: components.addSwiperDemo
        },
        {
          path: 'editSwiperDemo',
          name: 'editSwiperDemo',
          meta: {
            title: '编辑轮播图',
          },
          component: components.addSwiperDemo
        },{
          path: 'addBook',
          name: 'addBook',
          meta: {
            title: '添加图书',
          },
          component: components.addBook
        },{
          path: 'managementBook',
          name: 'managementBook',
          meta: {
            title: '图书管理',
          },
          component: components.managementBook
        }
      ]
    }
  ]
})
