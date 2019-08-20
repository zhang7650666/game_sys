<template>
  <div style="margin: 50px;">
    <h3 style="color: #606266;font-weight:normal;line-height: 30px;margin-bottom:50px;">添加游戏</h3>
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form :model="value" :rules="rules" ref="gameForm" label-width="120px" style="width: 400px;" size="small">
          <el-form-item label="游戏名称：" prop="name" ref="clearValidName">
            <el-input v-model="value.name" placeholder="请输入游戏名称"></el-input>
          </el-form-item>
          <el-form-item label="支付订单回调：" prop="notify_url" class="pos" ref="notify">
            <el-input v-model="value.notify_url"></el-input><el-button class="back-url" type="primary"  @click="testBackUrl('gameForm')" placeholder="请输入支付订单回调">测试支付回调</el-button>
            <p class="err-tips">验证成功</p>
          </el-form-item>
          <!-- <el-form-item label="是否禁用：" prop="is_active">
            <el-radio v-model="value.is_active" :label="0">禁用</el-radio>
            <el-radio v-model="value.is_active" :label="1">启用</el-radio>
          </el-form-item> -->
          <el-form-item >
            <el-button style="width: 40%"  @click="handleCancel()">取消</el-button>
            <el-button style="width: 40%" type="primary"  @click="handleNext('gameForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { addGame } from '@/api/game.js';
  export default {
    name: "addGame",
    data() {
      var validNotifyUrl=(rule,value,callback)=>{
        var el = document.querySelector('.err-tips');
        el.style.display = 'none';
        var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
        console.log(reg.test(value))
        if (!value) {
          callback(new Error('通知地址不能为空'));
        } else if (!reg.test(value)) {
          callback(new Error('输入有误，请重新输入'));
        } else{
          callback()
          // callback(new Error('验证成功'))
        }
        
      };
      return {
        rules: {
          name: [
            {required: true, message: '请输入游戏名称', trigger: 'blur'},
            {min: 2, max: 20, message: '长度在 2 到 20 个数字或字符', trigger: 'blur'}
          ],
          notify_url:[...(process.env.NODE_ENV == 'production' ? [{validator: validNotifyUrl,trigger: 'blur'}] : [])] ,
        },
        value:{
          name: '',
          notify_url: '',
          is_active: 1,
        },
      };
    },
    methods: {
     // 提交保存
      handleNext(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const params = JSON.parse(JSON.stringify(this.value));
            this.handleAddGame(params);
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
      handleAddGame(params) {
        addGame(params).then(res => {
          console.log(res);
          if(res.code == 200){
            this.$router.push({path: '/game'});
          }
        });
      },

      // 取消
      handleCancel() {
        this.$router.push({path: '/game'});
      },

      // 测试回调地址校验
      testBackUrl(formName) {
        this.$refs['clearValidName'].clearValidate();
        var el = document.querySelector('.err-tips');
        this.$refs[formName].validate((valid) => {
          if (valid && process.env.NODE_ENV == 'production') {
            el.style.display = 'block';
          } else {
            el.style.display = 'none';
            // this.$message({
            //   message: '验证失败',
            //   type: 'error',
            //   duration:1000
            // });
            return false;
          }
        });
      },
    }
  }
</script>

<style scoped>
.pos{
  position:relative;
}
.back-url{
  position: absolute;
  top:0px;
  right: -120px;
}
.err-tips {
  display:none;
  color: #67C23A;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 56%;
  left: 0;
}
</style>
