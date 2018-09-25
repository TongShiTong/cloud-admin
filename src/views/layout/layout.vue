<template>
  <div class="layout">
    <div class="header ml-200">
      <h1 class="title">
        云书后台操作系统
      </h1>
    </div>
    <div class="nav">
      <el-menu
        :router= "true"
        background-color="#545c64"
        text-color="#fff"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <!--<el-submenu index="1">-->
            <!--<template slot="title">用户管理</template>-->
            <!--<el-menu-item-group>-->
            <el-menu-item index="/login">登录</el-menu-item>
            <el-menu-item index="/layout/index">首页</el-menu-item>
            <el-menu-item index="/layout/userEdit">修改个人信息</el-menu-item>
            <el-menu-item index="/layout/addUser">添加管理员</el-menu-item>
            <el-menu-item index="/layout/users">用户管理页</el-menu-item>
            <el-menu-item index="/layout/uploadDemo">上传图片测试页</el-menu-item>
            <el-menu-item index="/layout/swiper">轮播图管理</el-menu-item>
            <el-menu-item index="/layout/addSwiperDemo">添加轮播图</el-menu-item>
            <el-menu-item index="/layout/managementBook">图书管理</el-menu-item>
            <el-menu-item index="/layout/addBook">添加图书</el-menu-item>
          <!--</el-menu-item-group>-->
          </el-submenu>
        <!--</el-submenu>-->
      </el-menu>
    </div>
    <div class="main-content ml-200">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default {
        name: "layout"
    }
</script>

<style scoped lang="scss">
  .layout {
    .title {
      text-align: center;
      height: 60px;
      line-height: 60px;
      font-weight: 400;
      font-size: 20px;
      border-bottom: 1px solid #f1f1f1;
    }

    .ml-200 {
      margin-left: 200px;
    }

    .nav {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      padding-top: 80px;
      width: 200px;
      border: 2px solid #f1f1f1;
      overflow: hidden;
      background: #545c64;
    }

    /*深度选择器，去掉参差不齐的边*/
    /deep/ {
      .el-menu {
        border-right: none;
      }
    }

    .main-content {
      padding: 15px;
    }
  }
</style>
