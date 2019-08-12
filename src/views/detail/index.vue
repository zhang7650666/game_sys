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
          <el-button
            style="float: right;margin-right: 15px"
            @click="handleResetSearch()"
            size="small">
            重置
          </el-button>
        </div>
        <div style="margin-top: 15px">
          <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
            <el-form-item label="关键词：">
              <el-input style="width: 203px" v-model="listQuery.onder_no" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item label="支付类型：">
              <el-select v-model="listQuery.pay_way" placeholder="全部">
                <el-option
                  v-for="item in pay_way_op"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="通知状态：">
              <el-select v-model="listQuery.notify_status" placeholder="初始化">
                <el-option
                  v-for="item in notify_status_op"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间：">
              <el-date-picker
                v-model="listQuery.start_time"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="startTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="getSTime"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间：">
              <el-date-picker
                v-model="listQuery.end_time"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="endTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="getETime"
                >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="游戏：">
              <el-select v-model="listQuery.game_key" placeholder="请选择游戏" @change="handleGameChange">
                <el-option
                  v-for="item in gameList"
                  :key="item.key"
                  :label="item.name"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品：" >
              <el-select v-model="listQuery.goods_key" placeholder="请选择商品" @change="handleGoodChange()">
                <el-option
                  v-for="item in goodList"
                  :key="item.key"
                  :label="item.name"
                  :value="item.key"
                  >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <!-- table -->
     <div class="table-container">
      <el-table
        ref="gameListTable"
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        border
        height="350"
        >
        <!-- <el-table-column
          fixed
          prop="id"
          label="订单ID"
          width="80"
        >
        </el-table-column> -->
        <el-table-column
          prop="uuid"
          label="用户UUID"
          width="200">
        </el-table-column>
        <el-table-column
          prop="third_nickname"
          label="用户昵称"
          width="200">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.sys_nickname ? scope.row.sys_nickname : scope.row.third_nickname}}</span>
            </div>
          </template>
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
          prop="goods_name"
          label="游戏商品名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="pay_way"
          label="支付类型"
          width="200">
          <template slot-scope="scope">
            <div>
              <span>{{handleStatus({status: 'pay_way', val: scope.row.pay_way})}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="amount"
          label="价格"
          width="200">
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          width="200">
          <template slot-scope="scope">
            <div>
              <span>{{handleStatus({status: 'status', val: scope.row.status})}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="notify_status"
          label="通知状态"
          width="200">
          <template slot-scope="scope">
            <div>
              <span>{{handleStatus({status: 'notify_status', val: scope.row.notify_status})}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="修改时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="notify_time"
          label="通知时间"
          width="200">
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
  import {orderList} from '@/api/detail.js'
  import { listgoods} from '@/api/goods.js'
  import { listgames} from '@/api/game.js'
  import { getToken } from '@/utils/auth'
  import Cookies from 'js-cookie'
  export default {
    name: 'detail',
    data() {
      return {
        listLoading: true, // table loading
        listQuery: {
          start:1,
          limit: 5,
          token: getToken(),
          onder_no: '', // 订单号(搜索条件) 默认空
          pay_way: '', // 1微信,2支付宝,默认空
          notify_status: '', // 1通知成功,2通知失败,0初始化默认空
          start_time: '', // 开始时间(搜索条件) 格式:年月日时分秒
          end_time: '', // 结束时间(搜索条件) 格式:年月日时分秒
          game_key: '', // 游戏key(搜索条件) 默认空
          goods_key: '', // 商品key(搜索条件) 默认空
        },
        total: 1, // 游戏总条数
        list: [],
        business_name: '测试公司', // 所属公司
        pay_way_op: [ // 支付类型
          {
            value: '',
            label: '全部'
          }, 
          {
            value: 1,
            label: '微信'
          }, {
            value: 2,
            label: '支付宝'
          }
        ],
        notify_status_op: [ // 通知状态
          {
            value: 0,
            label: '初始化'
          }, 
          {
            value: 1,
            label: '成功'
          }, {
            value: 2,
            label: '失败'
          }
        ],
        gameList: [],
        gameIndex: '',
        goodList: [],
        gameName: '',
        /* start 开始时间小于今天,结束时间不能大于开始时间 */
        startTime: {
          disabledDate: time => {
            if (this.listQuery.end_time) {
              return (
                time.getTime() > new Date(this.listQuery.end_time).getTime()
              );
            } else {
              return time.getTime() > Date.now();
            }
          }
        },
        endTime: {
          disabledDate: time => {
            if (this.listQuery.start_time) {
              return (
                time.getTime() > Date.now() ||
                time.getTime() < new Date(this.listQuery.start_time).getTime()
              );
            } else {
              return time.getTime() > Date.now();
            }
          }
        }
        /* end*/
      }
    },
    created(){
      // 获取初始化数据
      this.getGameList();
      this.getGoodList()
      this.getList()
      this.listLoading = false;
    },
    methods:{
      // 搜索游戏结果
      searchGameList() {
        this.listQuery.start = 1;
        this.getList();
      },
      // 游戏列表
      getList() {
        this.listLoading = true;
        console.log('时间', this.listQuery.start_time );
        orderList(this.listQuery).then(res => {
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
      // status
      handleStatus(obj) {
        if (obj.status == 'status') {
          switch (obj.val) {
            case 0:
              return '预下单';
              break;
            case 1:
              return '下单成功';
              break;
            case 2:
              return '下单失败';
              break;
            default:
              return '预下单'
          }
        } else if (obj.status == 'notify_status') {
          switch (obj.val) {
            case 0:
              return '初始化';
              break;
            case 1:
              return '成功';
              break;
            case 2:
              return '失败';
              break;
            default:
              return '初始化'
          }
        } else if (obj.status == 'pay_way') {
          switch (obj.val) {
            case 1:
              return '微信';
              break;
            case 2:
              return '支付宝';
              break;
            default:
              return '微信'
          }
        }
      },
      // 设置时间格式
      getSTime(val) {
        this.listQuery.start_time = val;
        console.log("时间", this.listQuery.start_time);
      },
      // 设置时间格式
      getETime(val) {
        this.listQuery.end_time = val;
        console.log("时间", this.listQuery.end_time);
      },
      // 游戏列表
      getGameList() {
        const params = {
          start:1,
          limit: 9999,
          name: null,
          token: getToken(),
        };
        if(this.gameName != '') {
          params.name = this.gameName;
        }
        listgames(params).then(res => {
          this.gameList = this.timeSort(res.data.list);
        });
      },
      // 商品列表
      getGoodList() {
        const params = {
          start:1,
          limit: 999999,
          name: null,
          token: getToken(),
          game_id: null,
          is_active: null,
        };
        if(this.gameIndex != ''){
          params.game_id = this.gameIndex
        }
        listgoods(params).then(res => {
          this.goodList = this.timeSort(res.data.list);
          console.log('goodList', this.goodList);
        });
      },
      // 游戏变更商品也变更
      handleGameChange() {
        this.gameList.map((item, index) => {
          if(item.key == this.listQuery.game_key){
            this.gameIndex = item.id;
            this.getGoodList()
          }
        })
      },
      // 商品变更游戏也变更
      handleGoodChange() {
        this.goodList.map((item) => {
          if(item.key == this.listQuery.goods_key){
            this.gameList.map((itemGame) => {
              if(itemGame.id ==item.game_id) {
                this.gameName = itemGame.name;
                this.getGameList()
              }
            })
          }
        })
      },
      // 重置
      handleResetSearch() {
        this.listQuery = {
          start:1,
          limit: 5,
          token: getToken(),
          onder_no: null, // 订单号(搜索条件) 默认空
          pay_way: null, // 1微信,2支付宝,默认空
          notify_status: 0, // 1通知成功,2通知失败,0初始化默认空
          start_time: null, // 开始时间(搜索条件) 格式:年月日时分秒
          end_time: null, // 结束时间(搜索条件) 格式:年月日时分秒
          game_key: null, // 游戏key(搜索条件) 默认空
          goods_key: null, // 商品key(搜索条件) 默认空
        }
      },
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
