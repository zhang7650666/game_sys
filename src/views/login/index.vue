<template>
  <div>
    <el-card class="login-form-layout">
      <div style="width: 80%;margin:0 auto">
        <el-form autoComplete="on"
                :model="loginForm"
                :rules="loginRules"
                ref="loginForm"
                label-position="left"
                >
          <div style="text-align: center">
            <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
          </div>
          <h2 class="login-title color-main">INGame</h2>
          <el-form-item prop="username">
            <el-input name="username"
                      type="text"
                      v-model="loginForm.username"
                      autoComplete="on"
                      placeholder="请输入手机号">
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password"
                      :type="pwdType"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.password"
                      autoComplete="on"
                      placeholder="请输入密码">
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
              <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
            </el-input>
          </el-form-item>
          <el-form-item style="text-align:right;color:#1989fa;cursor:pointer">
            <span  @click="centerDialogVisible = true">忘记密码</span>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <div style="border-bottom: 1px solid #DCDFE6;"></div>
        <div style="text-align:center;padding-top:10px;">
          <span class="text1" style="font-size: 14px;color:#606266">第一次使用INGame平台？</span>
          <span @click="handleRegister" style="font-size: 14px;color:#1989fa;cursor:pointer">立即注册</span>
        </div>
      </div>
    </el-card>
    <!-- 忘记密码提示框 -->
    <el-dialog
      title="联系客服"
      :visible.sync="centerDialogVisible"
      width="20%"
      left>
      <span>客服-小娜 QQ:2321321311</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <img :src="login_center_bg" class="login-center-layout"> -->
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import {isValidatTel} from '@/utils/validate';
  import login_center_bg from '@/assets/images/login_center_bg.png'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isValidatTel(value)) {
          return callback(new Error('请输入正确的用户名'));
        } else if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        callback()
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 6 || value.length >= 20) {
          callback(new Error('密码必须在6-20个字符之间'));
        } else{
          callback()
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password',
        login_center_bg,
        dialogVisible:false,
        centerDialogVisible: false, // 弹框提示
      }
    },
    methods: {
      ...mapActions({
        actionLogin: 'Login' // 将 `this.actionLogin()` 映射为 `this.$store.dispatch('increment')`
      }),
      // 查看密码
      showPwd() {
        this.dialogConfirm()
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      // 登录
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            const tempObj = JSON.parse(JSON.stringify(this.loginForm));
            const str = `/?phone=${tempObj.username}&pwd=${tempObj.password}`;
            this.actionLogin(str).then((res) => {
              this.$router.push({path: '/game'})
            });
            
            // window.location.href=SupportUrl;
            // let isSupport = getSupport();
            // if(isSupport===undefined||isSupport==null){
            //   this.dialogVisible =true;
            //   return;
            // }
            // this.loading = true;
            // this.$store.dispatch('Login', this.loginForm).then(() => {
            //   this.loading = false;
            //   this.$router.push({path: '/'})
            // }).catch(() => {
            //   this.loading = false
            // })
          } else {
            console.log('参数验证不合法！');
            return false
          }
        })
      },
      // 注册
      handleRegister() {
        this.$router.push({path: '/register'})
      },
      dialogConfirm(){
        this.dialogVisible =false;
        setSupport(true);
        window.location.href=SupportUrl;
      },
      dialogCancel(){
        this.dialogVisible = false;
        setSupport(false);
      }
    }
  }
</script>
<style>
.el-dialog__body {
  padding: 10px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
.el-dialog__title {
    line-height: 24px;
    font-size: 14px;
    color: #303133;
}
</style>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 140px auto;
    border-top: 10px solid #409EFF;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
</style>
