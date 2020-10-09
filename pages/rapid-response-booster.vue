<template>
  <div>
    <Header></Header>
    <div class="pdp-header js-secondary-header">
      <nav class="pdp-nav js-pdp-scroll-to">
        <ul>
          <li class="pdp-nav-item">
            <a href=""
               title="功效"
               class="for-benefits pdp-luxe-desktop"
               data-target="for-benefits">
              功效
            </a>
            <a href=""
               title="功效"
               class="for-benefits pdp-luxe-mobile"
               data-target="for-benefits-mobile">
              功效
            </a>
          </li>
          <li class="pdp-nav-item">
            <a href=""
               title="使用方法"
               class="for-application"
               data-target="for-application">
              使用方法
            </a>
          </li>
          <li class="pdp-nav-item">
            <nuxt-link :to="{path:'/radiance-collection',query:{slug:categorySlug}}"
                       class="navigation__lnk">产品系列</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
    <main id="main"
          class="main premiumAnimatedPDP"
          role="main">
      <div class="header-space-fix"></div>
      <section id="pdpMain"
               class="pdp-section pdp-section--main pdp-main js-hero-desktop-slider"
               data-set-animations="non-animated">

        <div class="product-hero js-pdp-section-hero">
          <div class="product-hero__image js-product-hero-image js-data-layer-product"
               :style="`background-image: url('${productBanner}');`">
            <div class="product-hero__text pdp-luxe-mobile product-hero__text-mobile">
              <div class="product-hero__text--content product-hero__text--content-padded">
                <div class="product-hero__main-text pdp-space-fix">
                  <span>
                    <!-- <h2 class="product-hero__collection-title"
                        lang="en">
                      ANTI-AGING
                    </h2> -->
                    <h1 class="product-hero__name title-big--thin"
                        lang="en">{{shortDescript}}</h1>
                    <h2 class="product-hero__name title-big title-big--thin">{{productName}}</h2>
                  </span>
                  <div class="product-hero__short-description">{{styleName}}</div>
                </div>
              </div>
            </div>
            <a href=""
               class="product-hero__scroll-to-next js-product-hero-scroll-to-next text-centered"
               data-target="for-benefits">
              <div class="product-hero__scroll-to-next-text">向下滚动查看</div>
              <span class="icon-chevron-down icon"></span>
            </a>
          </div>
          <div class="js-pdp-section-second-hero for-benefits-js-container">
            <div class="product-hero__secondary-image js-product-second-hero-image desktop-bg" :style="`background-image: url('${benefitBanner}');`">
              <section class="pdp-features-accordion pdp-luxe-desktop"
                       style=''>
                <h3 class="pdp-features-title js-pdp-features-title js-benefits-view">
                  <span>功效</span>
                  <span class="pdp-features-icon"></span>
                </h3>
                <div class="pdp-features-wrapper js-pdp-features-content js-benefits-view">
                  <div class="pdp-features-content  js-cat-tabs-desc cat-tabs-desc">
                    <div class="pdp-features-content__content-text">
                      <p class=""
                         style=''>{{benefit}}</p>
                    </div>
                  </div>
                  <div class="tabs-toggle-text tabs-read-more js-cat-tabs-more text-hidden pdp-luxe-mobile">
                    <span class="tabs-toggle-label js-cat-tabs-toggle-label"
                          data-less="收起"
                          data-more="了解更多">
                      了解更多
                    </span>
                    <span class="icon icon-chevron-down"></span>
                  </div>
                </div>
                <h3 class="pdp-features-title js-pdp-features-title">
                  <span>产品细节</span>
                  <span class="pdp-features-icon"></span>
                </h3>
                <div class="pdp-features-wrapper js-pdp-features-content ">
                  <div class="pdp-features-content js-cat-tabs-desc cat-tabs-desc">
                    <div class="pdp-features-content__content-text">
                      <p>{{descript}}</p>
                    </div>
                  </div>
                  <div class="tabs-toggle-text tabs-read-more js-cat-tabs-more text-hidden pdp-luxe-mobile">
                    <span class="tabs-toggle-label js-cat-tabs-toggle-label"
                          data-less="收起"
                          data-more="了解更多">
                      了解更多
                    </span>
                    <span class="icon icon-chevron-down"></span>
                  </div>
                </div>
                <h3 class="pdp-features-title js-pdp-features-title active">
                  <span>线上服务</span>
                  <span class="pdp-features-icon"></span>
                </h3>
                <div class="pdp-features-wrapper js-pdp-features-content active">
                  <div class="pdp-features-content product-services-content">
                    <div class="product-services-container">
                      <div class="content-asset">
                        <div class="product-services__tile col-md-3">
                          <div class="product-services__image-container">
                            <img src="/picture/delivery.svg" />
                          </div>
                          <div class="product-services__heading">免费配送</div>
                        </div>
                        <div class="product-services__tile col-md-3">
                          <div class="product-services__image-container">
                            <img src="/picture/Samples.svg" />
                          </div>
                          <div class="product-services__heading">免费试用装</div>
                        </div>
                        <div class="product-services__tile col-md-3">
                          <div class="product-services__image-container">
                            <img src="/picture/Gift.svg" />
                          </div>
                          <div class="product-services__heading">精致礼盒包装</div>
                        </div>
                        <div class="product-services__tile col-md-3">
                          <div class="product-services__image-container">
                            <img src="/picture/Services_SecurePayment_60.svg" />
                          </div>
                          <div class="product-services__heading">安全支付</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div class="product-hero__content is-fixed ">
                <div class="product-hero__text">
                  <div class="product-hero__text--content product-hero__text--content-padded">
                    <div class="pdp-luxe-desktop">
                      <div class="product-hero__main-text pdp-space-fix">
                        <span>
                          <!-- <h2 class="product-hero__collection-title"
                              lang="en">
                            ANTI-AGING
                          </h2> -->
                          <h1 class="product-hero__name title-big--thin"
                              lang="en">{{shortDescript}}</h1>
                          <h2 class="product-hero__name title-big title-big--thin">{{productName}}</h2>
                        </span>
                        <div class="product-hero__short-description">{{styleName}}</div>
                      </div>
                    </div>
                    <div class="product-shopping product-detail ">
                      <div id="product-content"
                           class="clearfix product-content">
                        <div class="product-hero__shopping variations-action-block">
                          <div class="product-hero__single-size">{{specifications}}</div>
                          <div class="variations-wrapper clearfix ">
                            <div class="product-price product-shopping__price">
                              <span class="price-sales price-sales-upper">
                                <template v-if="sale_price">¥ {{sale_price}}<del>¥ {{price}}</del></template>
                                <template v-else>¥ {{price}}</template>                                
                                <span class="hidden js-product-price"
                                      ::data-price="price"></span>
                              </span>
                            </div>
                          </div>
                          <div class="product-actions-wrapper clearfix">
                            <div class="product-add-to-cart clearfix">
                              <h2 class="visually-hidden">Product Actions</h2>
                              <button id="add-to-cart"
                                      type="button"
                                      value="添加至购物车"
                                      class="button-fancy-large add-to-cart button--secondary" @click="addToCart">
                                添加至购物车
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="product__mobile-secondary-actions">
                      <div class="product__secondary-actions">
                        <div class="js-pdp-scroll-to">
                          <a href=""
                             data-stickybag="true"
                             data-target="for-routine">
                            <div class="regime__pdp-text-container">
                              <span class="regime__pdp-text-icon"></span>
                              <span class="regime__pdp-text">您的日常</span>
                            </div>
                          </a>
                        </div>
                        <a href="javascript:;"
                           class="js-wishlist-account-toggle">
                          <div class="wishlist__pdp-text-container">
                            <div class="wishlist__pdp-text js-wishlist-not-added wishlist__pdp-text--not-added">
                              <span class="wishlist__pdp-star"></span>
                              <span class="wishlist__pdp-add-text" @click="handleAddToWishlist">添加愿望清单</span>
                            </div>
                            <div class="wishlist__pdp-text js-wishlist-added">
                              <span class="wishlist__pdp-star-added"></span>
                              <span class="wishlist__pdp-add-text">产品已列入您的礼愿清单</span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div class="pdp-section--benefits-fixed">
                      <div class="product__desktop-secondary-actions">
                        <div class="product__secondary-actions">
                          <div class="js-pdp-scroll-to">
                            <a href=""
                               data-stickybag="true"
                               data-target="for-routine">
                              <div class="regime__pdp-text-container">
                                <span class="regime__pdp-text-icon"></span>
                                <span class="regime__pdp-text">您的日常</span>
                              </div>
                            </a>
                          </div>
                          <a href="javascript:;"
                             class="js-wishlist-account-toggle">
                            <div class="wishlist__pdp-text-container">
                              <div class="wishlist__pdp-text js-wishlist-not-added wishlist__pdp-text--not-added">
                                <span class="wishlist__pdp-star"></span>
                                <span class="wishlist__pdp-add-text" @click="handleAddToWishlist">添加愿望清单</span>
                              </div>
                              <div class="wishlist__pdp-text js-wishlist-added">
                                <span class="wishlist__pdp-star-added"></span>
                                <span class="wishlist__pdp-add-text">产品已列入您的礼愿清单</span>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="product-hero__secondary-image js-product-second-hero-image mobile-bg" :style="`background-image: url('${benefitBanner}');`">
            </div>
          </div>
        </div>
      </section>
      <section class="pdp-features-accordion for-benefits-mobile-js-container pdp-luxe-mobile"
               style=''>
        <h3 class="pdp-features-title js-pdp-features-title js-benefits-view">
          <span>功效</span>
          <span class="pdp-features-icon"></span>
        </h3>
        <div class="pdp-features-wrapper js-pdp-features-content js-benefits-view">
          <div class="pdp-features-content  js-cat-tabs-desc cat-tabs-desc">
            <div class="pdp-features-content__content-text">
              <p class=""
                 style=''>{{benefit}}</p>
            </div>
          </div>
          <div class="tabs-toggle-text tabs-read-more js-cat-tabs-more text-hidden pdp-luxe-mobile">
            <span class="tabs-toggle-label js-cat-tabs-toggle-label"
                  data-less="收起"
                  data-more="了解更多">
              了解更多
            </span>
            <span class="icon icon-chevron-down"></span>
          </div>
        </div>
        <h3 class="pdp-features-title js-pdp-features-title">
          <span>产品细节</span>
          <span class="pdp-features-icon"></span>
        </h3>
        <div class="pdp-features-wrapper js-pdp-features-content ">
          <div class="pdp-features-content js-cat-tabs-desc cat-tabs-desc">
            <div class="pdp-features-content__content-text">
              <p>{{descript}}</p>
            </div>
          </div>
          <div class="tabs-toggle-text tabs-read-more js-cat-tabs-more text-hidden pdp-luxe-mobile">
            <span class="tabs-toggle-label js-cat-tabs-toggle-label"
                  data-less="收起"
                  data-more="了解更多">
              了解更多
            </span>
            <span class="icon icon-chevron-down"></span>
          </div>
        </div>
        <h3 class="pdp-features-title js-pdp-features-title active">
          <span>线上服务</span>
          <span class="pdp-features-icon"></span>
        </h3>
        <div class="pdp-features-wrapper js-pdp-features-content active">
          <div class="pdp-features-content product-services-content">
            <div class="product-services-container">
              <div class="content-asset">
                <div class="product-services__tile col-md-3">
                  <div class="product-services__image-container">
                    <img src="/picture/delivery.svg" />
                  </div>
                  <div class="product-services__heading">免费配送</div>
                </div>
                <div class="product-services__tile col-md-3">
                  <div class="product-services__image-container">
                    <img src="/picture/Samples.svg" />
                  </div>
                  <div class="product-services__heading">免费试用装</div>
                </div>
                <div class="product-services__tile col-md-3">
                  <div class="product-services__image-container">
                    <img src="/picture/Gift.svg" />
                  </div>
                  <div class="product-services__heading">精致礼盒包装</div>
                </div>
                <div class="product-services__tile col-md-3">
                  <div class="product-services__image-container">
                    <img src="/picture/Services_SecurePayment_60.svg" />
                  </div>
                  <div class="product-services__heading">安全支付</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="accordion-container js-accordion-container for-application-js-container">
        <input id="tab-one"
               type="checkbox"
               name="tabs"
               checked="checked"
               class="js-accordion-input"
               data-text-color="#242729"
               data-bg-color="#FFFFFF" />
        <label for="tab-one"
               class="js-float-left-accordion js-accordion-label js-application-view accordion-container__label--padded">使用方法</label>
        <div class="accordion-container__tab">
          <div>
            <section id="application"
                     class="pdp-section pdp-section--application-animated js-pdp-section-application accordion-container__tab-content js-product-application-image" :style="`background-color:#FFFFFF;background-image: url('${mainImg1}');`">
              <div class="pdp-section__content product-application js-video-started">
                <a name="product-application"
                   class="visually-hidden"></a>
                <div class="product-application__container">
                  <div class="product-application__col product-application__description">
                    <h3 class="product-application__h title-big">使用方法</h3>
                    <div class="js-cat-tabs-desc cat-tabs-desc product-accordion-desc">
                      <p class="product-application__p text-normal">{{usageDes}}</p>
                    </div>
                    <div class="product-application__button  js-cat-tabs-more text-hidden tabs-toggle-text tabs-read-more"
                         style='background-color:#FFFFFF;box-shadow: 0 0 110px 30px #FFFFFF;color:#242729;'>
                      <span class="tabs-toggle-label js-cat-tabs-toggle-label"
                            data-less="收起"
                            data-more="了解更多">
                        了解更多
                      </span>
                      <span class="icon icon-chevron-down"></span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <input id="tab-two"
               type="checkbox"
               name="tabs"
               class="js-accordion-input"
               data-text-color="#242729"
               data-bg-color="#FFFFFF">
        <label for="tab-two"
               class="js-accordion-label accordion-container__label-science">科技</label>
        <div class="accordion-container__tab">
          <a name="product-science-section"
             class="visually-hidden"></a>
          <section id="scienceSection"
                   class="pdp-section pdp-section--premierscience js-pdp-section-science accordion-container__tab-content" :style="`background-color:#FFFFFF;background-image: url('${mainImg2}');`">
            <div class="product-premierscience__container js-video-started">
              <h3 class="productsciencecomp__h title-big science-scroll">科技</h3>
              <div class="productsciencecomp__content body-text js-science-background-image">
                <div class="productsciencecomp__text-container pdp-space-fix js-cat-tabs-desc cat-tabs-desc product-accordion-desc">
                  <div class="productsciencecomp__text text-normal">
                    <p class="product-science__p">{{techDes}}</p>
                  </div>
                </div>
                <div class="product-application__button  js-cat-tabs-more text-hidden tabs-toggle-text tabs-read-more"
                     style="color: #242729">
                  <span class="tabs-toggle-label js-cat-tabs-toggle-label"
                        data-less="收起"
                        data-more="了解更多">
                    了解更多
                  </span>
                  <span class="icon icon-chevron-down"></span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div class="sticky-indicator"></div>
      <section class="pdp-section sticky-add-to-bag js-sticky-add-to-bag">
        <div class="sticky-add-to-bag__container js-sticky-add-to-bag-container">
          <div class="sticky-add-to-bag__info">
            <img class="sticky-add-to-bag__image"
                 :src="thumbnail" />
            <div class="sticky-add-to-bag__text">
              <h2 class="sticky-add-to-bag__collection-title">{{productName}}</h2>
              <h2 class="sticky-add-to-bag__name">{{productNameEn}}</h2>
            </div>
          </div>
          <div class="sticky-add-to-bag__actions product-detail product-content">
            <div class="sticky-add-to-bag__actions-text">
              <div class="sticky-add-to-bag__price js-sticky-add-to-bag-price">
                <div class="product-price product-shopping__price">
                  <span class="price-sales price-sales-upper">
                    <template v-if="sale_price">¥ {{sale_price}}<del>¥ {{price}}</del></template>
                    <template v-else>¥ {{price}}</template>   
                    <span class="hidden js-product-price"
                          :data-price="price"></span>
                  </span>
                </div>
              </div>
              <div class="sticky-add-to-bag__size">
                <span class="js-sticky-add-to-bag-size">{{specifications}}</span>
              </div>
            </div>
            <div class="sticky-add-to-bag__form_container">
              <button id="sticky-add-to-cart"
                      type="submit"
                      title=""
                      value="添加至购物车"
                      class="button-fancy-large add-to-cart button--secondary" @click="addToCart">
                添加至购物车
              </button>
              <div class="overqty-error error js-qty-error"><span></span></div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loadingTips, removeLoading } from '../util/util';
