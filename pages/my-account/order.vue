<template>
  <div>
    <Header></Header>
    <div id="main"
         role="main"
         class="user-registred order-history page-content">
      <div id="primary"
           class="primary-content pay--hist">
        <h1 class="account-header-title">
          我的 La Prairie 订单
          <a class="account__header-link"
             href="/my-account">返回我的订单</a>
        </h1>
        <div v-if="orderDetails" class="account-orders-orderdetail">
          <h4 class="account-orders__item-header">
            <span class="label">订单号：</span>
            <span class="value">{{orderDetails.no}}</span>
          </h4>
          <ul class="search-result-items order-history-items text-normal">
            <li>
              <div class="order-date">
                <span class="label">订单日期：</span>
                <span class="value">{{orderDetails.created_at | formatDateFilter('{y}-{m}-{d}')}}</span>
              </div>
            </li>
            <li>

              <span class="value order_created">{{orderDetails.status | orderStatusFilter(orderDetails.ship_status)}}</span>
            </li>
            <li>
              <span class="label">收件人：</span>
              <span class="value">{{orderDetails.address.contact_name}}</span>
            </li>
            <li>
              <span class="label">总额</span>
              <span class="value">¥ {{orderDetails.total_amount | formatMoneyFilter}}</span>
            </li>
            <li class="last order-details-link">
            </li>
          </ul>
          <div class="item-list">
            <div v-for="(item,index) in orderDetails.items" :key="index" class="checkout-tile__item checkout-tile js-product-tile-container">
              <div class="checkout-tile__item-image">
                <img :src="item.product.thumbnail" :alt="item.product.product_name_en" class="js-checkout-tile-image" />
              </div>
              <div class="checkout-tile__item-details">
                <div class="tile-details-wrapper">
                  <div class="order-item ">
                    <div class="order-item__name">
                      <nuxt-link :to="{path:'/rapid-response-booster', query:{slug:item.product.slug}}" :title="item.product.product_name_en">{{item.product.product_name_en}}</nuxt-link>
                    </div>
                    <div class="order-item__asian-name">{{item.product.product_name}}</div>
                    <div class="order-item__variations">
                    </div>
                  </div>
                  <div class="qty-size-wrapper">
                    <div class="qty-size-content">
                      <div class="checkout-tile__item-quantity qty-short">
                        <div class="quantity__block">
                          <label for="19d3145acacdb2e04f08c2738d">数量:</label>
                          <input class="quantity__input js-quantity" type="number" :value="item.amount" readonly />
                        </div>
                      </div>
                      <span class="product-shopping__contents">{{item.product.spec}}</span>
                    </div>
                    <div class="checkout-tile__item-price">
                      <div class="item-price__total item-price__total--unadjusted">¥ {{item.amount*item.price}}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="qap-details">
                <div class="item-price">
                  <span class="price-sales">&yen;10,200.00</span>
                </div>
                <div class="item-total">
                  <span class="price-total js-product-price"
                        data-price="CNY 10200.00">
                    &yen;10,200.00
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="mini-shipment order-component-block shipment-content">
            <span class="section-header">寄送地址：</span>
            <div class="details text-normal"><span class="name">{{orderDetails.address.contact_name}}</span><span>{{orderDetails.address.province+orderDetails.address.city+orderDetails.address.district+orderDetails.address.address}}</span></div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import axios from "~/plugins/axios";
import { formatDate, formatMoney } from '@/filter'
import { orderStatus, orderShipStatus } from './common/constant'

export default {
  components: { Header, Footer },
  async asyncData (context) {
    const orderData = await axios.get(`/api/order_details/${context.route.query.no}`)

    return {
      orderDetails: orderData.data.data
    }
  },
  data () {
    return {
      orderDetails:null
    };
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
  created () {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.order-item__name a{
  line-height: 1.25;
  margin: 0 0 0.2rem;
}
.checkout-tile__item-details .qty-size-wrapper .quantity__block label{
  margin-bottom: 0;
  margin-top: 0.35rem;
}
.item-list{
  margin-bottom: 1.5rem;
}
.account-orders-orderdetail .payment-content,.account-orders-orderdetail .shipment-content{
  width: 100%;
}
.account-orders-orderdetail .section-header{
  float: left;
}
.account-orders-orderdetail .details{
  padding: 0 0 0 6rem;
  &.text-normal{
    .name{
      padding:0 0.75rem 0 0;
    }
  }
}
.account-orders-orderdetail .mini-payment-instrument{
  width: auto;
  padding: 0 0 0 6rem; 
  .details{
    padding: 0;
  }
}
</style>
