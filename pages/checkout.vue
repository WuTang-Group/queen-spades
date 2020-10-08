<template>
  <div>
    <Header></Header>
    <main class="main-content">
      <div class="dark-layout">
        <div class="container section-t-space">
          <form class="needs-validation"
                method="post"
                novalidate>
            <div class="row justify-content-center">
              <div class="col-12 mb-4">
                <h1 class="text-white title">下单</h1>
              </div>
              <div class="col-lg-8">
                <div class="checkout">
                  <div class="accordion">
                    <h2 class="text-white title mb-0"
                        data-toggle="collapse"
                        data-target="#shipping"
                        aria-expanded="true"
                        aria-controls="collapseOne">寄送地址</h2>
                    <div id="shipping"
                         class="collapse show">
                      <div id="addresses">
                        <el-radio-group v-model="selectedAddressId">
                          <el-radio v-for="(item) in addressList" :key="item.id" :label="item.id">
                            <span>{{item.address}}</span>,
                            <span>{{item.city}}</span>,
                            <span>{{item.province}}</span>,
                            <span>{{item.district}}, {{item.zip}}</span>
                            <span>中国</span>
                            <br>
                            <span class="mt-2">{{item.contact_name}}</span>
                            <span>{{item.contact_phone}}</span>
                          </el-radio>
                        </el-radio-group>
                        <!-- <div v-for="(item,index) in addressList"
                             :key="index"
                             class="form-check mb-1">
                          <input class="form-check-input address-checkbox"
                                 name="address_id"
                                 type="radio"
                                 :id="`addr-${item.id}`"
                                 v-model="item.id"
                                 :checked="index==0?true:false"
                                 required>
                          <label class="form-check-label whiteFont"
                                 :for="`addr-${item.id}`">
                            <span>{{item.address}}</span>,
                            <span>{{item.city}}</span>,
                            <span>{{item.province}}</span>,
                            <span>{{item.district}}, {{item.zip}}</span>
                            <span>中国</span>
                            <br>
                            <span class="mt-2">{{item.contact_name}}</span>
                            <span>{{item.contact_phone}}</span>
                          </label>
                        </div> -->
                      </div>
                      <button type="button"
                              class="btn btn-white mt-3"
                              data-toggle="modal"
                              data-target="#create-new-address">
                        新建地址 </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="order-review pt-5 scroll-element">
                  <div class="order-subtotal">
                    <label class="tx-dark-gray">小计</label>
                    <p class="price">{{sumPrice}}</p>
                  </div>
                  <div class="order-total mt-5">
                    <label>总计:</label>
                    <p class="price">{{sumPrice}}</p>
                  </div>
                  <div>
                    <button type="button" class="btn btn-outline w-100 mt-3 weightFont" @click="placeOrder">立即购买</button>
                  </div>
                  <div class="information mt-2">
                    <p>请注意订单一经处理就不得更改或取消</p>
                  </div>
                  <div class="mt-5">
                    <label class="blackFont smallFont">您的订单 ({{orderListData.length}})</label>
                    <div class="order-item">
                      <div v-for="(item,index) in orderListData"
                           :key="index"
                           class="d-flex position-relative">
                        <nuxt-link :to="{path:'/rapid-response-booster',query:{slug:item.product.slug}}"><img :src="item.product.thumbnail" /></nuxt-link>
                        <div class="product-description">
                          <p class="tx-mont">{{item.product.product_name_en}}</p>
                          <p>{{item.product.product_name}}</p>
                          <div class="tx-uppercase mt-2 tx-dark-gray">数量: {{item.amount}}</div>
                          <div class="product-price text-right align-self-end">
                            <template v-if="item.product.sale_price"><del>¥ {{item.product.price}}</del>¥ {{item.product.sale_price}}</template>
                            <template v-else>¥ {{item.product.price}}</template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
    <Footer></Footer>

    <div class="modal fade"
         id="create-new-address"
         tabindex="-1"
         role="dialog"
         aria-labelledby="myModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content white-layout">
          <div class="modal-header">
            <h5 class="modal-title"
                id="exampleModalLongTitle">新建地址</h5>
            <button type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form class="needs-validation"
                method="post"
                id="addressInfo"
                novalidate>
            <div class="modal-body">
              <div class="form-group">
                <label for="name"
                       class="tx-dark-gray">姓名 *</label>
                <input type="text"
                       name="contact_name"
                       class="form-control border-dark"
                       id="name"
                       v-model="userName"
                       required>
              </div>
              <div class="form-group">
                <label for="contact"
                       class="tx-dark-gray">手机号 *</label>
                <input type="text"
                       name="contact_phone"
                       class="form-control border-dark"
                       id="contact"
                       v-model="userTel"
                       required>
              </div>
              <div class="form-row"
                   data-toggle="distpicker">
                <div class="form-group col-md-4">
                  <label for="province"
                         class="tx-dark-gray">省 *</label>
                  <select data-province=""
                          name="province"
                          class="form-control border-dark"
                          id="province"
                          @change="proviceChange"
                          required>
                    <option data-code=""
                            data-text="请选择"
                            value="">请选择</option>
                    <option v-for="(item,index) in provinceOption"
                            :key="index"
                            :data-code="item.value"
                            :data-text="item.label"
                            :value ="item.label"
                            :selected="item.checked">{{item.label}}</option>
                  </select>
                  <div class="invalid-feedback"></div>
                </div>
                <div class="form-group col-md-4">
                  <label for="city"
                         class="tx-dark-gray">城市 *</label>
                  <select data-city=""
                          name="city"
                          class="form-control border-dark"
                          id="city"
                          @change="cityChange"
                          required>
                    <option data-code=""
                            data-text="请选择"
                            value="">请选择</option>
                    <option v-for="(item,index) in cityOption"
                            :key="index"
                            :data-code="item.value"
                            :data-text="item.label"
                            :value ="item.label"
                            :selected="item.checked">{{item.label}}</option>
                  </select>
                  <div class="invalid-feedback"></div>
                </div>
                <div class="form-group col-md-4">
                  <label for="district"
                         class="tx-dark-gray">区 *</label>
                  <select data-district=""
                          name="district"
                          class="form-control border-dark"
                          id="district"
                          @change="districtChange"
                          required>
                    <option data-code=""
                            data-text="请选择"
                            value="">请选择</option>
                    <option v-for="(item,index) in areaOption"
                            :key="index"
                            :data-code="item.value"
                            :data-text="item.label"
                            :value ="item.label"
                            :selected="item.checked">{{item.label}}</option>
                  </select>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-8">
                  <label for="address"
                         class="tx-dark-gray">地址 *</label>
                  <input type="text"
                         name="address"
                         class="form-control border-dark"
                         id="address"
                         v-model="userAddress.address"
                         required>
                  <div class="invalid-feedback"></div>
                </div>
                <div class="form-group col-md-4">
                  <label for="zip"
                         class="tx-dark-gray">邮政编码 *</label>
                  <input type="text"
                         name="zip"
                         class="form-control border-dark"
                         id="zip"
                         v-model="userAddress.zip"
                         required>
                  <div class="invalid-feedback"></div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button"
                      class="btn btn-outline"
                      data-dismiss="modal"
                      aria-label="Close">取消</button>
              <button type="submit"
                      class="btn btn-solid">保存</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "~/plugins/axios";
