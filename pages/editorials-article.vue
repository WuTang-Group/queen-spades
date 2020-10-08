<!--suppress ALL -->
<template>
  <div>
    <Header></Header>
    <div class="edition-artist-banner js-the-house-header js-secondary-header">
      <div class="back-to-house-link">
        <!-- <a href="/editorials-category"
           class="back-to-house"> -->
        <a href="javascript:;" class="back-to-house" @click="back">
          <span class="icon icon-chevron-left"
                aria-hidden="true"></span>
          <span class="back-to-house-text">the House</span>
        </a>
      </div>
      <div class="edition-artist-tabs editorials__desktop-nav">
        <a class="the-house-navigation-tab" :href="`/editorials-category?slug=${item.slug}&name=${curentname.name}`" v-for="(item,index) in CategoryData" :key="index" :data-slug="item.slug"
           >{{item.name}}</a>
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
        <div class="editorials__mobile-nav-header-container js-editorials-mobile-nav">
          <div class="editorials__mobile-nav-header">
            <span class="editorials__selected-title">报道：&nbsp;</span>
            <span class="editorials__selected-category">savoir-faire</span>
          </div>
          <span class="icon icon-chevron-down header-icon"
                aria-hidden="true"></span>
        </div>
        <nav class="editorials__mobile-nav-content js-editorials-mobile-nav-content">
          <ul>
            <li class="editorials__mobile-nav-link">
              <a class="the-house-navigation-tab"
                 href="/cn/editorials-all?fdid=the-house-editorials">所有报道</a>
            </li>
            <li class="editorials__mobile-nav-link">
              <a class="the-house-navigation-tab active"
                 href="/cn/editorials-category?fdid=savoir-faire">精湛科艺</a>
            </li>
            <li class="editorials__mobile-nav-link">
              <a class="the-house-navigation-tab"
                 href="/cn/editorials-category?fdid=art-architecture">艺术与建筑</a>
            </li>
            <li class="editorials__mobile-nav-link">
              <a class="the-house-navigation-tab"
                 href="/cn/editorials-category?fdid=rituals">护肤仪典</a>
            </li>
            <li class="editorials__mobile-nav-link">
              <a class="the-house-navigation-tab"
                 href="/cn/editorials-category?fdid=innovations">创新</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div id="main"
         role="main"
         class="the-house-main  page-content">
      <div id="browser-check">
        <noscript>
          <div class="browser-compatibility-alert">
            <p class="browser-error">您浏览器的 Javascript 功能已关闭。请将其打开，以便您可以体验本网站的全部功能。</p>
          </div>
        </noscript>
      </div>
      <div class="editorials__article"
           :style="`background-image: url('${(content.banner)}');`">
        <div class="editorials__article-hero-image js-article-hero-image"></div>
        <div class="editorials__article-content">
          <div class="editorials__article-container ">
            <div class="editorials__article-titles">
              <div class="editorials__article-main-title">{{curentname.name}}</div>
              <h3 class="editorials__article-h">{{content.title}}</h3>
              <div class="editorials__article-sub-title">{{content.sub_title}}</div>
            </div>
            <div class="editorials__article-centered">
              <p class="editorials__article-paragraph editorials__first-letter-large">{{content.describe}}</p>
              <!--<p class="editorials__article-paragraph">自 1735 年起，瑞士钟表公司宝珀始终致力于打造高品质杰作。它作为世界上最古老的腕表品牌之一，不断吸引着全球钟表收藏家的目光。两个多世纪以来，宝珀证明了创新与传统可以并存，并一次又一次重新定义整个制表业。宝珀时至今日仍坚持手工订制和标准流程，从不出产石英钟表或电子计时器。即便如此，或者说也许正因如此，品牌一直稳居制表业的先锋地位，足以成为后来者的标杆。</p>-->
            </div>
            <template v-for="(text,index) in content.the_house_contents">
            <div class="editorials__image-second" v-if="index%2 == 0">
               <div class="editorials__article-main-title">{{text.title}}</div>
                <div class="editorials__image-second-container">
                  <div class="editorials__image-second-text">
                    <p class="editorials__article-paragraph">{{text.content}}</p>
                  </div>
                  <div class="editorials__image-second-image"><img alt=""
                         class="editorials__image-tag"
                         :src="text.img" />
                    <div class="editorials__image-sub-text">{{text.img_desc}}</div>
                  </div>
                </div>
            </div>
            <div class="editorials__image-first" v-else>
              <div class="editorials__article-main-title">{{text.title}}</div>
              <div class="editorials__image-first-container">
                <div class="editorials__image-first-image"><img alt=""
                       class="editorials__image-tag" :src="text.img" />
                  <div class="editorials__image-sub-text">{{text.img_desc}}</div>
                </div>
                <div class="editorials__image-first-text">
                  {{text.content}}
                </div>
              </div>
            </div>
            </template>
            <!--<div class="editorials__image-second">-->
              <!--<div class="editorials__article-main-title">手工艺的创新</div>-->
              <!--<div class="editorials__image-second-container">-->
                <!--<div class="editorials__image-second-text">-->
                  <!--<p class="editorials__article-paragraph">宝珀善于平衡精致美观的设计和复杂的创新工艺，功力较其他高级制表品牌更胜一筹。鲜有如 Fifty Fathoms 潜水腕表这般的传世巨制：它冲破了海底探索的极限，因而深受专业潜水员、科学探险家、水下摄影师及世界各地的海军特种游泳队的喜爱，与品牌对海洋的无尽探索及保护的满怀热忱共鸣交织。</p>-->
                  <!--<p class="editorials__article-paragraph">Fifty Fathoms 腕表灵感源自1950年至1980年期间时任宝珀总裁的 Jean-Jacques Fiechter的想象世界。他对两件事充满热情：高级制表及探索海底奇观。</p>-->
                  <!--<p class="editorials__article-paragraph">从设计伊始，Fifty Fathoms 便考虑到专业用途：刻度清晰的单向旋转表圈；深色表盘与白色荧光刻度、指针形成鲜明对比，易于时间的读取；双重密封的表冠和特殊密闭的底盖巩固防水性能；还为自动上链机芯配备了防磁保护功能。在法国海军特种游泳队上校 Robert &ldquo;Bob&rdquo; Maloubier 和中尉 Claude Riffaud 的推进之下，Fifty Fathoms 为法国和美国海军所采用。并且，随着与世界级潜水员的持续合作，之后研发的型号可承受一千米深的水下环境。</p>-->
                <!--</div>-->
                <!--<div class="editorials__image-second-image"><img alt=""-->
                       <!--class="editorials__image-tag"-->
                       <!--src="https://www.laprairie.com.cn/on/demandware.static/-/Library-Sites-LaPrairieSharedLibrary/default/dw975b57dd/TheHouse/editorials/haute-horlogerie/image-4.jpg" />-->
                  <!--<div class="editorials__image-sub-text">传奇的 Fifty Fathoms Bathyscaphe 计时码表款式。图片来源：&copy;宝珀。</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="editorials__image-first">-->
              <!--<div class="editorials__article-main-title">创新的激情</div>-->
              <!--<div class="editorials__image-first-container">-->
                <!--<div class="editorials__image-first-image"><img alt=""-->
                       <!--class="editorials__image-tag"-->
                       <!--src="https://www.laprairie.com.cn/on/demandware.static/-/Library-Sites-LaPrairieSharedLibrary/default/dw82d9e9e5/TheHouse/editorials/haute-horlogerie/image-5.jpg" />-->
                  <!--<div class="editorials__image-sub-text">创新性 &ldquo;1735&rdquo; Grande Complication。图片来源：&copy;宝珀。</div>-->
                <!--</div>-->
                <!--<div class="editorials__image-first-text">-->
                  <!--<p class="editorials__article-paragraph">Fifty Fathoms 问世约四十年后，宝珀另一款杰作璀璨登场，那就是 1991 年推出的彼时工艺尤为复杂的自动上链腕表：&ldquo;1735&rdquo; Grande Complication，证明崇尚过去并不会浇灭创新的热情。这款腕表拥有一系列让人叹为观止的精密功能，包括一分钟陀飞轮调节器、带有出色月相显示的万年历、美妙的报时器、飞返计时码表等等。其准确度、前瞻性以及对细节的关注展现出设计和技术近乎奇迹般的结合，更特别的是，这些腕表是由一位工匠花费一年时间完成，全部由手工制作。</p>-->
                  <!--<p class="editorials__article-paragraph">诗人 Robert Burns 曾在《Tam o&rsquo;Shanter》中写到&ldquo;岁月不待人&rdquo;。尽管如此，宝珀及其创新腕表通过艺术美学、精湛工艺及对精确度的执着，无限接近着最初看似无法实现的目标。传统与创新并非对立，它们实则就像月球作用下潮起潮落的海水，融聚在一起缔造出开拓性的先锋之作，宛如海底深处的珍珠熠熠生辉。</p>-->
                  <!--<p class="editorials__article-paragraph">宝珀腕表的美感、声望及品质使品牌几个世纪以来长盛不衰。通过把创新和 <a href="https://www.laprairie.com.cn/cn/platinum-rare-collection">savoir-faire</a>  植入<a href="https://www.laprairie.com.cn/cn/cellular-life-lotion/95790-01294-07.html">匠艺</a>核心，保留传统的同时大胆展望未来，使品牌钟表成为真正的经典之作。</p>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!-- <div class="editorials__share light-theme">
              <div class="editorials__share-links">
                <div class="editorials__share-text">
                  分享此文章：
                </div>
                <div class="wechat-share editorials__share-link social-item__link"
                     data-url="https://www.laprairie.com.cn/cn/editorials-article?cid=haute-horlogerie">
                  <div class="qr-code hide"
                       href="https://www.laprairie.com.cn/cn/editorials-article?cid=haute-horlogerie">
                    <img src="https://qrickit.com/api/qr?d=https://www.laprairie.com.cn/cn/editorials-article?cid=haute-horlogerie"
                         alt="" />
                  </div>
                  <span aria-hidden="true"
                        class="icon social-item__icon icon-wechat"></span>
                </div>
                <a target="_blank"
                   class="editorials__share-link social-item__link"
                   href="https://service.weibo.com/share/share.php?url=https://www.laprairie.com.cn/cn/editorials-article?cid=haute-horlogerie">
                  <span aria-hidden="true"
                        class="icon social-item__icon icon-weibo"></span>
                </a>
              </div>
            </div> -->
          </div>
          <div class="editorials__more">
            <div class="editorials__article-main-title">
              其他报道
            </div>
            <div class="editorials__more-container js-article-more-editorials-carousel">
              <div class="editorials__article-thumbnail-container js-editorial-thumbnail" v-for="(other,index) in retext" :key="index">
                <div class="editorials__article-thumbnail">
                  <a :href="`/editorials-article?slug=${other.slug}&name=${curentname.name}&slugName=${curentname.slugname}`"
                     class="editorials__article-thumbnail-link">
                    <div class="editorials__article-thumbnail-image js-hero-thumb-image"
                         :style="`background-image: url('${(other.banner)}');`"></div>
                    <div class="editorials__article-thimbnail-text-container">
                      <div class="editorials__article-thumbnail-parent-folder">
                        精湛科艺
                      </div>
                      <div class="editorials__article-thumbnail-title-text">
                        <h3 class="editorials__article-thumbnail-h title-big">{{other.title}}</h3>
                      </div>
                      <div class="editorials__article-thumbnail-teaser-text">
                        <p class="editorials__article-thumbnail-p">{{other.sub_title}}</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <!--<div class="editorials__article-thumbnail-container js-editorial-thumbnail">-->
                <!--<div class="editorials__article-thumbnail">-->
                  <!--<a href="/cn/editorials-article?cid=secrets-of-murano-glass"-->
                     <!--class="editorials__article-thumbnail-link">-->
                    <!--<div class="editorials__article-thumbnail-image js-hero-thumb-image"-->
                         <!--style="background-image: url(https://www.laprairie.com.cn/on/demandware.static/-/Library-Sites-LaPrairieSharedLibrary/default/dw756b1e24/TheHouse/editorials/secrets-of-murano-glass/25-Murano-thumbnail.jpg)"></div>-->
                    <!--<div class="editorials__article-thimbnail-text-container">-->
                      <!--<div class="editorials__article-thumbnail-parent-folder">-->
                        <!--精湛科艺-->
                      <!--</div>-->
                      <!--<div class="editorials__article-thumbnail-title-text">-->
                        <!--<h3 class="editorials__article-thumbnail-h title-big">穆拉诺玻璃的秘密</h3>-->
                      <!--</div>-->
                      <!--<div class="editorials__article-thumbnail-teaser-text">-->
                        <!--<p class="editorials__article-thumbnail-p">一窥精湛工艺</p>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</a>-->
                <!--</div>-->
              <!--</div>-->
              <!--<div class="editorials__article-thumbnail-container js-editorial-thumbnail">-->
                <!--<div class="editorials__article-thumbnail">-->
                  <!--<a href="/cn/editorials-article?cid=hope-diamond"-->
                     <!--class="editorials__article-thumbnail-link">-->
                    <!--<div class="editorials__article-thumbnail-image js-hero-thumb-image"-->
                         <!--style="background-image: url(https://www.laprairie.com.cn/on/demandware.static/-/Library-Sites-LaPrairieSharedLibrary/default/dw824286b8/TheHouse/editorials/hope-diamond/24-Hope-Diamond-thumbnail.jpg)"></div>-->
                    <!--<div class="editorials__article-thimbnail-text-container">-->
                      <!--<div class="editorials__article-thumbnail-parent-folder">-->
                        <!--精湛科艺-->
                      <!--</div>-->
                      <!--<div class="editorials__article-thumbnail-title-text">-->
                        <!--<h3 class="editorials__article-thumbnail-h title-big">希望钻石</h3>-->
                      <!--</div>-->
                      <!--<div class="editorials__article-thumbnail-teaser-text">-->
                        <!--<p class="editorials__article-thumbnail-p">传奇魅宝的天然光华</p>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</a>-->
                <!--</div>-->
              <!--</div>-->
            </div>
            <button class="button button--icon-button slider__btn slider__btn--prev js-btn-prev editorials__left-button">
              <span class="icon icon-chevron-left"
                    aria-hidden="true"></span>
            </button>
            <button class="button button--icon-button slider__btn slider__btn--next js-btn-next editorials__right-button">
              <span class="icon icon-chevron-right"
                    aria-hidden="true"></span>
            </button>
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
export default {
  components: { Header, Footer },
  data () {
    return {
      curentname:{},
      category:"",
      CategoryData: [],
      content:{},
      retext:[]
    };
  },
  created () {
    this.curentname.slug = this.$route.query.slug;
    this.curentname.name = this.$route.query.name;
    this.curentname.slugname = this.$route.query.slugName;
    this.getCategory()
  },
  mounted () {
    //获取路由的id
    this.getArctile();
    this.getRecomend();
  },
  methods: {
    back: function () {
      this.$router.go(-1);
    },
    getCategory: async function () {
      var that = this
      return await axios.get(`/api/the_house/category`)
        .then((res) => {
          if (res.data.code === 20001) {
            that.CategoryData=res.data.data
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
        });
    },
    getArctile:async function () {
      let that = this
      return await axios.get(`/api/the_house/`+that.curentname.slug)
        .then((res) => {
          if (res.data.code === 20001) {
            that.content=res.data.data
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
        });
    },
    getRecomend: async function () {
      let that = this;
      return await axios.get(`/api/the_house/other/`+that.curentname.slugname)
        .then((res) => {
          if (res.data.code === 20001) {
            that.retext=res.data.data
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
        });
    }

  },
};
</script>

<style lang="scss" scoped>
  .editorials__article-paragraph{color: black}
</style>
