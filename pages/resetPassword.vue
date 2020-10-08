<template>
  <div>
    <Header></Header>
    <main class="main-content">
      <div class="white-layout">
        <div class="container section-t-space section-b-space">
          <div class="row justify-content-center">
            <div class="col-12">
              <h1 class="text-dark title">重置密码</h1>
            </div>
            <div class="col-12 col-lg-9">
              <div class="small-section signin-form-wrapper">
                <form class="needs-validation" id="resetForm">
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
                  <div>
                    <button type="submit" class="btn btn-solid">重置密码</button>
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
import { loadingTips, removeLoading } from '../util/util';
export default {
  components: { Header, Footer },
  data () {
    return {
      questionOption: [],
      resetState: false

    };
  },
  created () { },
  mounted () {
    var that = this
    this.getQuestionOption()
    if (this.resetState) {
      that.$message({
        message: "密码重置中，请勿重复提交",
        type: 'error'
      });
    } else {
      $("#resetForm").validate({
        submitHandler: function (form) {
          loadingTips("密码重置中。。。")
          that.resetState = true
          axios.put(`/api/password_reset`, {
            username: $("#username").val(),
            password: $("#password").val(),
            password_confirmation: $("#confirm_password").val(),
            password_question_id: $("#password_question_id").val(),
            password_answer: $("#password_answer").val()
          })
            .then(res => {
              removeLoading()
              if (res.data.code === 20001) {
                that.$message({
                  message: "密码重置成功",
                  type: 'success'
                });
                setTimeout(() => {
                  window.location.href = '/login'
                }, 300);
              } else {
                that.resetState = false
                that.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }
            })
            .catch(e => {
              removeLoading()
              that.resetState = false
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
