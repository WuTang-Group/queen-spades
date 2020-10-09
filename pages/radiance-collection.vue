<template>
  <div>
    <Header></Header>
    <div id="main"
         role="main"
         class=" page-content">
      <div id="category-landing-primary"
           class="category-landing-primary-content cat-details premier-page premier-page-v2 js-recalculate-tile-heights">

        <div class="hero-component light hero-component__right hero-component__middle">
          <a name="radiance-collection-hero-new"
             class="visually-hidden"></a>
          <div v-if="type=='product'" class="hero-component__image js-hero-component-image js-hero-parallax-image"
               :style="`background-image:url(${bannerInfo.thumbnail})`">
            <div class="hero-component__content">
              <div class="hero-component__text js-hero-parallax-text">
                <div class="hero-component__title-text">
                  <h1 class="hero-component__h title-big">{{bannerInfo.product_name}}</h1>
                  <h3 class="hero-component__h title-big title-big--thin">{{bannerInfo.short_description}}</h3>
                </div>
                <div class="hero-component__teaser-text">
                  <p class="hero-component__p">{{bannerInfo.product_name_en}}</p>
                </div>
                <button type="button"
                        value="添加至购物车"
                        class="button-fancy-large add-to-cart button--secondary hero-componet_btn"
                        @click="addToCart(bannerInfo)">
                          添加至购物车
                </button>
                <div class="wishlist__pdp-text js-wishlist-not-added wishlist__pdp-text--not-added add-wish-custom">
                  <span class="wishlist__pdp-star"></span>
                  <span class="wishlist__pdp-add-text" @click="handleAddToWishlist(bannerInfo)">添加愿望清单</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="type=='product_category_skin_care'" class="hero-component__image js-hero-component-image js-hero-parallax-image"
               :style="`background-image:url(${bannerInfo.banner})`">
            <div class="hero-component__content">
              <div class="hero-component__text js-hero-parallax-text">
                <div class="hero-component__title-text">
                  <h1 class="hero-component__h title-big">{{bannerInfo.title}}</h1>
                  <h3 class="hero-component__h title-big title-big--thin">{{bannerInfo.sub_title}}</h3>
                </div>
                <div class="hero-component__teaser-text">
                  <p class="hero-component__p">{{bannerInfo.title_en}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="category-navigation js-category-navigation">
          <a class="pdp-logo visually-hidden js-category-logo"
             href="/index"
             title="La Prairie">
            <span class="icon icon-logo"
                  aria-hidden="true"></span>
            <span class="visually-hidden">Laravel</span>
          </a>
          <div class="category-navigation__tab-container js-category-tab-container mobile-tab-slide  active">
            <nuxt-link :to="{path:'/radiance-collection', query:{slug:$route.query.slug}}"
               class="category-navigation__tab-link js-category-tab-link"
               data-tab="product">
              <div class="category-navigation__tab-title">
                产品
              </div>
            </nuxt-link>
          </div>
        </div>
        <div class="category-tab category-tab-active"
             data-tab="product">
          <div class="category-landing-content collection">
            <div class="search-result-content collectiondetail-products wide-tiles">
              <ul id="search-result-items"
                  class=" container tiles-container search-result-items clearfix hide-compare "
                  v-if="products.length > 0">
                <li class="grid-tile js-collection-tile scroll-in-view"
                    data-big-asset="false"
                    data-small-asset="false"
                    v-for="(item,index) in products"
                    :key="index">
                  <div class="product-tile js-product-tile-container">
                    <div class="js-tile-wrpapper">
                      <div class="product-image">
                        <nuxt-link :to="{path:'/rapid-response-booster', query:{slug:item.slug}}"
                                   class="product-tile__image-link thumb-link"
                                   :title="`${item.product_name}`"
                                   :style="`background-image:url('${item.thumbnail}'})`">
                          <img class="product-tile__image js-product-tile-image"
                               :src="`${item.thumbnail}`"
                               :alt="`${item.product_name}`" />
                        </nuxt-link>
                      </div>
                      <div class="product-content">
                         <nuxt-link :to="{path:'/rapid-response-booster', query:{slug:item.slug}}"
                           title="PERFECTING FLUIDE PURE GOLD">
                          <h2 class="product-name js-product-name">
                            <div class="name-link product-tile__name"
                                 :title="item.product_name_en"
                                 lang="en">
                              {{item.product_name_en}}
                            </div>
                            <div class="name-link product-tile__duo-name">
                              {{item.product_name}}
                            </div>
                          </h2>
                          <h3 class="product-tile__description js-product-tile-description">
                            {{item.short_description}}
                          </h3>
                          <div class="product-tile__pricing-container js-product-tile-pricing-container">
                            <div class="product-pricing product-tile__pricing">
                              <span class="product-sales-price"
                                    :title="item.short_description">
                                <span class="js-sales-price js-product-price">
                                  ¥ {{item.price}}
                                </span>
                              </span>
                            </div>
                          </div>
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </li>

              </ul>
              <div class="category_banner">
              </div>
            </div>
          </div>
          <div class="clp-bottom-asset" v-if="exploreProducts.length > 0">
            <h3 class="title-big title-big--thin explore-collections__title">继续探索</h3>
            <div class="clp-bottom-asset__container">

              <div class="exploreothercollections__img-large js-explore-image-large platinum-explore-other-collection"
                   :style="`backgroundImage:url(${exploreProducts[0].thumbnail})`">
              </div>
              <div class="exploreothercollections slide left dark"
                   data-content-id="platinum-explore-other-collection"
                   :data-link="`/rapid-response-booster?slug=${exploreProducts[0].slug}`">
                <a name="platinum-explore-other-collection"
                   class="visually-hidden"></a>
                <div class="exploreothercollections__img js-teaser-image">
                </div>
                <div class="exploreothercollections__container">
                  <h3 class="exploreothercollections__title ">{{exploreProducts[0].product_name}}</h3>
                  <h3 class="exploreothercollections__teaser-title">{{exploreProducts[0].product_name_en}}</h3>
                </div>
              </div>

              <div class="exploreothercollections__img-large js-explore-image-large skin-caviar-explore-other-collection"
                   :style="`backgroundImage:url(${exploreProducts[1].thumbnail})`">
              </div>
              <div class="exploreothercollections slide right dark"
                   data-content-id="skin-caviar-explore-other-collection"
                   :data-link="`/rapid-response-booster?slug=${exploreProducts[1].slug}`">
                <a name="skin-caviar-explore-other-collection"
                   class="visually-hidden"></a>
                <div class="exploreothercollections__img js-teaser-image">
                </div>
                <div class="exploreothercollections__container">
                  <h3 class="exploreothercollections__title ">{{exploreProducts[1].product_name}}</h3>
                  <h3 class="exploreothercollections__teaser-title">{{exploreProducts[1].product_name_en}}</h3>
                </div>
              </div>

              <div class="exploreothercollections__img-large js-explore-image-large white-caviar-explore-other-collection"
                   :style="`backgroundImage:url(${exploreProducts[2].thumbnail})`">
              </div>
              <div class="exploreothercollections slide left dark"
                   data-content-id="white-caviar-explore-other-collection"
                   :data-link="`/rapid-response-booster?slug=${exploreProducts[2].slug}`">
                <a name="white-caviar-explore-other-collection"
                   class="visually-hidden"></a>
                <div class="exploreothercollections__img js-teaser-image">
                </div>
                <div class="exploreothercollections__container">
                  <h3 class="exploreothercollections__title ">{{exploreProducts[2].product_name}}</h3>
                  <h3 class="exploreothercollections__teaser-title">{{exploreProducts[2].product_name_en}}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "~/plugins/axios";
import { loadingTips, removeLoading } from '../util/util';
import { mapState, mapMutations } from 'vuex'
import { getShoppingCartData, addShoppingCart } from "~/api/cart";
import { getWishList, addToWishlist } from "~/api/wish";
export default {
  components: { Header, Footer },
  data () {
    return {
      type: this.$route.query.type,
      bannerInfo: {},
      products: [],
      exploreProducts: []
    };
  },
  watch: {
    // 监听路由变化，如果变化则根据最新路由重新获取数据
    '$route' (to, from) {
      if(to.query.slug !== from.query.slug) {
        this.getProducts();
        this.getExploreProducts();
        this.setNavigatState(false);
        this.setOverState(false);
      }
    } 
  },
  created () {
    this.getProducts();
    this.getExploreProducts();
  },
  mounted () { 
  },
  methods: {
    ...mapMutations({
      setCartInfo: 'SET_CART_INFO',
      setWishInfo: 'SET_WISH_INFO',
      setNavigatState: "SET_NAVIGAT_STATE",
      setOverState: "SET_OVER_STATE"
    }),

    // 获取购物车信息，添加到全局状态中
     getShoppingCart() {
      const that = this
      getShoppingCartData().then(res => {
        if (res.data.code === 20001) {
          that.setCartInfo(res.data.data)
        } else {
          that.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })
      .catch(e => {
        if (e.response.status === 401) {
          that.$message({
            message: "请先登录",
            type: 'error'
          });
        } else {
          that.$message({
            message: '页面异常，请稍后刷新再试',
            type: 'error'
          });
        }
      });
    },

    // 添加购物车
    addToCart(productInfo) {
      const that = this
      const params = {
        product_list:[{product_id:productInfo.id}]
      }

      addShoppingCart(params).then(res => {
        if (res.data.code === 20001) {
          that.getShoppingCart();
          that.$message({
            message: "成功添加到购物车",
            type: 'success'
          });
        } else if (res.data.code === 10001) {
          that.$message({
            message: '此商品已在您购物车',
            type: 'error'
          })
        } else {
          that.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })
      .catch(e => {
        if (e.response.status == 401) {
          that.$message({
            message: '请先登录',
            type: 'error'
          });
        } else {
          that.$message({
            message: '页面异常，请稍后刷新再试',
            type: 'error'
          });
        }
      })
    },

    // 获取心愿单列表
    getTotalWish() {
      const that = this
      getWishList().then(res => {
        if (res.data.code === 20001) {
          that.setWishInfo(res.data.data)
        } else {
          that.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      })
      .catch(e => {
        if (e.response.status === 401) {
          that.$message({
            message: "请先登录",
            type: 'error'
          });
        } else {
          that.$message({
            message: '页面异常，请稍后刷新再试',
            type: 'error'
          });
        }
      });
    },

    // 添加愿望清单
    handleAddToWishlist(productInfo){
      const that = this
      console.log(productInfo)
      const params = {
        product_id: productInfo.id
      }
      addToWishlist(params).then(res => {
        const { code, msg } = res.data;
        if (code === 20001) {
          that.getTotalWish();
          that.$message({
            message: "成功添加到心愿单",
            type: 'success'
          });
        } else {
          that.$message({
            message: msg,
            type: 'error'
          });
        }
      })
      .catch(e => {
        if (e.response.status == 401) {
          that.$message({
            message: '请先登录',
            type: 'error'
          });
        } else {
          that.$message({
            message: '页面异常，请稍后刷新再试',
            type: 'error'
          });
        }
      })
    },

    getProducts: async function () {
      loadingTips()
      var that = this;
      return await axios.get(`/api/products/list/${this.$route.query.type}/${this.$route.query.slug}`)
        .then((res) => {
          if (res.data.code === 20001) {
            if (res.data.data.length > 0) {
              if(that.type=='product'){
                that.products = res.data.data[0].children;
              }else if(that.type=='product_category_skin_care'){
                that.products = res.data.data[0].products;
              }
              that.bannerInfo = res.data.data[0];
            }
            removeLoading()
          } else {
            removeLoading()
            setTimeout(() => {
              that.$message({
                message: res.data.msg,
                type: 'error'
              });
            }, 300);
          }
        }).catch((e) => {
          removeLoading()
          setTimeout(() => {
            that.$message({
              message: "页面异常，请稍后刷新再试",
              type: 'error'
            });
          }, 300);
        })
    },
    getExploreProducts:async function () {
      var that = this;
      return await axios.get(`/api/products/explore`)
        .then((res) => {
          if (res.data.code === 20001) {
           that.exploreProducts = res.data.data;
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch((e) => {
          this.$message({
            message: "数据获取异常，请稍后刷新再试",
            type: 'error'
          });
        })
      } 
    // 
  }
}
</script>

<style lang="scss" scoped>
.product-image{
  margin: 0 0 0.5rem;
}
/deep/.product-tile__name{
  margin: 0 0 0.25rem;
}
/deep/.hero-component__h{
  color: white!important;
}
h1,
.name-link,
.product-tile__duo-name,
.category-name-link {
  color: white;
}
.hero-componet_btn {
  color: #1b1b1b;
  margin-top: 12px;
}
/deep/.exploreothercollections__container h3{
  color: #fff;
}
.add-wish-custom {
  margin-top: 10px;
  cursor: pointer;
}
@media only screen and(max-width: 1024px) {
  .hero-componet_btn {
    margin-bottom: 30px;
  }
}
.clp-bottom-asset__container{
  background:url('../static/image/keep-exploring-default.jpg');
}
</style>
