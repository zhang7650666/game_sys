<template>
  <div style="margin: 50px;">
    <h3 style="color: #606266;font-weight:normal;line-height: 30px;margin-bottom:50px;">添加商品</h3>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form :model="value" :rules="rules" ref="goodsForm" label-width="120px" style="width: 400px;" size="small">
          <el-form-item label="商品名称：" prop="name" >
            <el-input v-model="value.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格：" prop="amount">
            <el-input v-model="value.amount"></el-input>
          </el-form-item>
          <el-form-item label="是否禁用：" prop="is_active">
            <el-radio v-model="value.is_active" :label="0">禁用</el-radio>
            <el-radio v-model="value.is_active" :label="1">启用</el-radio>
          </el-form-item>
          <el-form-item >
            <el-button style="width: 40%"   @click="handleCancel()">取消</el-button>
            <el-button style="width: 40%" type="primary"  @click="handleNext('goodsForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { addGoods } from '@/api/goods.js';
  import { getToken } from '@/utils/auth'
  import Cookies from 'js-cookie'
  export default {
    name: "addGoods",
    data() {
      var validAmount=(rule,value,callback)=>{
        var reg = /^\d{1,20}$/
        if (!value) {
          callback(new Error('商品金额不能为空'));
        } else if (!reg.test(parseInt(value))) {
          callback(new Error('商品金额由1-20个数字组成'));
        } else if (value < 100) {
          callback(new Error('商品金额不能小于100'));
        } else {
          callback()
        }
      };
      return {
        rules: {
          name: [
            {required: true, message: '请输入游戏名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个数字或字符', trigger: 'blur'}
          ],
          amount: [{validator: validAmount,trigger: 'blur'}],
        },
        value:{
          name: '王者农药',
          amount: 1000,
          is_active: 1,
          game_id: null,
        },
      };
    },
    methods: {
     // 提交保存
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.$route.query.game_id) {
              this.value.game_id = this.$route.query.game_id;
            }
            this.handleAddGoods(this.value);
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      // 添加游戏
      handleAddGoods(params) {
        addGoods(params).then(res => {
          console.log(res);
          if(res.code == 200){
            window.history.go(-1);
          }
        });
      },

      // 取消
      handleCancel() {
        window.history.go(-1);
        // this.$router.push({path: '/goods'});
      },

    }
  }
</script>

<style scoped>

</style>
