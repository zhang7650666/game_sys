<template>
  <div class="app-container">
     <!-- 搜索相关内容 -->
    <el-card class="filter-container" shadow="never">
        <div>
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="searchGameList()"
            type="primary"
            size="small">
            查询结果
          </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="输入搜索：">
              <el-input style="width: 203px" v-model="listQuery.name" placeholder="商品名称/关键字"></el-input>
            </el-form-item>
            <el-form-item label="启用禁用：">
              <el-select v-model="listQuery.is_active" placeholder="全部">
                <el-option
                  v-for="item in status_op"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="游戏名称：">
              <el-select v-model="listQuery.game_id" placeholder="请选择游戏名称">
                <el-option
                  v-for="item in gameList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
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
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
        >
        <el-table-column
          fixed
          prop="id"
          label="商品ID"
          width="80"
        >
        </el-table-column>
        <el-table-column
          label="所属公司名称"
          width="200">
          <template>
            <div>
              <span>{{business_name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="game_name"
          label="游戏名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="200">
        </el-table-column>
        
        <el-table-column
          prop="amount"
          label="价格"
          width="200">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          label="状态"
          width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_active"
              active-color="#13ce66"
              :active-value="1"
              :inactive-value="0"
              active-text="启"
              inactive-text="禁"
              inactive-color="#ff4949"
              @change="handleEditStatus(scope.row)"
              >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <!-- <el-button @click="handleCheck(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
  import { listgoods, editStatus} from '@/api/goods.js'
  import { listgames} from '@/api/game.js'
  import { getToken } from '@/utils/auth'
  import Cookies from 'js-cookie'
  export default {
    name: 'goods',
    data() {
      return {
        listLoading: true, // table loading
        listQuery: {
          start:1,
          limit: 10,
          name: null,
          token: getToken(),
          game_id: null,
          is_active: null,
        },
        total: 1, // 游戏总条数
        list: [],
        gameList: [],
        business_name: '测试公司', // 所属公司
        status_op: [ // 支付类型
          {
            value: '',
            label: '全部'
          }, 
          {
            value: 1,
            label: '启用'
          }, {
            value: 0,
            label: '禁用'
          }
        ],
      }
    },
    created(){
      // 获取初始化数据
      // if (this.$route.query.game_id) {
      //   this.listQuery.game_id = Number(this.$route.query.game_id);
      //   this.listQuery.name = this.$route.query.name;
      //   this.listQuery.is_active = Number(this.$route.query.is_active);
      // }
      this.$store.dispatch("setCompany", Cookies.get('company'));
      this.getGameList();
      this.getList()
    },
    methods:{
      // 搜索游戏结果
      searchGameList() {
        this.listQuery.start = 1;
        this.getList();
      },
      // 游戏列表
      getGameList() {
        const params = {
          start:1,
          limit: 9999,
          name: '',
          token: getToken(),
        };
        listgames(params).then(res => {
          this.gameList = this.timeSort(res.data.list);
        });
      },
      // 商品列表
      getList() {
        this.listLoading = true;
        listgoods(this.listQuery).then(res => {
          this.listLoading = false;
          this.list = this.timeSort(res.data.list);
          this.total = res.data.count;
          this.business_name = res.data.business_name;
          // this.listQuery.start = response.data.totalPage;
          // this.pageSize = response.data.pageSize;
        });
      },
      // 排序
      timeSort(arr) {
        return arr.sort((a,b) => {
          return new Date(b.create_time).getTime() - new Date(a.create_time).getTime();
        })
      },
      // 查看
      handleCheck(row) {
        this.$router.push({path: '/goods/detailgoods', query: {game_id: this.$route.query.game_id}});
      },
      // 编辑
      handleEdit(row) {
        const rowInfo = JSON.stringify(row);
        this.$router.push({path: '/goods/editgoods', query: {game_id: this.$route.query.game_id,rowInfo: rowInfo}});
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
        this.$router.push({path:'/goods/addgoods', query: {game_id: this.$route.query.game_id}});
      },
      // 修改状态
      handleEditStatus(row) {
        editStatus(row);
      }
    }
  }
</script>
<style>
 .el-switch__label--left{
  position: relative;
  left: 46px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right{
  position: relative;
  right: 46px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label.is-active{
  z-index: 1111;
  color: #fff;
  /* width:60px; */
}
</style>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 20px;
    margin-right: 20px;
  }
</style>