import axios from "~/plugins/axios";
import { mapState, mapMutations } from 'vuex'
import { getShoppingCartData, addShoppingCart } from "~/api/cart";
import { getWishList, addToWishlist } from "~/api/wish";
export default {
  components: { Header, Footer },
  async asyncData (context) {
    let productData  = await axios.get(`/api/product/${context.route.query.slug}`)
    console.log('productData', productData)
    return {
      categorySlug: productData.data.data.product_category.slug,
      productBanner: productData.data.data.product_category.describe_img,
      benefitBanner: productData.data.data.benefit_image,
      benefit: productData.data.data.benefit,
      descript: productData.data.data.description,
      shortDescript: productData.data.data.short_description,
      productName: productData.data.data.product_name,
      productNameEn: productData.data.data.product_name_en,
      styleName: productData.data.data.product_category.name,
      specifications: productData.data.data.spec,
      sale_price: productData.data.data.sale_price,
      price: productData.data.data.price,
      thumbnail: productData.data.data.thumbnail,
      mainImg1: productData.data.data.main_image,
      mainImg2: productData.data.data.main_image_2,
      usageDes: productData.data.data.usage,
      techDes: productData.data.data.tech_description,
      product_id: productData.data.data.id
    }
  },
  data () {
    return {
        slug:this.$route.query.slug,
        categorySlug: null,
        productBanner: null,
        benefit:null,
        benefitBanner: null,
        descript:null,
        shortDescript: null,
        productName: null,
        productNameEn: null,
        styleName: null,
        specifications: null,
        sale_price: null,
        price: null,
        thumbnail: null,
        mainImg1: null,
        mainImg2: null,
        usageDes: null,
        techDes: null,
        product_id: null
    };
  },
  created () { },
  mounted () {
   },
  methods: {
    ...mapMutations({
      setCartInfo: 'SET_CART_INFO',
      setWishInfo: 'SET_WISH_INFO'
    }),
    getShoppingCart() {
      getShoppingCartData()
      .then(res => {
        if (res.data.code === 20001) {
          this.setCartInfo(res.data.data)
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      });
    },
    addToCart:function() {
      var formData = {
        product_list:[{product_id:this.product_id}]
      }
      addShoppingCart(formData)
      .then(res => {
        if (res.data.code === 20001) {
          this.getShoppingCart();
          this.$message({
            message: "成功添加到购物车",
            type: 'success'
          });
        } else if (res.data.code === 10001) {
          this.$message({
            message: '此商品已在您购物车',
            type: 'error'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      });
    },
    getTotalWish() {
      getWishList()
      .then(res => {
        if (res.data.code === 20001) {
          this.setWishInfo(res.data.data)
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      });
    },
    handleAddToWishlist() {
      const formData = {
        product_id: this.product_id
      }
      addToWishlist(formData)
      .then(res => {
        const { code, msg } = res.data;
        if (code === 20001) {
          this.getTotalWish();
          this.$message({
            message: "成功添加到心愿单",
            type: 'success'
          });
        } else if (code === 10001) {
          this.$message({
            message: '此商品已在您的愿望清单',
            type: 'error'
          })
        } else {
          this.$message({
            message: msg,
            type: 'error'
          });
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.regime__title-container,.sticky-add-to-bag__text h2,.js-accordion-container .js-accordion-label{
  color: #fff!important;
}
.accordion-container input[type="checkbox"]+label:before {
    background-image: url(/image/plus-icon.svg)!important;
}
.product-title, .product-price, .product-description, .product-form, .product-wishlist{
  margin-bottom: 0;
}
.sticky-add-to-bag__actions-text{
  padding-right: 2rem!important;
}
/deep/.hero-slider-follower{
  z-index: 4;
}
</style>
