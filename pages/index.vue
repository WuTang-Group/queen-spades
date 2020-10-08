<template>
  <div>
    <Header></Header>
    <main id="main"
          class="main"
          role="main">
      <div class="homepage-content">
        <div class="homepage-top-hero">
          <div class="js-hero-slider">
            <div id="top-parallax-continer"
                 class="hero-slider__slide hero-slider js-slide top-hero--img left">
              <div class="js-blur-effect blur-effect-wrapper">
                <img v-if="homeData.length"
                     :src="homeData[0].banner.img"
                     class="bannerImg" />
              </div>
              <div class="hero-slide__content js-blur-effect hero-slide__content--left mobile-hero-slider no-hover-blur">
                <h2 class="hero-slider__title hero-slider__title--sup heading"
                    lang="en"
                    v-if="homeData.length>0&&homeData[0].banner.product">{{homeData[0].banner.product.product_name_en}}</h2>
                <!-- <span class="hero-slider__title hero-slider__title--main"
                      lang="en">EYE LIFT</span> -->
                <h3 class="hero-slider__dek"
                    v-if="homeData.length>0&&homeData[0].banner.product">{{homeData[0].banner.product.product_name}}</h3>
                <div class="hero-slider__buttons">
                  <nuxt-link v-if="homeData.length>0&&homeData[0].banner.product"
                             :to="{path:'/rapid-response-booster',query:{slug:homeData[0].banner.product.slug}}"
                             class="button button--semi-transparant"
                             title="即刻选购">即刻选购</nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div class="discover-tiles tiles-group">
            <div id="js-top-blur-bg"
                 class="top-blur-bg"></div>
            <ul class="discover-tile__tabs"></ul>

            <li class="discover-tile__tab"
                data-toggle="discover-tile-57f5112b5a5def42f257762ac3">艺述</li>
            <div id="discover-tile-57f5112b5a5def42f257762ac3"
                 class="discover-tile"
                 data-link="javascript:;">
              <a name="20200801-discover-collection-tile-1"
                 class="visually-hidden"></a>
              <div class="discover-tile__img-wrapper">
                <div class="discover-tile__img js-teaser-image"
                     v-if="homeData.length>0"
                     :style="`background-image: url('${(homeData[0].discover[0].img)}');`"></div>
              </div>
              <div class="discover-tile__container discover-tile__container-left">
                <h3 class="discover-tile__title">艺述</h3>
                <h4 class="discover-tile__subtitle"
                    lang="en"
                    v-if="homeData.length>0&&homeData[0].discover[0].product">{{homeData[0].discover[0].product.product_name}}</h4>
                <div class="discover-tile__cta">
                  <a href="javascript:;"
                     class="button button--secondary discover-tile__button button--transparant"
                     title="阅读更多"
                     @click="switchProductPage(homeData[0].discover[0])">阅读更多
                  </a>
                </div>
              </div>
            </div>

            <li class="discover-tile__tab"
                data-toggle="discover-tile-cd70915d9e604b12d9453056b3">体验</li>
            <div id="discover-tile-cd70915d9e604b12d9453056b3"
                 class="discover-tile"
                 data-link="javascript:;">
              <a name="20200801-discover-collection-tile-2"
                 class="visually-hidden"></a>
              <div class="discover-tile__img-wrapper">
                <div class="discover-tile__img js-teaser-image"
                     v-if="homeData.length>0"
                     :style="`background-image: url('${(homeData[0].discover[1].img)}');`"></div>
              </div>
              <div class="discover-tile__container discover-tile__container-right">
                <h3 class="discover-tile__title">体验</h3>
                <h4 class="discover-tile__subtitle"
                    lang="en"
                    v-if="homeData.length>0&&homeData[0].discover[1].product">{{homeData[0].discover[1].product.product_name}}</h4>
                <div class="discover-tile__cta">
                  <a href="javascript:;"
                     class="button discover-tile__button button--transparant"
                     title="探索"
                     @click="switchProductPage(homeData[0].discover[1])">
                     探索
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="homeData.length>0&&homeData[0].recommend_list.length>0" class="hero-slider homepage-middle-slot">
          <div class="tiles-group-title hero-slide__title--main">
            <h2>
              当月推荐
            </h2>
          </div>
          <div class="monthscuration-tiles tiles-group">
            <div v-for="(item,index) in homeData[0].recommend_list" :key="index" class="monthscuration-tile" :data-link="`/rapid-response-booster?slug=${item.product.slug}`">
              <div class="monthscuration-tile__img-wrapper">
                <div class="monthscuration-tile__img js-teaser-image" :style="`background-image: url('${(item.img)}');`"></div>
              </div>
              <div class="monthscuration-tile__container">
                <div>
                  <h3 class="monthscuration-tile__titles"><p class="monthscuration-tile__title title-big sub-tile-title">{{item.product.product_name_en}}</p></h3>
                  
                </div>
                <span class="monthscuration-tile__subtitle">{{item.product.product_name}}</span>
                <div class="monthscuration-tile__cta">

                  <nuxt-link :to="{path:'/rapid-response-booster',query:{slug:item.product.slug}}"
                             class="button monthscuration-tile__button button--transparant"
                             title="即刻选购">即刻选购</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hero-slider homepage-bottom-slot" v-if="homeData.length>0&&homeData[0].the_house.length>0">
          <div class="tiles-group-title hero-slide__title--main">
            <h2>THE HOUSE</h2>
          </div>
          <div id="js-slick"
               class="tiles-group thehouse-tiles">
            <div class="thehouse-tile slide"
                 :data-link="`/editorials-article?slug=${homeData[0].the_house[0].slug}&name=精湛科艺&slugName=quis-nemo`">
              <h3 class="thehouse-tile__title title-big js-tile-title">精湛科艺 </h3>
              <div class="thehouse-tile__img js-teaser-image" :style="`background-image: url('${(homeData[0].the_house[0].banner)}');`"></div>
              <div class="thehouse-tile__container">
                <h3 class="thehouse-tile__subtitle">{{homeData[0].the_house[0].title}}</h3>
                <div class="thehouse-tile__cta">
                  <a :href="`/editorials-article?slug=${homeData[0].the_house[0].slug}&name=精湛科艺&slugName=quis-nemo`"
                     class="button button--secondary thehouse-tile__button button--transparant"
                     title="阅读更多">阅读更多</a>
                </div>
              </div>
            </div>

            <div class="thehouse-tile slide"
                 :data-link="`/editorials-article?slug=${homeData[0].the_house[1].slug}&name=品牌介绍&slugName=est-exercitationem`">
              <h3 class="thehouse-tile__title title-big js-tile-title">品牌介绍 </h3>
              <div class="thehouse-tile__img js-teaser-image" :style="`background-image: url('${(homeData[0].the_house[1].banner)}');`"></div>
              <div class="thehouse-tile__container">
                <h3 class="thehouse-tile__subtitle">{{homeData[0].the_house[1].title}}</h3>
                <div class="thehouse-tile__cta">
                  <a :href="`/editorials-article?slug=${homeData[0].the_house[1].slug}&name=品牌介绍&slugName=est-exercitationem`"
                     class="button button--secondary thehouse-tile__button button--transparant"
                     title="阅读更多">阅读更多</a>
                </div>
              </div>
            </div>

            <div class="thehouse-tile slide"
                 :data-link="`/editorials-article?slug=${homeData[0].the_house[0].slug}&name=精彩内容&slugName=ut-excepturi`">
              <h3 class="thehouse-tile__title title-big js-tile-title">精彩内容</h3>
              <div class="thehouse-tile__img js-teaser-image" :style="`background-image: url('${(homeData[0].the_house[2].banner)}');`"></div>
              <div class="thehouse-tile__container">
                <h3 class="thehouse-tile__subtitle">{{homeData[0].the_house[2].title}}</h3>
                <div class="thehouse-tile__cta">
                  <a :href="`/editorials-article?slug=${homeData[0].the_house[0].slug}&name=精彩内容&slugName=ut-excepturi`"
                     class="link link-text thehouse-tile__button button--transparant btn"
                     title="阅读更多">阅读更多</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="homepage-drawer-handle">
          <div class="drawer-handle-bar"></div>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "~/plugins/axios";
export default {
  components: { Header, Footer },
  data () {
    return {
      homeData: []
    };
  },
  created () {
    this.getHomeInfo()
  },
  mounted () { },
  methods: {
    getHomeInfo: async function () {
      var that = this
      return await axios.get(`/api/home`)
        .then((res) => {
          // console.log(res.data.data);
          if (res.data.code === 20001) {
            console.log('data', res.data.data)
            that.homeData.push(res.data.data)
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

    switchProductPage(productInfo) {
      const that = this
      const slug = productInfo.product.slug
      this.$router.push({
        path:'/rapid-response-booster',
        query:{
          slug
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.discover-tile__container-left {
  left: -216px !important;
}

.discover-tile__container-right {
  right: -216px !important;
}

.bannerImg {
  width: 100%;
  max-height: 120%;
}
.hero-slider__dek {
  color: #fff;
}
</style>
