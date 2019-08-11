<template>
  <div class="app-container">
     <!-- 搜索相关内容 -->
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchBrandList()"
            type="primary"
            size="small">
            查询结果
          </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="输入搜索：">
              <el-input style="width: 203px" v-model="listQuery.name" placeholder="游戏名称/关键字"></el-input>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
     <!-- 添加商品列表 -->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddProduct()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <!-- table -->
     <div class="table-container">
      <el-table
        ref="gameListTable"
        :data="tableData"
        style="width: 100%"
        v-loading="listLoading"
        border
        >
        <el-table-column
          fixed
          prop="date"
          label="游戏ID"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="支付订单回调"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="所属公司名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="city"
          label="游戏名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="游戏key"
          width="300">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="创建时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="修改时间"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.limit"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.start"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  // import { mapActions } from 'vuex'
  import {listgames} from '@/api/game.js'
  import { getToken } from '@/utils/auth'
  export default {
    name: 'home',
    data() {
      return {
        listLoading: true, // table loading
        listQuery: {
          start:1,
          limit: 10,
          name: '',
          token: getToken(),
        },
        total: 1, // 游戏总条数
         tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }]
      }
    },
    created(){
      // 获取初始化数据
      this.getList()
    },
    methods:{
      // ...mapActions({
      //   actionListgames: 'Listgames' // 将 `this.actionLogin()` 映射为 `this.$store.dispatch('increment')`
      // }),
      // 搜索游戏结果
      searchGameList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      // 游戏列表
      getList() {
        this.listLoading = true;
        this.listLoading = false;
        listgames(this.listQuery).then(res => {
          this.listLoading = false;
          console.log(res);
          // this.list = response.data.list;
          // this.total = response.data.total;
          // this.totalPage = response.data.totalPage;
          // this.pageSize = response.data.pageSize;
        });
      },
      handleClick(row) {
        console.log(row);
      },
      // 每页多少条
      handleSizeChange(val) {
        this.listQuery.start = 1;
        this.listQuery.limit = val;
        this.getList();
      },
      // 请求当前页码
      handleCurrentChange(val) {
        this.listQuery.start = val;
        this.getList();
      },

      // 添加商品列表
      handleAddProduct() {
        this.$router.push({path:'/home/addGameList'});
      },
    }
  }
</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
  }

  
</style>
