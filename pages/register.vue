<template>
  <div>
    <Header></Header>
    <main class="main-content">
      <div class="white-layout">
        <div class="container section-t-space section-b-space">
          <div class="row justify-content-center">
            <div class="col-12">
              <h1 class="text-dark title">注册</h1>
            </div>
            <div class="col-12 col-lg-9">
              <div class="small-section signin-form-wrapper">
                <form class="needs-validation"
                      id="registerForm">
                  <div class="form-group">
                    <label for="name"
                           class="tx-dark-gray">姓名 *</label>
                    <input type="text"
                           name="name"
                           class="form-control border-dark"
                           id="name"
                           required="">
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="form-group">
                    <label for="username"
                           class="tx-dark-gray">用户名 *</label>
                    <input type="text"
                           name="username"
                           class="form-control border-dark"
                           id="username"
                           required="">
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="form-group">
                    <label for="password"
                           class="tx-dark-gray">密码 *</label>
                    <input type="password"
                           name="password"
                           class="form-control border-dark"
                           id="password"
                           required="">
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="form-group">
                    <label for="confirm_password"
                           class="tx-dark-gray">确认密码 *</label>
                    <input type="password"
                           name="password_confirmation"
                           class="form-control border-dark"
                           id="confirm_password"
                           required="">
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="form-group">
                    <label for="password_question_id"
                           class="tx-dark-gray">密保问题 *</label>
                    <select name="password_question_id"
                            class="form-control border-dark"
                            id="password_question_id"
                            required="">
                      <option value="">请选择</option>
                      <option v-for="(item,index) in questionOption"
                              :key="index"
                              :value="item.id">{{item.question}}</option>
                    </select>
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="form-group">
                    <label for="password_answer"
                           class="tx-dark-gray">密保问题答案 *</label>
                    <input type="text"
                           name="password_answer"
                           class="form-control border-dark"
                           id="password_answer"
                           required="">
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="form-group">
                    <label for="captcha_code"
                           class="tx-dark-gray">验证码 *</label>
                    <div class="input-group">
                      <input type="text"
                             name="captcha_code"
                             id="captcha_code"
                             class="form-control border-dark"
                             required="">
                      <div class="input-group-append border border-dark">
                        <span><img :src="captchaImage"
                               class="img-fluid img-captcha"
                               @click="getCaptchas"></span>
                      </div>
                    </div>
                  </div>
                  <div class="form-group form-check">
                    <input type="checkbox"
                           name="agreement"
                           class="form-check-input"
                           id="agreement"
                           required="">
                    <label class="form-check-label"
                           for="agreement">本人已经阅读、理解并同意我的个人信息按照<a href="/privacy-policy"
                         target="_blank">隐私政策</a>的规定被收集、使用和披露，包括海外传输，并且我同意我对本网站的使用将遵守<a href="/terms-and-conditions"
                         target="_blank">条款和条件</a>。
                    </label>
                    <div class="invalid-feedback"></div>
                  </div>
                  <div>
                    <button type="submit"
                            class="btn btn-solid">创建账户</button>
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
import axios from "~/plugins/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loginRequest, loadingTips, removeLoading } from '../util/util';
export default {
  components: { Header, Footer },
  data () {
    return {
      questionOption: [],
      captchaImage: null,
      captcha_key: null,
      registerState: false

    };
  },
  created () { },
  mounted () {
    var that = this
    this.getQuestionOption()
    this.getCaptchas()
    if (this.registerState) {
      that.$message({
        message: "注册中，请勿重复提交",
        type: 'error'
      });
    } else {
      $("#registerForm").validate({
        submitHandler: function (form) {
          loadingTips("注册中。。。")
          that.registerState = true
          axios.post(`/api/auth/register`, {
            name: $("#name").val(),
            username: $("#username").val(),
            password: $("#password").val(),
            password_confirmation: $("#confirm_password").val(),
            captcha_key: that.captcha_key,
            captcha_code: $("#captcha_code").val(),
            password_question_id: $("#password_question_id").val(),
            password_answer: $("#password_answer").val()
          })
            .then(res => {
              if (res.data.code === 20001) {
                removeLoading()
                that.$message({
                  message: "注册成功",
                  type: 'success'
                });
                setTimeout(() => {
                  window.location.href = '/login'
                }, 300);
              } else {
                removeLoading()
                that.registerState = false
                that.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            })
            .catch(e => {
              removeLoading()
              that.registerState = false
              that.$message({
                message: '页面异常，请稍后刷新再试',
                type: 'error'
              });
            });
        }
      })
    }
  },
  methods: {
    getQuestionOption: function () {
      var that = this
      return axios.get(`/api/question_list`)
        .then((res) => {
          if (res.data.code === 20001) {
            that.questionOption = res.data.data
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
    getCaptchas: function () {
      var that = this
      return axios.post(`/api/captchas`)
        .then((res) => {
          console.log(res)
          if (res.data.code === 20001) {
            that.captchaImage = res.data.data.captcha_image_content
            that.captcha_key = res.data.data.captcha_key
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

    }
  },
};
</script>

<style lang="scss" scoped>
/deep/.form-group {
  #captcha_code-error {
    position: absolute;
    bottom: -18px;
    left: 0;
  }
}
/deep/.form-check {
  padding-top: 0.5rem;
  .form-check-input {
    &.error {
      & + #agreement-error {
        & + .form-check-label {
          color: #dc3545;
        }
      }
    }
  }
  #agreement-error {
    display: none !important;
  }
}
</style>
