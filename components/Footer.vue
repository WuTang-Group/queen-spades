<template>
  <div class="hero-slider-follower footer-home">
    <div class="content-asset">
      <div class="online-services__container">
        <h2 class="online-services__title">官网服务</h2>
        <div class="online-services__tiles-container">
          <div class="online-services__tile">
            <div class="online-services__image">
              <img alt=""
                   src="/picture/delivery.svg" />
            </div>
            <div class="online-services__heading">臻品免邮配送</div>
            <div class="online-services__description">
              尊享免邮配送和 7 天内轻松退货服务
            </div>
          </div>
          <div class="online-services__tile">
            <div class="online-services__image">
              <img alt=""
                   src="/picture/Samples.svg" />
            </div>
            <div class="online-services__heading">精选试用礼遇</div>
            <div class="online-services__description">
              悦享全新产品和明星产品
            </div>
          </div>
          <div class="online-services__tile">
            <div class="online-services__image">
              <img alt=""
                   src="/picture/Gift.svg" />
            </div>
            <div class="online-services__heading">精致礼盒包装</div>
            <div class="online-services__description">奢享独特的购物体验</div>
          </div>
          <div class="online-services__tile">
            <div class="online-services__image">
              <img alt=""
                   src="/picture/Services_SecurePayment_60.svg" />
            </div>
            <div class="online-services__heading">无忧安全支付</div>
            <div class="online-services__description">安全的支付方式</div>
          </div>
        </div>
      </div>
    </div>
    <div class="pre-footer ">
      <div class="can-help-footer">
        <div class="content">
          <div class="content-asset">
            <h3 class="can-we-help">有什么可以帮您？</h3>
          </div>
          <div class="info">
            <p class="get-in-touch">请通过电邮联系我们。</p>
            <span class="phone-contact">
              <span class=" ">
                <nuxt-link to="/contact-us" class="contact"><span class="email-icon"></span>
                  联系我们</nuxt-link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer light-theme js-footer"
            role="contentinfo">
      <div class="footer__content">
        <div class="footer__content-list">
          <div class="content-asset">
            <div class="list nav">
              <p class="list-title">关于</p>
              <ul>
                <li v-for="(item,index) in footerCategoriesNav"
                 :key="index">
                 <nuxt-link :to="{path:'/skincare-overview',query:{type:item.type}}" class="footer__content-list-item">{{item.name}}</nuxt-link>
                </li>
                <li>
                  <nuxt-link class="footer__content-list-item" to="/the-house">The House</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="content-asset">
            <div class="list nav">
              <p class="list-title">支援</p>
              <ul>

                <li>
                  <nuxt-link to="/customer-service" class="footer__content-list-item">客服服务</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/terms-and-conditions#pay-for-shipping" class="footer__content-list-item">安全支付</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/shipping" class="footer__content-list-item">配送</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="content-asset">
            <div class="list nav">
              <p class="list-title">产品介绍</p>
              <ul>
                <li>
                  <nuxt-link class="footer__content-list-item" to="/the-house">公司品牌介绍</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="content-asset">
            <div class="list nav">
              <p class="list-title">法律</p>
              <ul>
                <li>
                  <nuxt-link to="/privacy-policy" class="footer__content-list-item">隐私政策</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/customer-care-privterms" class="footer__content-list-item">条款与条件</nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/privacy-policy?cookies=true" class="footer__content-list-item">Cookie政策</nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="sub-footer">
          
          <div class="footer__logo-copyright">
            <nuxt-link to="/" class="footer__logo"><span class="icon-laprairie"></span></nuxt-link>
            <div class="footer__copyright-text">
              <div class="content-asset">
                2020 LARAVEL - 版权所有
              </div>
            </div>
            <div class="footer__company-reg-number">
              <div class="reg-number-wrapper">
                <a href="javascript:;">
                  <img src="/picture/China_Commerce_Icon.png"
                       alt="null" />
                </a>
                <a href="javascript:;">ICP备案号：粤ICP备2020076281号</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#wrapper"
         class="btn-top-top js-to-top is-active has-mobile-chat">
        <span class="icon icon-chevron-up"
              aria-hidden="true"></span>
      </a>
    </footer>
    <div id="overlay">
      <span class="icon-cross overlay__close"></span>
      <div class="overlay__content"></div>
    </div>
    <script src="/js/common/jquery-2.1.1.min.js"
            type="text/javascript"></script>
    <script src="/js/common/jquery-ui.min.js"
            type="text/javascript"></script>
    <script src="/js/common/jquery.validate.min.js"
            type="text/javascript"></script>
    <script src="/js/initData.js"></script>
    <script src="/js/common/app.js"
            async=""
            defer=""></script>
    <script src="/js/common/location.js"></script>
    <script src="/js/common/district.js"></script>
  </div>
</template>

<script>
import axios from "~/plugins/axios";
export default {
  data () {
    return {
      footerCategoriesNav: []
    };
  },
  created () { 
  },
  mounted () {
    this.getFooterCategories() },
  methods: {
    getFooterCategories: async function () {
      var that = this
      return await axios.get(`/api/navbar/product_categories`)
        .then((res) => {
          if (res.data.code === 20001) {
            that.footerCategoriesNav = res.data.data
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        }).catch((e) => {
          this.$message({
            message: "页面异常，请稍后刷新再试",
            type: 'error'
          });
        })
    },
  }
};
</script>

<style lang="scss" scoped>
/deep/.footer {
  .list-title {
    width: 100%;
  }
  .list {
    ul {
      li {
        width: 100%;
      }
    }
  }
}
</style>
