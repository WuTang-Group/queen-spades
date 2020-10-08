<template>
  <div>
    <Header></Header>
    <main class="main-content">
      <div class="dark-layout">
        <div class="container section-t-space">
          <div class="needs-validation">
            <div class="row justify-content-center">
              <div class="col-12 mb-4">
                <h1 class="text-white title">结账</h1>
              </div>
              <div class="col-lg-8">
                <div class="checkout">
                  <div class="accordion">
                    <h2
                      class="text-white title mb-0"
                      data-toggle="collapse"
                      data-target="#shipping"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >寄送地址</h2>
                    <div id="shipping" class="collapse show">
                      <div id="addresses">
                        <template v-for="(item,index) in addressList">
                          <div
                            v-if="item.id===orderData.user_address_id"
                            :key="index"
                            class="bigFont"
                          >
                            <span>{{item.address}}</span>,
                            <span>{{item.city}}</span>,
                            <span>{{item.province}}</span>,
                            <span>{{item.district}}, {{item.zip}}</span>
                            <span>中国</span>
                            <span class="mt-2">{{item.contact_name}}</span>
                            <span>{{item.contact_phone}}</span>
                          </div>
                        </template>
                      </div>
                    </div>
                    <h2
                      class="text-white title mb-0"
                      data-toggle="collapse"
                      data-target="#payment-method"
                      aria-expanded="true"
                      aria-controls="payment-method"
                    >付款</h2>
                    <div id="payment-method" class="collapse show">
                      <div class="form-group">
                        <label for="method" class="d-block tx-dark-gray">付款方式 *</label>
                        <div
                          v-for="(item,index) in payWays"
                          :key="index"
                          class="form-check form-check-inline"
                        >
                          <input
                            type="radio"
                            name="method"
                            :value="item.id"
                            class="form-check-input"
                            :id="item.type"
                            :checked="index==0?true:false"
                            required
                          />
                          <label class="form-check-label" for="alipay">
                            <img :src="item.img" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="order-review pt-5 scroll-element">
                  <div class="lefttime-wrapper">
                    <div>待支付</div>
                    <div class="lefttime">
                      <span>剩余支付时间：</span>
                      <span>{{leftTime}}</span>
                    </div>
                  </div>
                  <div class="order-subtotal">
                    <label class="tx-dark-gray">小计</label>
                    <p class="price">{{orderData.total_amount}}</p>
                  </div>
                  <div class="order-total mt-5">
                    <label>总计:</label>
                    <p class="price">{{orderData.total_amount}}</p>
                  </div>
                  <div>
                    <button
                      class="btn btn-outline w-100 mt-3"
                      @click="handlePayBtnClick($event)"
                    >{{isPaying?'正在处理订单':'立即支付'}}</button>
                  </div>
                  <div class="information mt-2">
                    <p>请注意订单一经处理就不得更改或取消</p>
                  </div>
                  <div class="mt-5">
                    <label class="blackFont smallFont">您的订单 ({{orderList.length}})</label>
                    <div class="order-item">
                      <div
                        v-for="(item,index) in orderList"
                        :key="index"
                        class="d-flex position-relative"
                      >
                        <nuxt-link
                          :to="{path:'/rapid-response-booster',query:{slug:item.product.slug}}"
                        >
                          <img :src="item.product.thumbnail" />
                        </nuxt-link>
                        <div class="product-description">
                          <p class="tx-mont">{{item.product.product_name_en}}</p>
                          <p>{{item.product.product_name}}</p>
                          <div class="tx-uppercase mt-2 tx-dark-gray">数量: {{item.amount}}</div>
                          <div class="product-price text-right align-self-end">
                            <template v-if="item.product.sale_price">
                              <del>¥ {{item.product.price}}</del>
                              ¥ {{item.product.sale_price}}
                            </template>
                            <template v-else>¥ {{item.product.price}}</template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getShoppingCartData, delShoppingCart } from "../util/util";
import { initPayment } from "~/api/payment";
import axios from "~/plugins/axios";
import { loadingTips, removeLoading } from '../util/util';

function formatDuring(time) {
  let hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = (time % (1000 * 60)) / 1000;
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  return `${hours}:${minutes}:${seconds}`
}

