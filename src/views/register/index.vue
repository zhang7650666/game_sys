<template>
  <div class="reg-wp">
    <div class="logo-wp">
      <span class="avatar"></span>
      <span class="com-logo">INGame</span>
    </div>
    <p class="reg-title">注册</p>
    <el-card class="login-form-layout">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm clear-margin">
        <el-form-item prop="name">
          <i class="el-icon-user-solid pos-icon"></i>
          <el-input v-model="ruleForm.name" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item label="" prop="tel">
          <i class="el-icon-mobile-phone pos-icon"></i>
          <el-input v-model="ruleForm.tel" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="" prop="pass">
          <i class="el-icon-lock pos-icon"></i>
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="输入密码"></el-input>
        </el-form-item>
        <el-form-item label="" prop="checkPass">
          <i class="el-icon-lock pos-icon"></i>
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button style="width: 100%" type="primary"  @click="submitForm('ruleForm')">提交</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
        <div style="border-bottom: 1px solid #DCDFE6;"></div>
        <div style="text-align:center;padding-top:10px;">
          <span class="text1" style="font-size: 14px;color:#606266">已有账号？</span>
          <span @click="handleLogin" style="font-size: 14px;color:#1989fa;cursor:pointer">立即登录</span>
        </div>
      </el-form>
    </el-card>
    <!-- <img :src="login_center_bg" class="login-center-layout"> -->
  </div>
</template>

<script>
import {adduser} from '@/api/login';

 export default {
    name: 'register',
    data() {
      var checkName = (rule, value, callback) => {
        var reg = /^.{2,21}$/;
        if (!value) {
          return callback(new Error('公司名称不能为空'));
        } else if (!reg.test(value)) {
          return callback(new Error('公司名必须由2-20任意字符组成'));
        }
        callback();
        
      };
      var checkTel = (rule, value, callback) => {
        var reg = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else if (!reg.test(value)) {
          return callback(new Error('手机号格式错误'));
        }
        callback();
        
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length < 6 || value.length >= 20) {
          callback(new Error('密码必须在6-20个字符之间'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: '',
          name: '',
          tel: '',
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { validator: checkName, trigger: 'blur' }
          ],
          tel: [
            { validator: checkTel, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 登录校验
      submitForm(formName) {
        const _self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = JSON.parse(JSON.stringify(this.ruleForm));
            const query = {
              business_name: params.name,
              phone: params.tel,
              pwd: params.pass,
              re_pwd: params.checkPass,
            }
            this.handleAdduser(query);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 注册接口校验
      handleAdduser(params) {
        adduser(params).then(res => {
          if(res.code == 200){
            this.$router.push({path: '/login'});
          }
        }).catch(err => {
          console.log(err);
        });
      },
      // 登录
      handleLogin() {
        this.$router.push({path: '/login'});
      },
      // 重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style >
  .reg-wp .el-card__body {
    padding: 30px;
  }
  .clear-margin .el-form-item__content{
    margin-left: 30px !important;
  }
</style>

<style scoped>
  html, body, #app{
    width: 100%;
    height: 100%;
  }
  .reg-wp{
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: #ccc;
    z-index: 100;
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
