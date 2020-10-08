<template>
  <div>
    <Header></Header>
    <main class="main-content">
      <div class="white-layout">
        <div class="container section-t-space section-b-space">
          <div class="row justify-content-center">
            <div class="col-12">
              <h1 class="text-dark title">登录</h1>
            </div>
            <div class="col-12 col-lg-5">
              <div class="small-section signin-form-wrapper">
                <form class="needs-validation"
                      id="loginPageForm">
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
                           minlength="6"
                           required="">
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="form-group form-check d-flex justify-content-end">
                    <nuxt-link to="/resetPassword"
                                class="tx-dark-gray"
                                title="忘记密码？">忘记密码？</nuxt-link>
                  </div>
                  <div class="d-flex justify-content-between">
                    <button type="submit"
                            class="btn btn-solid">登录</button>
                    <label class="m-auto">或</label>
                    <a href="/register"
                       class="btn btn-outline">注册</a>
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
import { loginRequest } from '../util/util';
export default {
  components: { Header, Footer },
  data () {
    return {
    };
  },
  created () { },
  mounted () {
    $("#loginPageForm").validate({
      submitHandler: function (form) {
        var data = {
          username: $("#username").val(),
          password: $("#password").val()
        }
        loginRequest(data)
      }
    })
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
