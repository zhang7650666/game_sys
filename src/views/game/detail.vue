<template>
  <div style="margin: 50px;">
    <h3 style="color: #606266;font-weight:normal;line-height: 60px;">游戏详情</h3>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form  label-width="120px" style="width: 400px;" size="small">
          <el-form-item label="游戏名称：" >
            <span>{{info.name}}</span>
          </el-form-item>
          <el-form-item label="支付订单回调：" >
            <span>{{info.notify_url}}</span>
          </el-form-item>
          <el-form-item label="游戏状态：" >
            <span>{{info.is_active == 1 ? '启用' : '禁用'}}</span>
          </el-form-item>
          <el-form-item >
            <el-button style="width: 60%" type="primary"  @click="handleCancel()">返回游戏列表页</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { detailGame } from '@/api/game.js';
  import { getToken } from '@/utils/auth'
  import Cookies from 'js-cookie'
  export default {
    name: "detailGame",
    data() {
      return {
        info: {},
      }
    },
    created() {
      const rowInfo = JSON.parse(Cookies.get('rowInfo'));
      this.info = rowInfo;
      this.handleDetailGame();
    },
    methods: {
      // 获取游戏详情信息
      handleDetailGame(){
        const rowInfo = JSON.parse(Cookies.get('rowInfo'));
        const params = {
          token: getToken(),
          id: rowInfo.id,
        }
        detailGame(params).then((res) => {
          this.info = res.data;
        });
      },
      // 取消
      handleCancel() {
        this.$router.push({path: '/game'});
      },
    }
  }
</script>

<style scoped>
</style>
