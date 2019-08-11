<template>
  <div style="margin-top: 50px;">
    <el-row>
      <el-col :span="12" :offset="6">
        <h3 style="text-align:center;color: #606266;font-weight:normal;;line-height: 60px;">添加商品</h3>
        <el-form :model="value" :rules="rules" ref="productInfoForm" label-width="120px" style="width: 500px;" size="small">
          <el-form-item label="商品名称：" prop="name">
            <el-input v-model="value.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格：" prop="amount">
            <el-input v-model="value.amount"></el-input>
          </el-form-item>
          <el-form-item label="是否禁用：" prop="is_active">
            <el-radio v-model="value.is_active" label="0">禁用</el-radio>
            <el-radio v-model="value.is_active" label="1">启用</el-radio>
            <!-- <el-select
              v-model="value.is_active"
              @change="handleBrandChange"
              placeholder="请选择品牌">
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option> -->
            <!-- </el-select> -->
          </el-form-item>
          <el-form-item >
            <el-button style="width: 40%" type="primary"  @click="handleCancel()">取消</el-button>
            <el-button style="width: 40%" type="primary"  @click="handleNext('productInfoForm')">提交保存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { addGame } from '@/api/game.js';

  export default {
    name: "addGameList",
    data() {
      return {
        rules: {
          name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 20 个字符', trigger: 'blur'}
          ],
          amount: [{required: true, message: '商品金额不能为空', trigger: 'blur'}],
        },
        value:{
          name: '小虎',
          amount: 10,
          is_active: '1',
        },
      };
    },
    methods: {
     // 提交保存
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = JSON.parse(JSON.stringify(this.value));
            // console.log(params);
            this.handleAddGoods(params);
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
      // 添加商品
      handleAddGoods(params) {
        addGame(params).then(res => {
          console.log(res);
          if(res.code == 200){
            this.$router.push({path: '/home'});
          }
        });
      },

      // 取消
      handleCancel() {
        this.$router.push({path: '/home'});
      },
    }
  }
</script>

<style scoped>
</style>
