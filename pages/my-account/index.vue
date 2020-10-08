<template>
  <div>
    <Header></Header>
    <main class="main-content">
      <div class="dark-layout">
        <div class="container section-t-space section-b-space">
          <div class="row justify-content-center">
            <div class="col-12 d-md-flex align-items-center justify-content-between">
              <h1 class="text-white title">我的账号</h1>
              <div class="btn-group myacc-menu"
                   role="group">
                <a href="/my-account"
                   class="btn btn-outline btn-sm active">所有订单</a>
                <a href="/my-account/profile"
                   class="btn btn-outline btn-sm ">我的个人资料</a>
                <a href="javascript:void(0)"
                   class="btn btn-outline btn-sm"
                   @click="logout">登出</a>
              </div>
            </div>
            <!-- <div class="order-list-container">
              <div class="order-list-title">我的订单</div>
            </div> -->
            <div class="col-12 section-t-space">
              <div class="small-section all-orders-wrapper">
                <h4 class="text-white mb-5">我的订单</h4>
                <div class="orders">
                  <div class="row order border-bottom">
                    <div class="col-5 col-md-3">
                      <h4 class="order-title">订单号</h4>
                    </div>
                    <div class="d-none d-md-block col-md-2">
                      <h4 class="order-title">日期</h4>
                    </div>
                    <div class="d-none d-md-block col-md-2 text-center">
                      <h4 class="order-title">状态</h4>
                    </div>
                    <div class="col-3 col-md-2 text-center mobile-left">
                      <h4 class="order-title">总计</h4>
                    </div>
                    <div class="col-4 col-md-3 text-right">
                      <h4 class="order-title">操作</h4>
                    </div>
                  </div>
                </div>
                <div class="orders">
                  <template v-if="list.length === 0">
                    <div class="empty-list">
                      暂无订单
                    </div>
                  </template>
                  <template v-else>
                    <div class="row order order-item-container" v-for="orderItem in list" :key="orderItem.id">
                      <div class="col-5 col-md-3 mobile-no">
                        <span class="order-content">{{orderItem.no}}</span>
                        
                      </div>
                      <div class="d-none d-md-block col-md-2">
                        <span class="order-content">{{orderItem.created_at | formatDateFilter('{y}-{m}-{d}')}}</span>
                      </div>
                      <div class="d-none d-md-block col-md-2 text-center ">
                        <span class="order-content">{{orderItem.status | orderStatusFilter(orderItem.ship_status)}}</span>
                      </div>
                      <div class="col-3 col-md-2 text-center mobile-left mobile-amount">
                        <span class="order-content">¥ {{orderItem.total_amount | formatMoneyFilter}}</span>
                      </div>
                      <div class="col-4 col-md-3 text-right">
                        <a :href="'my-account/order?no='+ orderItem.no" class="btn btn-white btn-xs btn-color">查询</a>
                        <div class="cancel-order" v-if="orderItem.status === 0">
                          <button type="button" @click="cancelOrder(orderItem.no)" class="btn btn-white btn-xs">取消订单</button>
                        </div>
                        <div class="input-group payment-group" v-if="orderItem.status === 0">
                            <select class="custom-select pay-select" v-model="orderItem.payMethod">
                                <option value="select">请选择</option>
                                <option v-for="(item,index) in payWays" :key="index" :value="item.id">{{item.type.split("_")[0]}}</option>
                            </select>
                            <div class="input-group-append">
                              <button type="button" @click="payment(orderItem.no, orderItem.payMethod)" class="btn btn-white btn-xs">付款</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 pagination-container mobile-pagination" v-if="listTotal > 0">
            <ul class="pagination" @click="pageChange">
              <li class="page-item">
                <a class="previous" @click="previousPage">前一页</a>
              </li>
              <li class="page-item"
                  :class="{'active': listQuery.page === item }"
                  :key="item"
                  v-for="item in pageTotal" 
              >
                <a class="" :data-count="item">{{item}}</a>
              </li>
              <li class="page-item">
                <a class="next" @click="nextPage">后一页</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { getOrderList, cancelOrder } from "~/api/order";
import { logoutRequest } from '../../util/util'
import { formatDate, formatMoney } from '@/filter'
import { orderStatus, orderShipStatus } from './common/constant'
import axios from "~/plugins/axios";

let defaultListQuery = {
  page: 1,
  page_limit: 6
}

