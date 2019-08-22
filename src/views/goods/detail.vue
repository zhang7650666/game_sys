<template>
  <div style="margin: 50px;">
    <h3 style="color: #606266;font-weight:normal;line-height: 30px;margin-bottom:50px;">商品详情</h3>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form  label-width="120px" style="width: 400px;" size="small">
          <el-form-item label="商品名称：" >
            <span>{{info.name}}</span>
          </el-form-item>
          <el-form-item label="商品金额：" >
            <span>{{info.amount}}</span>
          </el-form-item>
          <el-form-item label="商品状态：" >
            <span>{{info.is_active == 1 ? '启用' : '禁用'}}</span>
          </el-form-item>
          <el-form-item >
            <el-button style="width: 60%" type="primary"  @click="handleCancel()">返回商品列表页</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { detailGoods } from '@/api/goods.js';
  import { getToken } from '@/utils/auth'
  import Cookies from 'js-cookie'
  export default {
    name: "detailGame",
    data() {
      return {
        info: {},
        value: {
          id: null,
          game_id: null,
        }
      }
    },
    created() {
      this.handleDetailGame();
    },
    methods: {
      // 获取游戏详情信息
      handleDetailGame(){
        let rowInfo = '';
        if (this.$route.query.game_id) {
          this.value.game_id = this.$route.query.game_id;
          this.value.id = this.$route.query.id;
        }
        const params = {
          token: getToken(),
          id: this.value.id || null,
          game_id: this.value.game_id || null
        }
        detailGoods(params).then((res) => {
          this.info = res.data;
        }).catch(err => {
          console.log(err);
        });
      },
      // 取消
      handleCancel() {
        window.history.go(-1);
      },
    }
  }
</script>

<style scoped>
</style>