export default {
  components: { Header, Footer },
  async asyncData(context) {
    let orderData = await axios.get(
      `/api/order_details/${context.route.query.orderid}`
    );
    let addressListData = await axios.get(`/api/user_addresses`);
    let payWaysData = await axios.get(`/payments/web`);
    const payWays = payWaysData.data.data;
    return {
      orderData: orderData.data.data,
      orderList: orderData.data.data.items,
      addressList: addressListData.data.data,
      payWays: payWaysData.data.data
    };
  },
  data() {
    return {
      orderid: this.$route.query.orderid,
      addressList: [],
      payWays: [],
      orderData: [],
      orderList: [],
      isPaying: false,
      notifyWebsocket: null, //  ws监听支付状态
      paymentTimer: null, //  支付时间计时器
      leftTime: '02:00:00', //  剩余时间
      orderStatus: 0 //  订单管理 status说明:(1已付款,0待付款,-1付款失败,-2取消订单) ship_status说明:(1已发货,-1未发货,0已签收)
    };
  },
  created() {},
  mounted() {
    const { orderid = "" } = this.$route.query;
    if(this.orderData.status === 1) {
      this.$message({
        message: '该订单已支付',
        type: 'info',
        onClose:()=>{
          this.$router.replace({
            path: '/my-account'
          })
        }
      })
      return
    }
    this.initWebsocket(orderid);
    this.startCountdown()
  },
  beforeDestroy() {
    if(this.notifyWebsocket) {
      this.notifyWebsocket.close();
    }
    clearInterval(this.paymentTimer)
  },
  methods: {
    //  付款时间，超时取消订单
    startCountdown() {
      let leftTime = 120 * 60 * 1000;
      this.paymentTimer = setInterval(() => {
        if(leftTime > 0) {
          let formattedTime = formatDuring(leftTime)
          leftTime -= 1000
          this.leftTime = formattedTime
          return
        }
        this.$message({
          message: '支付超时，请您重新下单',
          type: 'info',
          onclose: () => {
            this.notifyWebsocket && this.notifyWebsocket.close()
            this.$router.replace({
              path: '/'
            })
          }
        })
        clearInterval(this.paymentTimer)
        
      }, 1000)
    },
    initWebsocket(orderNo) {
      const that = this;
      // 用户登录后才能连接websocket，否则会出错
      const notifyWebsocket = new WebSocket(
        "ws://120.79.173.163:10086"
      ); // 域名或ip以真实为准，此处为本地虚拟域名，端口不变
      this.notifyWebsocket = notifyWebsocket;
      // 客户端与服务端建立连接时触发
      notifyWebsocket.onopen = e => {
        interval; // 调用定时器进行心跳检测

        // 发送订单号数据(一般为点击支付按钮后),数据格式如下
        notifyWebsocket.send(
          `{"mode":"client_order_notify","data":{"no":${orderNo}}}`
        ); // 此处为json格式数据参照，具体号码由实际业务为准
      };

      // 客户端接收服务端数据时触发(此方法用于判断支付结果)
      notifyWebsocket.onmessage = function(e) {
        const data = JSON.parse(e.data);
        // 服务端回传数据为订单状态时,判断订单状态
        // 服务端发送订单交易的数据会包含status，只需获取status的值即可判断支付是否成功，1为支付成功，-1为支付失败,-2为取消订单,0为待付款，

        if (data.mode == "server_order_notify") {
          console.log("订单状态通知", data);
          if (data.data.status === 1) {
            notifyWebsocket.close();
            that.$message({
              message: "支付成功",
              type: "success"
            });
            that.$router.replace({
              path: "/my-account"
            });
          }
        }

        // 当e.data.mode == 'server_order_notify'时表明服务器返回了订单通知信息，需接收e.data.data中的数据判断订单支付状态
        // ps: e.data.mode == 'server_heart_check'时表明只是心跳检测，无实意
      };
      // 通讯关闭时(客户端)触发
      notifyWebsocket.close = function(e) {
        //notifyWebsocket.send('{"mode":"client_order_notify","data":"订单号具体号码"}')  // 此处为json格式数据参照，具体号码由实际业务为准
        // 通讯关闭时需发送订单号数据到服务端，服务端借此判断用户是交易完成而离开页面或是断电或不小心关闭网页后的处理
        // tips:仅在用户未付款或付款失败时才会取消订单
        console.log("closed");
      };
      // 通讯被关闭时(服务端)触发
      notifyWebsocket.onclose = function(e) {
        console.log("服务端连接关闭");
        clearInterval(interval); // 关闭定时器检测心跳
      };

      // 客户端心跳检测
      let interval = setInterval(function() {
        notifyWebsocket.send(
          '{"mode":"client_heart_check","data":"heart check"}'
        );
      }, 5000);
    },
    //  立即支付
    handlePayBtnClick(e) {
      e.preventDefault();
      if(this.orderData.status === 1) {
        return
      }
      if (this.isPaying) {
        return;
      }
      if ($("input[type^=radio]:checked").length === 0) {
        this.$message({
          message: "请选择支付方式"
        });
        return;
      }
      loadingTips('支付处理中')
      const selectedPayWayId = $("input[type^=radio]:checked").val();
      const selectedPayWay = this.payWays.find(item => {
        return item.id == selectedPayWayId;
      });
      const paymentUrl = selectedPayWay.request_url;
      const { orderid = "", paymentKey = "" } = this.$route.query;
      const params = {
        no: orderid,
        payment_key: paymentKey,
        total_amount: this.orderData.total_amount,
        _: Date.now()
      };

      initPayment(paymentUrl, params).then((res = {}) => {
        const { data } = res;
        removeLoading()
        if (data.code !== 20001) {
          this.$message({
            message: data.msg,
            type: "error"
          });
          return;
        }
        this.isPaying = true;
        window.open(data.data.pay_url, "_blank");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.lefttime-wrapper {
  color: #000;
  margin-bottom: 1.5rem;
  .lefttime {
    font-size: 16px;
    margin-top: .8rem;
  }
}
.order-total {
  margin-top: 1rem !important;
}
</style>