export default {
  name: "OrderList",
  components: { Header, Footer },
  async asyncData({ params }) {
    const { data } = await getOrderList(defaultListQuery)
    const payWaysData = await axios.get(`/payments/web`)
    let list = []
    let listTotal = 0

    if(data.code === 20001 && data.data && data.data.data) {
      list = data.data.data.map(item => {
        // 增加支付方式属性payMethod，默认值select代表选择框中的'请选择'选项
        item.payMethod = 'select'
        return item;
      })
      listTotal = data.data.total
    }
    
    return { 
      list,
      listTotal,
      payWays: payWaysData.data.data
    }
  },
  filters: {
    formatDateFilter: formatDate,
    formatMoneyFilter: formatMoney,
    orderStatusFilter: function(status, shipStatus) {

      let orderStatusText = ''

      // status是1表示已支付，则需要以shipStatus状态判断
      if(status !== 1) {
        orderStatusText = orderStatus[status]
      } else {
        orderStatusText = orderShipStatus[shipStatus]
      }

      return orderStatusText
    }
  },
  data () {
    return {
      listQuery: defaultListQuery,
      list:[],
      listTotal: 0,
      pageTotal: 0,     // 根据listTotal和page_limit计算分页总共有多少页
      payWays: []
    };
  },
  created () {
    // 计算分页相关数据
    this.caculatePaginationData()
  },
  methods: {

    // 获取orderlist
    getList(){
      const that = this

      getOrderList(that.listQuery).then(({data}) => {

        if(data.code === 20001 && data.data && data.data.data) {
          let list = data.data.data.map(item => {
            // 增加支付方式属性payMethod，默认值select代表选择框中的'请选择'选项
            item.payMethod = 'select'
            return item;
          })

          this.list = list
          this.listTotal = data.data.total

          // 每次获取完商品总数需重新计算分页信息
          that.caculatePaginationData()
        } else {
          that.$message({
            message: '获取订单列表失败',
            type: 'error'
          });
        }
      }).catch(err=>{
        that.$message({
          message: '获取订单列表失败',
          type: 'error'
        });
      })
    },

    // 取消订单
    cancelOrder(orderNumber){
      const that = this

      const params = {
        no: orderNumber
      }

      cancelOrder(params).then(({data})=>{
        if(data.code ===20001) {
          that.$message({
            message: '获取订单成功',
            type: 'success'
          });

          that.getList()
        } else {
          that.$message({
            message: '取消订单失败',
            type: 'error'
          });
        }
      }).catch(err=>{
        that.$message({
          message: '取消订单失败',
          type: 'error'
        });
      })
    },

    // 计算分页相关数据
    caculatePaginationData(){
      // 计算分页总页数
      this.pageTotal = Math.ceil(this.listTotal / this.listQuery.page_limit)
    },

    
    // 跳转支付
    payment(orderNumber, payMethod) {
      const that = this

      // 如果未选择支付方式，提醒用户
      if(payMethod === 'select') {
        that.$message({
          message: '请选择支付方式',
          type: 'info'
        });
        return
      }

      this.$router.push({
        path:'/pay',
        query:{
          orderid:orderNumber,
          payWaysId: payMethod
        }
      })
    },
    
    // 切换前一页
    previousPage(e){
      if(this.listQuery.page > 1) {
        this.listQuery.page--

        // 重新获取数据
        this.getList()
      }
      
      // 阻止事件冒泡
      e.stopPropagation();
    },

    // 切换后一页
    nextPage(e){
      if(this.pageTotal > this.listQuery.page) {
        this.listQuery.page++

        // 重新获取数据
        this.getList()
      }
      
      // 阻止事件冒泡
      e.stopPropagation();
    },
    
    // 分页切换事件
    pageChange(e){
      let target = e.target||e.srcElement;
      let page = Number(target.getAttribute('data-count'));
      this.listQuery.page = page;

      // 重新获取数据
      this.getList()
      
      // 阻止事件冒泡
      e.stopPropagation();
    },

    // 登出页面
    logout: function () {
      logoutRequest("登出成功")
    }
  },
};
</script>

<style lang="scss" scoped>

.order-title {
  font-size: 17px;
  color: white;
}

.empty-list {
  width: 100%;
  height: 200px;
  color: #aaa;
  font-family:JXiHei, serif;
  font-size:16px;
  font-weight:400;
  display: flex;
  justify-content: center;
  align-items: center;
}

.order-item-container {
  padding: 16px 0;

  .cancel-order {
    margin-top: 6px;
  }

  .order-content {
    font-size: 14px;
    color: white;
    font-weight: 400;
  }

  .btn-color {
    color: black;
  }

  .payment-group {
    margin-top: 6px;
    display: flex;
    justify-content: flex-end;
  }

  .pay-select {
    flex-grow: 0;
    width: 120px;
  }
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding: 0;

  .page-item {

    .previous,
    .next,
    a {
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 768px) {
  .mobile-left {
    text-align: left !important;
  }

  .mobile-center {
    text-align: center !important;
  }

  .mobile-no {
    
    .order-content {
      font-size: 12px;
      font-weight: bold;
    }
  }

  .mobile-amount {
    min-width: 90px !important;
    padding: 0 !important;
    

    .order-content {
      font-size: 12px;
      font-weight: bold;
    }
  }

  .mobile-pagination {
    display: flex;
    justify-content: center;
  }
}

</style>
