<template>
  <el-menu class="navbar" mode="horizontal">
    <el-row>
      <el-col :span="6">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
        <breadcrumb></breadcrumb>
      </el-col>
      <el-col  :span="18" style="text-align:right;padding-right: 30px;cursor:pointer">
        <div class="us" v-if="!isHaveToken">
          <span @click="handleLogin">登录</span>
          <span @click="handleRegister">注册</span>
        </div>
        <el-dropdown class="avatar-container" trigger="click" v-if="isHaveToken">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatar">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link class="inlineBlock" to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="margin-right:60px;color: #97a8be;font-size:14px">{{company}}</span>
      </el-col>
    </el-row>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      isHaveToken: false,
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'company'
    ]),
  },
  mounted() {
    this.handleToken();
  },
  methods: {
    // 登录跳转
    handleLogin() {
      this.$router.push({path: '/login'})
    },

    // 注册跳转
    handleRegister() {
      this.$router.push({path: '/register'})
    },
  
    // 获取token
    handleToken() {
      if (getToken()) {
        this.isHaveToken = true;
      } else {
        this.isHaveToken = false;
      }
    },
    // 菜单收起隐藏
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    // 登出
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push({path: '/login'})
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

