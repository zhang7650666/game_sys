<template>
  <div style="margin: 50px;">
    <h3 style="color: #606266;font-weight:normal;line-height: 30px;margin-bottom:50px;">编辑商品</h3>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form :model="value" :rules="rules" ref="gameForm" label-width="120px" style="width: 400px;" size="small">
          <el-form-item label="商品名称：" prop="name" ref="clearValidName">
            <el-input v-model="value.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="商品价格：" prop="amount">
            <el-input v-model="value.amount"></el-input>
          </el-form-item>
          <!-- <el-form-item label="是否禁用：" prop="is_active">
            <el-radio v-model="value.is_active" label="0">禁用</el-radio>
            <el-radio v-model="value.is_active" label="1">启用</el-radio>
          </el-form-item> -->
          <el-form-item >
            <el-button style="width: 40%"   @click="handleCancel()">取消</el-button>
            <el-button style="width: 40%" type="primary"  @click="handleNext('gameForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { editGoods } from '@/api/goods.js';
  import Cookies from 'js-cookie'
  export default {
    name: "editGoods",
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
          amount: 10,
          is_active: '1',
          game_id: null,
          id: null,
        },
      };
    },
    created() {
      if (this.$route.query.game_id) {
        const rowInfo = JSON.parse(this.$route.query.rowInfo);
        this.value.name = rowInfo.name;
        this.value.amount = rowInfo.amount;
        this.value.is_active = rowInfo.is_active;
        this.value.id = rowInfo.id;
      }
    },
    methods: {
     // 提交保存
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.$route.query.game_id) {
              const rowInfo = JSON.parse(this.$route.query.rowInfo);
              this.value.game_id = this.$route.query.game_id;
              this.value.id = rowInfo.id;
              console.log(rowInfo);
            }
            editGoods(this.value).then(res => {
              console.log(res);
              if(res.code == 200){
                window.history.go(-1);
              }
            });
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

      // 取消
      handleCancel() {
        window.history.go(-1);
      },

    }
  }
</script>

<style scoped>

</style>
