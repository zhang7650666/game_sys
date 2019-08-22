<template>
  <div class="logo-wrapper">
    <div class="logo-wp">
      <span class="avatar"></span>
      <span class="com-logo">INGame</span>
    </div>
    <p class="reg-title">登录</p>
    <el-card class="login-form-layout">
      <div>
        <el-form autoComplete="on"
                :model="loginForm"
                :rules="loginRules"
                ref="loginForm"
                label-position="left"
                class="clear-margin"
                >
          <el-form-item prop="username">
            <i class="el-icon-user-solid pos-icon"></i>
            <el-input name="username"
                      type="text"
                      v-model="loginForm.username"
                      autoComplete="on"
                      placeholder="请输入手机号">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <i class="el-icon-lock pos-icon"></i>
            <el-input name="password"
                      :type="pwdType"
                      @keyup.enter.native="handleLogin"
                      v-model="loginForm.password"
                      autoComplete="on"
                      placeholder="请输入密码">
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
      class="dialog"
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
            }).catch(err => {
              console.log(err);
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

.logo-wrapper .el-card__body {
    padding: 30px;
  }
.logo-wrapper .clear-margin .el-form-item__content{
    margin-left: 30px !important;
  }
</style>

<style>
html, body, #app{
    width: 100%;
    height: 100%;
  }
  .logo-wrapper{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: #ccc;
    /* z-index: 3000; */
  }
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 360px;
    margin: 10px auto;
    background:#fff;
    /* border-top: 10px solrgb(33, 49, 65)EFF; */
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
    margin-top: 50px;
  }
  .logo-wp{
    display:flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    margin-top: 50px;
  }
  .logo-wp .avatar{
    width:64px;
    height:64px;
    background:url('../../assets/images/logo1.png') no-repeat;
    background-size: 64px 64px;
    border-radius:32px 32px;
    display:inline-block;
  }
  .com-logo{
    margin-left: 20px;
  }
  .reg-title{
    text-align: center;
  }
   .pos-icon{
    position: absolute;
    left: -30px;
    top: 5px;
    font-size: 24px;
    z-index: 1000 !important;
  }
</style>
