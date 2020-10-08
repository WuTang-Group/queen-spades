<template>
  <div>
    <Header></Header>
    <main class="main-content">
      <div class="dark-layout">
        <div class="container section-t-space">
          <div class="row justify-content-center">
            <div class="col-12 mb-4">
              <h1 class="text-white title">购物车</h1>
            </div>
          </div>
          <div id="cart"
               class="row justify-content-center">
            <div class="col-lg-8">
              <div class="cart">
                <div class="cart-item d-md-flex align-items-center justify-content-between"
                     v-for="(item,index) in carListData[0].shop_cart_items"
                     :key="index">
                  <div class="product-image">
                    <nuxt-link :to="{path:'/rapid-response-booster', query:{slug:item.product.slug}}"
                               :title="`${item.product.product_name}`"><img :src="item.product.thumbnail"
                           :alt="item.product.product_name_en" /></nuxt-link>
                  </div>
                  <div class="product-description">
                    <p class="tx-mont">{{item.product.product_name_en}}</p>
                    <p>{{item.product.product_name}}</p>
                    <div class="tx-uppercase mt-2 tx-dark-gray">{{item.product.spec}}</div>
                  </div>
                  <div class="product-price unit-price text-center">
                    <template v-if="item.product.sale_price"><del>¥ {{item.product.price}}</del><span>¥ {{item.product.sale_price}}</span></template>
                    <template v-else><span>¥ {{item.product.price}}</span></template>
                  </div>
                  <div class="product-quantity d-inline-block text-center">
                    <span class="tx-dark-gray">数量：</span>{{item.amount}}
                  </div>
                  <div class="product-price amount text-center">
                    <template v-if="item.product.sale_price">¥ {{item.product.sale_price*item.amount}}</template>
                    <template v-else>¥ {{item.product.price*item.amount}}</template>
                  </div>
                  <div class="remove-product text-center"><span class="tx-dark-gray remove-item" @click="delCarData(item.product_id)">删除</span></div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="cart-collaterals scroll-element">
                <!-- <div class="mb-5">
            <label>促销代码</label>
            <form action="" method="post" id="coupon-form">
            	<div class="input-group">
                    <input type="text" class="form-control form-control-sm" name="coupon" id="coupon">
		          	<span class="input-group-btn">
                		<button type="submit" class="btn btn-solid">下一步</button>
		          	</span> 
		        </div>
                <div class="form-group mb-0 mr-sm-3">
                </div>
            </form>
        </div> -->
                <div class="cart-subtotal">
                  <label class="tx-dark-gray">小计</label>
                  <p class="price">{{sumPrice}}</p>
                </div>
                <div class="cart-total">
                  <label>总计:</label>
                  <p class="price">{{sumPrice}}</p>
                </div>
                <div>
                  <div class="btn btn-outline d-block mt-3" @click="handleCheckoutbtnClick">
                    前往下单
                  </div>
                  <!-- <nuxt-link :to="{path:'/checkout'}" >前往下单</nuxt-link> -->
                </div>
                <div class="information mt-5">
                  <label class="blackFont smallFont">贵宾服务</label>
                  <p>
                    如有疑问，请查看常见问题，<br>
                    联系在线客服或者拨打服务热线：400-853-1616
                  </p>
                  <label class="blackFont smallFont">免费退货</label>
                  <p>您可以在签收之日起的7天内申请无理由退货，并承担因此产生的运费。</p>
                  <label class="blackFont smallFont">安全支付</label>
                  <p>安全的支付方式</p>
                </div>
                <div><a href="/"
                     class="btn btn-outline d-block mt-3 mb-5">继续购物</a></div>
                <style>
                </style>
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
import { getShoppingCartData, delShoppingCart } from "~/api/cart";
import { mapMutations } from 'vuex'
import axios from "~/plugins/axios";
export default {
  components: { Header, Footer },
  async asyncData (context) {
    let listData = await axios.get(`/api/shop_carts`)
    console.log('listData', listData)
    return {
      carListData: listData.data.data
    }
  },
  data () {
    return {
      carListData: []
    };
  },
  created () { },
  mounted () { },
  computed: {
    // 总价计算
    sumPrice() {
      return this.carListData[0].shop_cart_items        
        .reduce((pre, cur) => {
          if(cur.product.sale_price){
            return pre + cur.amount * cur.product.sale_price;
          }else{
            return pre + cur.amount * cur.product.price;
          }              
        }, 0);
    },
  },
  methods: {
    ...mapMutations({
      setCartInfo: 'SET_CART_INFO'
    }),
    handleCheckoutbtnClick() {
      const [userInfo] = this.carListData
      if(userInfo.shop_cart_items.length === 0) {
        this.$message({
          message: '您的购物车还是空的哦~',
          type: 'info'
        })
        return
      }
      this.$router.push({
        path: '/checkout'
      })
    },
    getCarData: function() {
      var that = this
      getShoppingCartData().then(res => {
        if (res.data.code === 20001) {
          that.carListData = res.data.data
          this.setCartInfo(res.data.data)
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      }).catch(e => {
        if (e.response.status === 401) {
          this.$message({
            message: "请先登录",
            type: 'error'
          });
        } else {
          this.$message({
            message: '页面异常，请稍后刷新再试',
            type: 'error'
          });
        }
      })
    },
    delCarData: function(product_id) {
      var that = this

      const params = {
        product_id
      }
      
      delShoppingCart(params).then(res => {

        if (res.data.code === 20001) {
          that.$message({
            message: "已成功删除该商品",
            type: 'success'
          })

          // 重新获取购物车列表
          that.getCarData()
        } else {
          that.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(e => {
        if (e.response.status == 401) {
          that.$message({
            message: '请先登录',
            type: 'error'
          });
        } else {
          that.$message({
            message: '页面异常，请稍后刷新再试',
            type: 'error'
          })
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
  .remove-item{
    cursor: pointer;
  }
</style>
