<template>
  <div>
    <Header></Header>
    <main class="main-content">
      <div
        class="dark-layout the-house bg-cover"
        style="
          background-image: url(http://120.79.173.163:9100/assets/images/the-house-bg.png);
        "
      >
        <div class="section-t-space section-b-space position-relative">
          <div class="container position-relative">
            <div class="row text-center">
              <div class="col-12 text-center mb-5">
                <h1 class="text-white title tx-mont">The House</h1>
              </div>
            </div>
            <!-- <div class="d-flex d-lg-none the-house-flip-mobile">
              <div class="col-4">
                <img
                  src="http://120.79.173.163:9100/assets/images/the-house-1g.png"
                  class="img-fluid"
                />
              </div>
              <div class="col-4 flipped">
                <img
                  src="http://120.79.173.163:9100/assets/images/the-house-2g.png"
                  class="img-fluid"
                />
              </div>
              <div class="col-4">
                <img
                  src="http://120.79.173.163:9100/assets/images/the-house-3g.png"
                  class="img-fluid"
                />
              </div>
            </div>
            <div class="row the-house-flip-slider">
              <div
                class="col-12 col-lg-4 flip-container house-flip-main-container"
                v-for="(item, index) in CategoryData"
                :key="index"
              >
                <div class="the-house-content-wrapper rotate-left">
                  <img :src="`${item.banner}`" class="img-fluid" />
                  <div class="content">
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.title }}</p>
                    <nuxt-link
                      :to="{
                        path: '/editorials-category',
                        query: { slug: item.slug, name: item.name },
                      }"
                      data-category="the-essence"
                      class="btn btn-outline"
                      >探索</nuxt-link
                    >
                  </div>
                </div>
              </div>
            </div> -->
          </div>

          <div class="house-main-container">
            <div
              id="HouseCarousel"
              class="row the-house-container house-carousels"
            >
              <div
                :class="[
                  'col-md-4 heritage flip-container house-flip-main-container',
                  index === selectIndex ? '' : 'rotate-left',
                ]"
                v-for="(item, index) in CategoryData"
                :key="index"
                @mouseover="selectIndex = index"
              >
                <div class="flip-container-image">
                  <div class="flipper">
                    <div class="front">
                      <img
                        class="the-house-images"
                        :src="item.banner"
                        alt="heritage-image"
                      />
                    </div>
                  </div>
                </div>
                <div class="details-container">
                  <h3>{{ item.name }}</h3>
                  <p>{{ item.title }}</p>
                  <nuxt-link
                    :to="{
                      path: '/editorials-category',
                      query: { slug: item.slug, name: item.name },
                    }"
                    data-category="the-essence"
                    class="button button--transparant"
                    >探索</nuxt-link
                  >
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
import axios from "~/plugins/axios";
import { mapMutations } from 'vuex'
export default {
  components: { Header, Footer },
  data() {
    return {
      selectIndex: 1,
      CategoryData: [],
    };
  },
  created() {
    this.getCategory();
    this.setNavigatState(false);
    this.setOverState(false);
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setNavigatState: "SET_NAVIGAT_STATE",
      setOverState: "SET_OVER_STATE"
    }),
    getCategory: async function () {
      var that = this;
      return await axios
        .get(`/api/the_house/category`)
        .then((res) => {
          if (res.data.code === 20001) {
            var data = res.data.data;
            that.CategoryData = data.map((t, i) => {
              t.url =
                "http://120.79.173.163:9100/assets/images/the-house-" +
                (i + 1) +
                "g.png";
              return t;
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "error",
            });
          }
        })
        .catch((e) => {
          this.$message({
            message: "页面异常，请稍后刷新再试",
            type: "error",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.button--semi-transparant,
.button--transparant {
  background: 0 0;
  border: 1px solid #fff;
  color: #fff;
}

.button--semi-transparant:hover,
.button--transparant:hover {
  background: #fff;
  color: #000;
}
// .house-main-container {
//     display: -ms-flexbox;
//     display: flex;
// }

// .house-main-container .the-house-container {
//   z-index: 2;
// }

// @media screen and (min-width: 64.0625rem) {
//   .house-main-container .the-house-container {
//     max-width: 73.9%;
//     margin: 0 auto;
//     padding-top: 0.625rem;
//   }
// }

// @media (min-width: 768px) {
//   .col-md-4 {
//     float: left;
//     width: 33.33333%;
//   }
// }

// .house-main-container
//   .the-house-container
//   .flip-container
//   .flip-container-image {
//   perspective: 62.5rem;
// }

// .house-main-container
//   .the-house-container
//   .flip-container.rotate-left
//   .flipper {
//   transform: rotateY(25deg) scale(0.79);
// }

// @media screen and (min-width: 64.0625rem) {
//   .house-main-container .the-house-container .flip-container .flipper {
//     display: block;
//     transition: 0.6s;
//     transform-style: preserve-3d;
//     position: relative;
//     transform: scale(0.9);
//   }
// }

// .house-main-container .the-house-container .flip-container .flipper {
//   display: none;
// }

// .house-main-container .the-house-container .flip-container .flipper .front {
//   width: 100%;
//   transform: rotateY(0deg);
//   font-size: 0;
// }

// @media screen and (min-width: 85.375rem) {
//   .house-main-container .the-house-container .flip-container .flipper .front {
//     min-height: 440px;
//   }
// }

// .house-main-container
//   .the-house-container
//   .flip-container.rotate-left
//   .details-container,
// .house-main-container
//   .the-house-container
//   .flip-container.rotate-right
//   .details-container {
//   transform: translateX(0);
// }

// @media screen and (min-width: 64rem) {
//   .house-main-container
//     .the-house-container
//     .flip-container.rotate-left
//     .details-container {
//     left: 7%;
//   }
// }

// @media screen and (min-width: 85.375rem) {
//   .house-main-container
//     .the-house-container
//     .flip-container
//     .details-container {
//     bottom: 5.3%;
//   }
// }

// @media screen and (min-width: 64.0625rem) {
//   .house-main-container
//     .the-house-container
//     .flip-container
//     .details-container {
//     text-align: center;
//     width: 100%;
//     min-height: 175px;
//     position: absolute;
//     left: 50%;
//     transform: translateX(-50%);
//     bottom: 8%;
//   }
// }

// .house-main-container .details-container {
//   transition: 0.6s;
// }

// @media screen and (min-width: 85.375rem) {
//   .house-main-container
//     .the-house-container
//     .flip-container
//     .details-container
//     h3 {
//     margin: 0;
//   }
// }

// @media screen and (min-width: 48rem) {
//   .house-main-container
//     .the-house-container
//     .flip-container
//     .details-container
//     h3 {
//     font-size: 1.875rem;
//   }
// }

// .house-main-container
//   .the-house-container
//   .flip-container
//   .details-container
//   h3 {
//   font-size: 1.5625rem;
// }

// @media screen and (min-width: 64.0625rem) {
//   .house-main-container .the-house-container .flip-container.rotate-left h3 {
//     text-align: left;
//   }
// }

// @media screen and (min-width: 85.375rem) {
//   .house-main-container h3 {
//     font-size: 22px;
//   }
// }

// .house-main-container h3 {
//   font-family: Helvetica Neue LT W06_35 Thin, Helvetica Neue, Helvetica, Arial,
//     sans-serif;
//   font-size: 20px;
//   font-weight: 300;
//   line-height: 28px;
//   color: #fff;
//   letter-spacing: 0.125rem;
// }

// @media screen and (min-width: 64.0625rem) {
//   .house-main-container
//     .the-house-container
//     .flip-container.rotate-left
//     .details-container
//     a,
//   .house-main-container
//     .the-house-container
//     .flip-container.rotate-left
//     .details-container
//     p,
//   .house-main-container
//     .the-house-container
//     .flip-container.rotate-right
//     .details-container
//     a,
//   .house-main-container
//     .the-house-container
//     .flip-container.rotate-right
//     .details-container
//     p {
//     visibility: hidden;
//   }
// }

// .house-main-container .the-house-container .flip-container .details-container a,
// .house-main-container
//   .the-house-container
//   .flip-container
//   .details-container
//   p {
//   visibility: visible;
// }

// @media screen and (min-width: 64.0625rem) {
//   .house-main-container
//     .the-house-container
//     .flip-container
//     .details-container
//     p {
//     font-size: 0.9375rem;
//   }
// }

// .house-main-container
//   .the-house-container
//   .flip-container
//   .details-container
//   p {
//   margin-top: 0;
//   margin-bottom: 1.375rem;
// }

// @media screen and (min-width: 64.0625rem) {
//   .house-main-container .the-house-container .flip-container p {
//     width: 70%;
//   }
// }

// .house-main-container .the-house-container .flip-container p {
//   margin-left: auto;
//   margin-right: auto;
// }

// .house-main-container
//   .the-house-container
//   .flip-container
//   .details-container
//   .button {
//   min-width: 8.75rem;
//   margin-bottom: 0.9375rem;
//   text-transform: capitalize;
// }
</style>
