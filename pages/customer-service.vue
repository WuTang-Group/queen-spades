<template>
  <div>
    <Header></Header>
    <main class="main-content">
      <div class="dark-layout">
        <div class="container section-t-space">
          <div class="row justify-content-center">
            <div class="col-12 col-md-7 col-lg-6">
              <div class="small-section customer-service-wrapper">
                <div class="customer-service-title text-center">
                  <p class="mb-0">欢迎来到黑桃皇后</p>
                  <h1>客户服务</h1>
                </div>
                <div class="customer-service-content mt-5">
                  <p>如需咨询或帮助，请联系在线客服，或拨打客服电话。</p>
                  <p>服务时间： 9:00-21:00 （国定假日除外）</p>
                </div>
                <div class="customer-service-content mt-3">
                  <p>您也可以查询常见问题，查询订单详情、获取快递单号。</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center small-section customer-service-action">
            <div class="col-12 col-sm-4 col-md-3 col-lg-2">
              <img src="/image/contact.png"
                   class="img-fluid"
                   alt="">
              <a href="/contact-us">联系我们</a>
            </div>
            <div class="col-12 col-sm-4 col-md-3 col-lg-2">
              <img src="/image/hotline.png"
                   class="img-fluid"
                   alt="">
              <a href="#">客服热线</a>
            </div>
            <!-- <div class="col-12 col-sm-4 col-md-3 col-lg-2">
				<img src="assets/images/icon/tracking.png" class="img-fluid" alt="">
				<a href="tracking.php">追踪订单</a>
			</div> -->
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
export default {
  components: { Header, Footer },
  data () {
    return {};
  },
  created () { },
  mounted () { },
  methods: {},
};
</script>

<style lang="scss" scoped>
.customer-service-wrapper .customer-service-content p {
  font-size: 14px;
}
</style>
