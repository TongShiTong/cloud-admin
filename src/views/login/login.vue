<template>
  <div class="container">
    <h1 class="title">欢迎来到云书后台管理系统</h1>
    <!--<h1 id="h1" ref="title">标题</h1>-->
    <!--登录页面表单-->
    <div class="login-box">
      <h2 class="login-box-title">请登录</h2>
      <el-form class="form" ref="form" :rules="rule" :model="formData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" placeholder="请输入密码"
          @keyup.enter.native="validateLogin"></el-input>
          <!--上面绑定回车登录-->
        </el-form-item>
      </el-form>
      <el-button @click="validateLogin" type="primary" class="login-btn" :loading="isLoading">登录</el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "login",
        data () {
          const validateUsername = (rule, value, callback) => {
            if (!value) {
              callback (new Error('请输入合法用户名'))
            }else {
              callback()
            }
          }

          const validatePassword = (rule, value, callback) => {
            if (value&&value.length>=5) {
              callback()
            } else {
              callback (new Error ('请输入合法的密码且密码不少于5位'))
            }
          }
          return {
            formData: {
              username: '',
              password: ''
            },
            rule: {
              username: [{validator: validateUsername, trigger: 'blur'}],
              password: [{validator: validatePassword, trigger: 'blur'}]
            },
            isLoading: false
          }
        },
    //  事件处理函数
        methods: {
        //  登录方法
          handleLogin() {
            this.isLoading = true
            this.$axios.post('/login', this.formData).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.$store.commit('CHANGE_USERINFO', res.data)
                this.$message.success ( '登陆成功' )
                //登录时延迟一秒钟,跳到首页
                setTimeout(() => {
                  this.$router.push('/layout/index')
                },1000)
              } else {
                this.$message.error (res.msg)
              }
              this.isLoading = false
            }).catch(err => {
              this.isLoading = false
            })
          },
          validateLogin () {
            this.$refs['form'].validate((valid) => {
              if (valid) {
                this.handleLogin()
              }else {
                return false;
              }
            })
          }
        },
      //   created () {//vue实例准备好的时候， new Vue()已经成功了
      //     this.$nextTick(() => {
      //       let h1 = this.$refs.title
      //       console.log(h1)
      //     })
      //     let template = {
      //       template: '<h1>我是组件内容</h1>'
      //     }
      // },
      //   mounted () {
      //     let h1 = this.$refs.title
      //     console.log(h1)
      //   }
    }
</script>

<style scoped lang="scss">
.container {
  overflow: hidden;
  height: 100vh;
  background: #545c64;

  .title {
    margin-top: 80px;
    text-align: center;
    color: #fff;
    font-weight: 400;
  }

  .login-box {
    width: 400px;
    height: 300px;
    border: 1px solid #f1f1f1;
    border-radius: 6px;
    padding: 40px;
    margin: 20px auto 0;
    background: #fff;

    .login-box-title {
      color: #333;
      font-weight: 400;
      text-align: center;
    }

    .form {
      margin-top: 20px;
    }

    .login-btn {
      width: 100%;
      box-sizing: border-box;
    }
  }
}

</style>
