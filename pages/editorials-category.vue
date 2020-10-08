<template>
  <div>
    <Header></Header>
    <div class="edition-artist-banner js-the-house-header js-secondary-header">
      <div class="back-to-house-link">
        <!-- <a href="/editorials-category" class="back-to-house"> -->
        <a href="javascript:;" class="back-to-house" @click="back">
          <span class="icon icon-chevron-left" aria-hidden="true"></span>
          <span class="back-to-house-text">the House</span>
        </a>
      </div>
      <div class="edition-artist-tabs editorials__desktop-nav">
        <!-- <a class="the-house-navigation-tab" href="javascript:;" v-for="(item,index) in CategoryData" :key="index" :data-slug="item.slug"
            @click="handleSearch(item)">{{item.name}}</a> -->
        <!--<a class="the-house-navigation-tab active"-->
        <!--href="/cn/editorials-category?fdid=savoir-faire">精湛科艺</a>-->
        <!--<a class="the-house-navigation-tab"-->
        <!--href="/cn/editorials-category?fdid=art-architecture">艺术与建筑</a>-->
        <!--<a class="the-house-navigation-tab"-->
        <!--href="/cn/editorials-category?fdid=rituals">护肤仪典</a>-->
        <!--<a class="the-house-navigation-tab"-->
        <!--href="/cn/editorials-category?fdid=innovations">创新</a>-->
      </div>
      <div class="editorials__mobile-nav">
        <div
          class="editorials__mobile-nav-header-container js-editorials-mobile-nav"
        >
          <div class="editorials__mobile-nav-header">
            <span class="editorials__selected-title">报道：&nbsp;</span>
            <span class="editorials__selected-category">savoir-faire</span>
          </div>
          <span
            class="icon icon-chevron-down header-icon"
            aria-hidden="true"
          ></span>
        </div>
        <nav
          class="editorials__mobile-nav-content js-editorials-mobile-nav-content"
        >
          <ul>
            <li class="editorials__mobile-nav-link">
              <a
                class="the-house-navigation-tab"
                @click="handleSearch(item)"
                v-for="(item, index) in CategoryData"
                :key="index"
                :data-slug="item.slug"
                >{{ item.name }}</a
              >
            </li>
            <!--<li class="editorials__mobile-nav-link">-->
            <!--<a class="the-house-navigation-tab active"-->
            <!--href="/cn/editorials-category?fdid=savoir-faire">精湛科艺</a>-->
            <!--</li>-->
            <!--<li class="editorials__mobile-nav-link">-->
            <!--<a class="the-house-navigation-tab"-->
            <!--href="/cn/editorials-category?fdid=art-architecture">艺术与建筑</a>-->
            <!--</li>-->
            <!--<li class="editorials__mobile-nav-link">-->
            <!--<a class="the-house-navigation-tab"-->
            <!--href="/cn/editorials-category?fdid=rituals">护肤仪典</a>-->
            <!--</li>-->
            <!--<li class="editorials__mobile-nav-link">-->
            <!--<a class="the-house-navigation-tab"-->
            <!--href="/cn/editorials-category?fdid=innovations">创新</a>-->
            <!--</li>-->
          </ul>
        </nav>
      </div>
    </div>
    <div id="main" role="main" class="the-house-main page-content">
      <div id="browser-check">
        <noscript>
          <div class="browser-compatibility-alert">
            <p class="browser-error">
              您浏览器的 Javascript
              功能已关闭。请将其打开，以便您可以体验本网站的全部功能。
            </p>
          </div>
        </noscript>
      </div>
      <!-- <div class="editorials__article-title">
        {{currentName.name}}
      </div> -->
      <template v-if="searchContent.length > 0">
        <!-- <div class="first-head-thumbnail">
          <a
            :href="`/editorials-article?slug=${searchContent[0].slug}&name=${currentName.name}&slugName=${currentName.slug}`"
            class="editorials__article-thumbnail-link"
            @click="getArctile(searchContent[0])"
            :style="`background-image: url('${searchContent[0].banner}');`"
          >
            <div
              class="editorials__article-thumbnail-image js-hero-thumb-image"
            ></div>
            <div class="editorials__article-thimbnail-text-container">
              <div class="editorials__article-thumbnail-title-text">
                <h3 class="editorials__article-thumbnail-h title-big">
                  {{ searchContent[0].title }}
                </h3>
              </div>
              <div class="editorials__article-thumbnail-teaser-text">
                <p class="editorials__article-thumbnail-p">
                  {{ searchContent[0].sub_title }}
                </p>
              </div>
            </div>
          </a>
        </div> -->

        <div class="editorials editorials__landing-hero">
          <a
            :href="`/editorials-article?slug=${searchContent[0].slug}&name=${currentName.name}&slugName=${currentName.slug}`"
            class="editorials__hero-link"
          >
            <div class="hero-component">
              <div class="hero-component__image-gradient"></div>
              <div
                class="hero-component__image js-hero-component-image"
                :style="`background-image: url('${searchContent[0].banner}');`"
              >
                <div class="hero-component__content">
                  <div class="hero-component__text">
                    <div class="hero-component__title-text">
                      <h3 class="hero-component__h title-big title-big--thin">
                        {{ searchContent[0].title }}
                      </h3>
                    </div>
                    <div class="hero-component__teaser-text">
                      <p class="hero-component__p">
                        {{ searchContent[0].sub_title }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </template>
      <div
        class="editorials__article-thumbnails js-editorials-thumbnails-container js-category-landing"
      >
        <template v-if="searchContent.length > 0">
          <div class="editorials__thumbnails">
            <div
              class="editorials__thumbnail-container"
              v-for="(content, index) in searchContent"
              :key="index"
              v-show="index > 0"
            >
              <div class="editorials__thumbnail">
                <a
                  :href="`/editorials-article?slug=${content.slug}&name=${currentName.name}&slugName=${currentName.slug}`"
                  class="editorials__thumbnail-link"
                >
                  <div
                    class="editorials__thumbnail-image js-hero-thumb-image"
                    :style="`background-image: url('${content.banner}');`"
                  >
                    <div class="editorials__thumbnail-image-gradient"></div>
                  </div>
                  <div class="editorials__thumbnail-title-text">
                    <h3 class="editorials__thumbnail-h title-big">
                      {{ content.title }}
                    </h3>
                  </div>
                  <div class="editorials__thumbnail-teaser-text">
                    <p class="editorials__thumbnail-p">
                      {{ content.sub_title }}
                    </p>
                  </div>
                </a>
              </div>
              <a
                :href="`/editorials-article?slug=${content.slug}&name=${currentName.name}&slugName=${currentName.slug}`"
                class="editorials__thumbnail-parent-folder"
              >
                <span>{{ currentName.name }}</span>
                <span class="icon icon-chevron-right" aria-hidden="true"></span>
              </a>
            </div>
          </div>

          <!-- <div
            class="editorials__article-thumbnail-container js-editorial-thumbnail"
            v-for="(content, index) in searchContent"
            :key="index"
            v-show="index > 0"
          >
            <div class="editorials__article-thumbnail">
              <a
                :href="`/editorials-article?slug=${content.slug}&name=${currentName.name}&slugName=${currentName.slug}`"
                class="editorials__article-thumbnail-link"
                @click="getArctile(content)"
                :style="`background-image: url('${content.banner}');`"
              >
                <div
                  class="editorials__article-thumbnail-image js-hero-thumb-image"
                ></div>
                <div class="editorials__article-thimbnail-text-container">
                  <div class="editorials__article-thumbnail-parent-folder">
                    {{ currentName.name }}
                  </div>
                  <div class="editorials__article-thumbnail-title-text">
                    <h3 class="editorials__article-thumbnail-h title-big">
                      {{ content.title }}
                    </h3>
                  </div>
                  <div class="editorials__article-thumbnail-teaser-text">
                    <p class="editorials__article-thumbnail-p">
                      {{ content.sub_title }}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div> -->
        </template>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "~/plugins/axios";
import { loadingTips, removeLoading } from "../util/util";
import { mapMutations } from 'vuex'
export default {
  components: { Header, Footer },
  data() {
    return {
      id: "",
      CategoryData: [],
      searchContent: [],
      currentName: {},
    };
  },
  watch: {
    // 监听路由变化，如果变化则根据最新路由重新获取数据
    '$route' (to, from) {
      if(to.query.slug !== from.query.slug) {
        this.getCategory();
        this.currentName.slug = this.$route.query.slug;
        this.currentName.name = this.$route.query.name;
        if (this.currentName.slug != undefined) {
          this.handleSearch(this.currentName);
        }
        this.setNavigatState(false);
        this.setOverState(false);
      }
    } 
  },
  created() {
    this.getCategory();
    this.currentName.slug = this.$route.query.slug;
    this.currentName.name = this.$route.query.name;
    if (this.currentName.slug != undefined) {
      this.handleSearch(this.currentName);
    }
  },
  mounted() {},
  methods: {
    ...mapMutations({
      setNavigatState: "SET_NAVIGAT_STATE",
      setOverState: "SET_OVER_STATE"
    }),
    back: function () {
      this.$router.go(-1);
    },
    getCategory: async function () {
      var that = this;
      return await axios
        .get(`/api/the_house/category`)
        .then((res) => {
          if (res.data.code === 20001) {
            that.CategoryData = res.data.data;
            if (this.currentName.slug == undefined) {
              that.handleSearch(that.CategoryData[0]);
            }
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
    handleSearch: async function (item) {
      loadingTips();
      var that = this;
      that.currentName = item;
      return await axios
        .get(`/api/the_house/category/` + item.slug)
        .then((res) => {
          if (res.data.code === 20001) {
            that.searchContent = res.data.data.the_houses;
            removeLoading();
          } else {
            removeLoading();
            setTimeout(() => {
              that.$message({
                message: res.data.msg,
                type: "error",
              });
            }, 300);
          }
        })
        .catch((e) => {
          removeLoading();
          setTimeout(() => {
            that.$message({
              message: "页面异常，请稍后刷新再试",
              type: "error",
            });
          }, 300);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.editorials__hero-link {
  display: block;
}

.editorials .hero-component {
  position: relative;
}

.editorials .hero-component__image {
  background-size: cover;
  background-position: 50%;
}

@media screen and (min-width: 85.375rem) {
  .editorials .hero-component__content,
  .editorials .hero-component__image {
    min-height: 480px;
  }
}

@media screen and (min-width: 48rem) {
  .editorials .hero-component__content,
  .editorials .hero-component__image {
    min-height: 550px;
  }
}

.editorials .hero-component__content,
.editorials .hero-component__image {
  min-height: 400px;
  padding: 0;
}

@media screen and (min-width: 85.375rem) {
  .editorials .hero-component__content,
  .editorials .hero-component__image {
    min-height: 480px;
  }
}

@media screen and (min-width: 64rem) {
  .hero-component__image {
    background-position: 50% 50%;
    min-height: 80vh;
  }
}

@media screen and (min-width: 48rem) {
  .hero-component__image {
    background-size: cover;
  }
}

.hero-component__image {
  background-color: #000;
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  min-height: 65vh;
}

@media screen and (min-width: 85.375rem) {
  .editorials .hero-component__content {
    max-width: 643px;
  }
}

@media screen and (min-width: 48rem) {
  .editorials .hero-component__content {
    max-width: 488px;
  }
}

.editorials .hero-component__content {
  margin: 0 auto;
}

@media screen and (min-width: 85.375rem) {
  .editorials .hero-component__content,
  .editorials .hero-component__image {
    min-height: 480px;
  }
}

@media screen and (min-width: 48rem) {
  .editorials .hero-component__content,
  .editorials .hero-component__image {
    min-height: 550px;
  }
}

.editorials .hero-component__content,
.editorials .hero-component__image {
  min-height: 400px;
  padding: 0;
}

.hero-component__content {
  position: relative;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  padding: 90vw 0 0;
  text-align: center;
}

@media screen and (min-width: 48rem) {
  .hero-component__content[data-v-32ef0fb6] {
    padding: 80vw 1.25rem 0;
  }
}

@media screen and (min-width: 64rem) {
  .hero-component__content[data-v-32ef0fb6] {
    min-height: 65vh;
    padding: 5rem 0;
  }
}

@media screen and (min-width: 85.375rem) {
  .editorials .hero-component__text {
    bottom: 62px;
  }
}

@media screen and (min-width: 48rem) {
  .editorials .hero-component__text {
    padding: 0;
    bottom: 40px;
  }
}

.editorials .hero-component__text {
  top: auto;
  left: 0;
  right: 0;
  transform: none;
  bottom: 35px;
  position: absolute;
}

@media screen and (min-width: 64rem) {
  .hero-component__text {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
}

@media screen and (min-width: 85.375rem) {
  .editorials .hero-component__title-text .hero-component__h {
    font-size: 30px;
    font-size: 1.875rem;
    line-height: 36px;
  }
}

@media screen and (min-width: 48rem) {
  .editorials .hero-component__title-text .hero-component__h {
    font-size: 25px;
    font-size: 1.5625rem;
    line-height: 30px;
  }
}

.editorials .hero-component__title-text .hero-component__h {
  font-size: 22px;
  font-size: 1.375rem;
  line-height: 28px;
  font-family: Helvetica Neue LT W06_35 Thin, Helvetica Neue, Helvetica, Arial,
    sans-serif;
}

.hero-component__title-text .hero-component__h {
  margin: 0;
  line-height: 1.35;
}

.first-head-thumbnail .editorials__article-thumbnail-link {
  position: relative;
  background-size: cover;
  background-position: 50%;
  background-color: #000;
  background-repeat: no-repeat;
  background-size: 100%;
  width: 100%;
  min-height: 65vh;
  padding: 0;
}

.first-head-thumbnail .editorials__article-thumbnail-h {
  font-size: 22px;
  font-size: 1.375rem;
  line-height: 28px;
  font-family: Helvetica Neue LT W06_35 Thin, Helvetica Neue, Helvetica, Arial,
    sans-serif;
}

@media screen and (min-width: 48rem) {
  .first-head-thumbnail .editorials__article-thumbnail-h {
    font-size: 25px;
    font-size: 1.5625rem;
    line-height: 30px;
  }
}

@media screen and (min-width: 85.375rem) {
  .first-head-thumbnail .editorials__article-thumbnail-h {
    font-size: 30px;
    font-size: 1.875rem;
    line-height: 36px;
  }
}

.first-head-thumbnail .editorials__article-thumbnail-teaser-text:before {
  margin: 1.125rem auto;
}

.first-head-thumbnail .editorials__article-thimbnail-text-container {
  position: absolute;
  bottom: 35px;
  left: 0;
}

.first-head-thumbnail .editorials__article-thumbnail-teaser-text {
  margin-bottom: 0;
}

@media screen and (min-width: 48rem) {
  .first-head-thumbnail .editorials__article-thimbnail-text-container {
    padding: 0;
    bottom: 40px;
  }
}

@media screen and (min-width: 85.375rem) {
  .first-head-thumbnail .editorials__article-thimbnail-text-container {
    bottom: 45px;
  }
}

.editorials__article-thumbnails {
  padding: 1.5625rem 0.9375rem 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

@media screen and (min-width: 48rem) {
  .editorials__article-thumbnails {
    padding: 1.5625rem 1.25rem 0;
  }
}

@media screen and (min-width: 85.375rem) {
  .editorials__article-thumbnails {
    padding: 1.25rem 3.3125rem 1.125rem;
  }
}

/** list模块css */
.editorials__thumbnails {
  padding: 1.5625rem 0.9375rem 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

@media screen and (min-width: 48rem) {
  .editorials__thumbnails {
    padding: 1.5625rem 1.25rem 0;
  }
}

@media screen and (min-width: 85.375rem) {
  .editorials__thumbnails {
    padding: 1.25rem 3.3125rem 1.125rem;
  }
}

.editorials__thumbnail-container {
  padding: 0 0 1.5625rem;
  width: 100%;
}
@media screen and (min-width: 48rem) {
  .editorials__thumbnail-container {
    padding: 0 0.625rem 1.5625rem;
    width: 50%;
  }
}

@media screen and (min-width: 85.375rem) {
  .editorials__thumbnail-container {
    width: 25%;
  }
}

.editorials__thumbnail {
  min-height: 281px;
  display: -ms-flexbox;
  display: flex;
}

@media screen and (min-width: 85.375rem) {
  .editorials__thumbnail {
    min-height: 286px;
  }
}

.editorials__thumbnail-link {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-line-pack: end;
  align-content: flex-end;
  position: relative;
  width: 100%;
  overflow: hidden;
  outline: none;
}

.editorials__thumbnail-image {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: cover;
  background-position: 50%;
  width: 100%;
  transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
}

.editorials__thumbnail-image-gradient {
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0.8;
  background: linear-gradient(180deg, rgba(5, 5, 7, 0.1), #030303);
}

.editorials__thumbnail-teaser-text,
.editorials__thumbnail-title-text {
  z-index: 1;
  width: 100%;
}

.hero-slide__content--left .hero-slide__title--sup,
.hero-slide__content--right .hero-slide__title--sup,
.title-big {
  font-size: 25px;
  font-size: 1.5625rem;
  line-height: 1.75rem;
  color: #fff;
}

@media screen and (min-width: 48rem) {
  .hero-slide__content--left .hero-slide__title--sup,
  .hero-slide__content--right .hero-slide__title--sup,
  .title-big {
    font-size: 34px;
    font-size: 2.125rem;
    line-height: 2.3125rem;
  }
}

.editorials__thumbnail-h {
  font-size: 18px;
  font-size: 1.125rem;
  line-height: 22px;
  margin: 0 0.9375rem;
  text-transform: uppercase;
  height: 21px;
  overflow: hidden;
}

@media screen and (min-width: 85.375rem) {
  .editorials__thumbnail-h {
    font-size: 15px;
    font-size: 0.9375rem;
    line-height: 18px;
    height: 36px;
  }
}

.editorials__thumbnail-teaser-text {
  margin-bottom: 2.1875rem;
}

.editorials__thumbnail-teaser-text,
.editorials__thumbnail-title-text {
  z-index: 1;
  width: 100%;
}

.editorials__thumbnail-teaser-text:before {
  border-top: 1px solid #969696;
  content: "";
  display: block;
  margin: 1.25rem auto 1.25rem 0.9375rem;
  width: 45px;
}

@media screen and (min-width: 48rem) {
  .editorials__thumbnail-teaser-text:before {
    margin: 0.9375rem auto 0.9375rem 0.9375rem;
  }
}

@media screen and (min-width: 85.375rem) {
  .editorials__thumbnail-teaser-text:before {
    margin: 1.1875rem auto 1.1875rem 0.9375rem;
  }
}

.editorials__thumbnail-p {
  font-size: 12px;
  font-size: 0.75rem;
  line-height: 18px;
  margin: 0 0.9375rem;
  text-transform: uppercase;
  height: 18px;
  overflow: hidden;
  color: #fff;
}

@media screen and (min-width: 85.375rem) {
  .editorials__thumbnail-p {
    font-size: 11px;
    font-size: 0.6875rem;
    line-height: 15px;
    height: 30px;
  }
}

.editorials__thumbnail-parent-folder {
  position: absolute;
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
}

@media screen and (min-width: 85.375rem) {
  .editorials__thumbnail-parent-folder {
    clip: auto;
    height: auto;
    margin: 0;
    overflow: visible;
    position: static;
    width: auto;
    display: block;
    text-align: right;
    text-transform: uppercase;
    color: #fff;
    font-size: 13px;
    font-size: 0.8125rem;
    line-height: 16px;
    padding: 0.9375rem;
    background-color: #242729;
  }
}

.editorials__thumbnail-parent-folder .icon {
  vertical-align: middle;
  padding-left: 0.625rem;
}

.editorials__thumbnail-parent-folder:hover {
  background-color: #292c2e;
}
</style>
