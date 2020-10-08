<template>
  <div>
    <Header></Header>
    <main class="main-content">
      <div class="dark-layout">
        <div class="container section-t-space">
          <div class="row justify-content-center">
            <div class="col-12">
              <h1 class="text-white title">联系我们</h1>
            </div>
            <div class="col-12 col-md-7 col-lg-6 section-t-space">
              <div class="small-section contact-us-wrapper">
                <h4 class="text-center text-white mb-5 lh-13">
                  我们随时为您服务。请将您的疑问发送给我们，并提供尽可能多的详细信息。
                </h4>
                <form class="needs-validation" action="">
                  <div class="form-group">
                    <label for="name"
                           class="tx-dark-gray">姓名 *</label>
                    <input type="text"
                           name="name"
                           class="form-control border-white bg-trans"
                           id="name"
                           v-model="contactInfo.name"
                           required>
                  </div>
                  <div class="form-group">
                    <label for="subject"
                           class="tx-dark-gray">主题 *</label>
                    <div class="form-check">
                      <input type="radio"
                             name="subject"
                             :value="1"
                             class="form-check-input"
                             id="orders"
                             v-model="contactInfo.type"
                             required>
                      <label class="form-check-label text-white"
                             for="orders">订单与退货</label>
                    </div>
                    <div class="form-check">
                      <input type="radio"
                             name="subject"
                             :value="2"
                             class="form-check-input"
                             id="enquiries"
                             v-model="contactInfo.type"
                             required>
                      <label class="form-check-label text-white"
                             for="enquiries">一般查询</label>
                    </div>
                    <div class="form-check">
                      <input type="radio"
                             name="subject"
                             :value="3"
                             class="form-check-input"
                             id="data"
                             v-model="contactInfo.type"
                             required>
                      <label class="form-check-label text-white"
                             for="data">隐私权和数据</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="order_number"
                           class="tx-dark-gray">订单编号（若相关）</label>
                    <input type="text"
                           name="order_number"
                           class="form-control border-white bg-trans"
                           v-model="contactInfo.order_no"
                           id="order_number">
                  </div>
                  <div class="form-group">
                    <label for="comment"
                           class="tx-dark-gray">评论或问题 *</label>
                    <textarea rows="10"
                              name="comment"
                              v-model="contactInfo.content"
                              class="form-control border-white bg-trans"></textarea>
                  </div>
                  <div class="form-group">
                    <label class="form-check-label d-block text-white smallFont">点击“提交”，即表示您同意我们的
                      <a href="/privacy-policy" target="_blank">隐私政策</a>
                    </label>
                  </div>
                  <div>
                    <button class="btn btn-white" @click="submitContactInfo">提交</button>
                  </div>
                </form>
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
import { saveContactInfo } from "~/api/contact";

export default {
  name: "Contact",
  components: { Header, Footer },
  data () {
    return {
      contactInfo: {
        name: '',
        type: 1,
        order_no: '',
        content: ''
      }
    };
  },
  created () { },
  mounted () { },
  methods: {
    // 提交联系信息
    submitContactInfo(event){
      const that = this
      
      // 阻止表单默认提交行为
      event.preventDefault();

      // 检查name是否为空
      if(!that.contactInfo.name.trim()) {
        that.$message({
          message: '请填写姓名',
          type: 'info'
        });

        return
      }

      // 检查content是否为空
      if(!that.contactInfo.content.trim()) {
        that.$message({
          message: '请填写评论或问题',
          type: 'info'
        });

        return
      }

      saveContactInfo(that.contactInfo).then(({data})=>{

        if(data.code === 20001) {
          that.$message({
            message: '提交信息成功，感谢您的反馈',
            type: 'success'
          });
          
          // 1s后返回首页
          setTimeout(()=>{
            this.$router.push('/')
          },1000)

        } else {
          that.$message({
            message: '提交信息失败',
            type: 'error'
          });
        }
      }).catch(err=>{
        that.$message({
          message: '提交信息失败',
          type: 'error'
        });
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.lh-13 {
  font-size: 16px;
  line-height: 1.65;
}
.small-section .form-control {
  color: #fff;
}
</style>