import { loadingTips, removeLoading } from '../util/util';
export default {
  components: { Header, Footer },
  async asyncData (context) {
    let listData = await axios.get(`/api/shop_carts`)
    let addressListData = await axios.get(`/api/user_addresses`)
    let payWaysData = await axios.get(`/payments/web`)
    return {
      orderListData: listData.data.data[0].shop_cart_items,
      addressList: addressListData.data.data,
      payWays: payWaysData.data.data,
      selectedAddressId: addressListData.data.data.length > 0 ? addressListData.data.data[0].id : null
    }
  },
  data () {
    return {
      orderListData: [],
      addressList: [],
      provinceOption: [],
      cityOption: [],
      areaOption: [],
      userName: null,
      userTel: null,
      userAddress: {
        province: null,
        city: null,
        district: null,
        address: null,
        zip: null,
      },
      selectedAddressId: ''
    };
  },
  created () { },
  mounted () {
    //  防止异常操作
    if(this.orderListData.length === 0) {
      this.$message({
        message: '您的购物车还是空的哦~',
        type: 'info',
        onClose:()=>{
          this.$router.replace({
            path: '/'
          })
        }
      })
      return
    }
    var that = this;
    this.getProvinceOption();
    this.getCityOption();
    this.getDistrictOption();
    $("#addressInfo").validate({
      submitHandler: function (form) {
        loadingTips("新增地址中。。。")
        axios.post(`/api/user_addresses`, {
          contact_phone: $("#contact").val(),
          contact_name: $("#name").val(),
          province: that.userAddress.province,
          city: that.userAddress.city,
          district: that.userAddress.district,
          address: $("#address").val(),
          zip: $("#zip").val()
        })
          .then(res => {
            if (res.data.code === 20001) {
              removeLoading()
              setTimeout(() => {
                that.$message({
                  message: "已新增",
                  type: 'success'
                });
                $("#create-new-address .close").click();
                return axios.get(`/api/user_addresses`)
                  .then((res) => {
                    if (res.data.code === 20001) {
                      that.addressList = res.data.data
                      that.selectedAddressId = that.addressList[0].id
                    } else {
                      that.$message({
                        message: res.data.msg,
                        type: "error",
                      });
                    }
                  })
                  .catch((e) => {
                    that.$message({
                      message: "页面异常，请稍后刷新再试",
                      type: "error",
                    });
                  });
              }, 100);
            } else {
              removeLoading()
              setTimeout(() => {
                that.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }, 100);
            }
          })
          .catch(e => {
            removeLoading()
            setTimeout(() => {
              that.$message({
                message: '页面异常，请稍后刷新再试',
                type: 'error'
              });
            }, 100);
          });
      }
    })
  },
  computed: {
    // 总价计算
    sumPrice () {
      return this.orderListData
        .reduce((pre, cur) => {
          if (cur.product.sale_price) {
            return pre + cur.amount * cur.product.sale_price;
          } else {
            return pre + cur.amount * cur.product.price;
          }
        }, 0);
    },
  },
  methods: {
    getProvinceOption: function (provinceVal) {
      var that = this;
      this.provinceOption = [];
      this.regionData.forEach((item, index, array) => {
        that.provinceOption.push({
          value: item.value,
          label: item.label,
          checked: item.label === provinceVal
        })
      })
    },
    getCityOption: function (cityVal) {
      var that = this;
      this.cityOption = [];
      this.regionData.forEach((item, index, array) => {
        if (item.label == that.userAddress.province) {
          item.children.forEach((item, index, array) => {
            if (item.label === "市辖区") {
              that.cityOption.push({
                value: item.value,
                label: that.userAddress.province.replace("市", "") + "城区",
                checked: that.userAddress.province.replace("市", "") + "城区" === cityVal
              })
            } else if (item.label === "县") {
              that.cityOption.push({
                value: item.value,
                label: that.userAddress.province.replace("市", "") + "郊县",
                checked: that.userAddress.province.replace("市", "") + "郊县" === cityVal
              })
            } else {
              that.cityOption.push({
                value: item.value,
                label: item.label,
                checked: item.label === cityVal
              })
            }
          })
        }
      })
    },
    getDistrictOption: function (districtVal) {
      var that = this;
      this.areaOption = [];
      this.regionData.forEach((item, index, array) => {
        if (item.label == that.userAddress.province) {
          item.children.forEach((item, index, array) => {
            if (that.userAddress.province.replace("市", "") + "城区" === that.userAddress.city && item.label === "市辖区" || that.userAddress.province.replace("市", "") + "郊县" === that.userAddress.city && item.label === "县" || item.label === that.userAddress.city) {
              item.children.forEach((item, index, array) => {
                if (item.label !== "市辖区") {
                  that.areaOption.push({
                    value: item.value,
                    label: item.label,
                    checked: item.label === districtVal
                  })
                }
              })
            }
          })
        }
      })
    },
    proviceChange: function () {
      this.userAddress.province = $("#province").val()
      this.getCityOption()
      this.areaOption = [];
      $("#city").find("option:selected").attr("selected", false);
    },
    cityChange: function () {
      this.userAddress.city = $("#city").val()
      this.getDistrictOption()
      $("#district").find("option:selected").attr("selected", false);
    },
    districtChange: function () {
      this.userAddress.district = $("#district").val()
    },
    placeOrder: function() {
      var that = this
      if(this.orderListData.length === 0) {
        return
      }
      loadingTips("正在为您下单。。。")
      return axios.post(`/api/orders`,{
        address_id: this.selectedAddressId
      })
        .then((res) => {
          if (res.data.code === 20001) {
            removeLoading()
            console.log(res.data.data)
            const {cache_data = {}, order = {}} = res.data.data
            const {payment_key, no} = cache_data
            this.$router.push({
              path:'/pay',
              query:{
                orderid: no,
                paymentKey: payment_key
              }
            })
          } else {
            removeLoading()
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch((e) => {
          removeLoading()
          this.$message({
            message: "页面异常，请稍后刷新再试",
            type: 'error'
          });
        })
    }
  },
};
</script>

<style lang="scss" scoped>
  /deep/label.error{
      display: none;
    }
  /deep/span.error{
    color: #f00!important
  }
  /deep/.modal-header .close{
    padding: 0;
    margin: 0;
    height: auto;
    min-width: 30px;
    background: transparent;
  }
  .el-radio {
    display: flex;
    align-items: flex-start;
    white-space: normal;
  }
  /deep/.el-radio__label {
    color: #fff;
    font-weight: normal;
    font-size: 13px;
    letter-spacing: 2px;
    line-height: 1.4;
    padding-left: 6px;
  }
  /deep/.el-radio__input.is-checked+.el-radio__label {
    color: #fff;
  }
    
</style>
