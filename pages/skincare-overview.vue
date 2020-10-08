<template>
  <div v-if="productList.length > 0">
    <Header></Header>
    <div id="main"
         role="main"
         class=" page-content" 
         >
      <div id="category-landing-primary"
           class="category-landing-primary-content cat-details">
        <div class="category-landing-top explorecollection exploreclp premier-collection-page-v2">

          <div class="content-asset">
            <h1 class="exploreclp-title">珍奢护肤体验</h1>
            <p style="text-align: center;"><span style="font-size:18px;">探索满蕴臻稀成分的奢华护肤品</span></p>
          </div>

          <div class="exploreclp-component container"  v-for="item in productList" :key="item.id" >
            <div class="exploreclp-component left dark-theme"
                 :style="`background-image:url(${item.thumbnail})`"
                 :data-link="`/radiance-collection?type=${type}&slug=${slug=item.slug}`">
                 <!-- 这里不能改变形式 -->
              <a name="explore-cleansers-toners"
                 class="visually-hidden"></a>
              <div class="exploreclp-component__img js-teaser-image">
              </div>
              <div class="exploreclp-component__container js-section-container">
                <h2 class="exploreclp-component__title">{{item.title}}</h2>
                <h3 class="exploreclp-component__teaser-title heading heading--m js-section-text">{{item.sub_title}}</h3>
                <div class="exploreclp-component__cta">

                  <nuxt-link :to="{path:'/radiance-collection', query: {type:type,slug:item.slug}}"
                     class="button exploreclp-component__button button--transparant"
                     title="探索">探索</nuxt-link>
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
import { mapMutations } from 'vuex'
export default {
  components: { Header, Footer },
  data () {
    return {
      type: this.$route.query.type,
      productList:[],
      slug:""
    };
  },
  watch: {
    // 监听路由变化，如果变化则根据最新路由重新获取数据
    '$route' (to, from) {
      if(to.query.type !== from.query.type) {
        this.getOverview();
        this.setNavigatState(false);
        this.setOverState(false);
      }
    } 
  },
  created () {
    this.getOverview();
  },
  mounted () { },
  methods: {
    ...mapMutations({
      setNavigatState: "SET_NAVIGAT_STATE",
      setOverState: "SET_OVER_STATE"
    }),
    getOverview: async function() {
      var that = this
      return await axios.get(`/api/product_category/overview/`+this.$route.query.type)
        .then((res) => {
          if (res.data.code === 20001) {
            that.productList = res.data.data
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
  }
};
</script>

<style lang="scss" scoped>
  /deep/.exploreclp-title{
    color: #fff;
  }
  h1,h2,h3{color: white;}
</style>
