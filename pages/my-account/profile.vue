<template>
  <div>
    <Header></Header>
    <main class="main-content">
      <div class="dark-layout">
        <div class="container section-t-space">
          <div class="row justify-content-center">
            <div class="col-12 d-md-flex align-items-center justify-content-between">
              <h1 class="text-white title">我的账号</h1>
              <div class="btn-group myacc-menu"
                   role="group">
                <a href="/my-account"
                   class="btn btn-outline btn-sm ">所有订单</a>
                <a href="/my-account/profile"
                   class="btn btn-outline btn-sm active">我的个人资料</a>
                <a href="javascript:void(0)"
                   class="btn btn-outline btn-sm"
                   @click="logout">登出</a>
              </div>
            </div>
            <div class="col-12 col-lg-9 section-t-space">
              <div class="small-section profile-wrapper">
                <ul class="profile-tab">
                  <li class="tabItem"
                      :class="profilteType===1?'active':''"
                      @click="profileTap(1)">我的个人资料</li>
                  <li class="tabItem"
                      :class="profilteType===2?'active':''"
                      @click="profileTap(2)">修改密码</li>
                </ul>
                <form v-show="profilteType===1"
                      class="needs-validation"
                      method="post"
                      id="userInfo"
                      novalidate>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="real_name"
                             class="tx-dark-gray">general.my-account.name</label>
                      <input type="text"
                             name="real_name"
                             class="form-control border-white bg-trans"
                             id="real_name"
                             v-model="userInfo.real_name"
                             required>
                      <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-group col-md-6">
                      <label for="phone"
                             class="tx-dark-gray">手机号 *</label>
                      <input type="text"
                             name="phone"
                             class="form-control border-white bg-trans"
                             id="phone"
                             v-model="userInfo.phone"
                             required>
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-12">
                      <label class="tx-dark-gray">生日日期 *</label>
                    </div>
                    <div class="form-group col-md-4">
                      <select data-year=""
                              name="year"
                              class="form-control border-white bg-trans"
                              id="year"
                              @change="changeDay"
                              required>
                        <option value="">请选择年</option>
                        <option v-for="(item,index) in calendar.yearOption"
                                :key="index"
                                :value ="item.value"
                                :selected="item.checked">{{item.value}}年</option>
                      </select>
                      <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-group col-md-4">
                      <select data-month=""
                              name="month"
                              class="form-control border-white bg-trans"
                              id="month"
                              @change="changeDay"
                              required>
                        <option value="">请选择月</option>
                        <option v-for="(item,index) in calendar.monthOption"
                                :key="index"
                                :value ="item.value"
                                :selected="item.checked">{{item.value}}月</option>
                      </select>
                      <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-group col-md-4">
                      <select data-day=""
                              name="day"
                              class="form-control border-white bg-trans"
                              id="day"
                              required>
                        <option value="">请选择日</option>
                        <option v-for="(item,index) in calendar.dayOption"
                                :key="index"
                                :value ="item.value"
                                :selected="item.checked">{{item.value}}日</option>
                      </select>
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="form-row"
                       data-toggle="distpicker">
                    <div class="form-group col-md-4">
                      <label for="province"
                             class="tx-dark-gray">省 *</label>
                      <select data-province=""
                              name="province"
                              class="form-control border-white bg-trans"
                              id="province"
                              @change="proviceChange"
                              required>
                        <option data-code=""
                                data-text="请选择"
                                value="">请选择</option>
                        <option v-for="(item,index) in provinceOption"
                                :key="index"
                                :data-code="item.value"
                                :data-text="item.label"
                                :value ="item.label"
                                :selected="item.checked">{{item.label}}</option>
                      </select>
                      <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="city"
                             class="tx-dark-gray">城市 *</label>
                      <select data-city=""
                              name="city"
                              class="form-control border-white bg-trans"
                              id="city"
                              @change="cityChange"
                              required>
                        <option data-code=""
                                data-text="请选择"
                                value="">请选择</option>
                        <option v-for="(item,index) in cityOption"
                                :key="index"
                                :data-code="item.value"
                                :data-text="item.label"
                                :value ="item.label"
                                :selected="item.checked">{{item.label}}</option>
                      </select>
                      <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="district"
                             class="tx-dark-gray">区 *</label>
                      <select data-district=""
                              name="district"
                              class="form-control border-white bg-trans"
                              id="district"
                              @change="districtChange"
                              required>
                        <option data-code=""
                                data-text="请选择"
                                value="">请选择</option>
                        <option v-for="(item,index) in areaOption"
                                :key="index"
                                :data-code="item.value"
                                :data-text="item.label"
                                :value ="item.label"
                                :selected="item.checked">{{item.label}}</option>
                      </select>
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-8">
                      <label for="address"
                             class="tx-dark-gray">地址 *</label>
                      <input type="text"
                             name="address"
                             class="form-control border-white bg-trans"
                             id="address"
                             v-model="userAddress.address"
                             required>
                      <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-group col-md-4">
                      <label for="zip"
                             class="tx-dark-gray">邮政编码 *</label>
                      <input type="text"
                             name="zip"
                             class="form-control border-white bg-trans"
                             id="zip"
                             v-model="userAddress.zip"
                             required>
                      <div class="invalid-feedback"></div>
                    </div>
                  </div>
                  <!-- <div class="form-group">
	                        <label for="country" class="tx-dark-gray">国家/地区 *</label>
	                        <input type="text" class="form-control border-white bg-trans" id="country">
	                    </div> -->
                  <div class="text-right">
                    <button type="submit"
                            class="btn btn-white">保存</button>
                  </div>
                </form>
                <form v-show="profilteType===2"
                      class="needs-validation"
                      method="post"
                      id="changePassword"
                      novalidate>
                  <div class="form-group">
                    <label for="old_password"
                           class="tx-dark-gray">当前密码 *</label>
                    <input type="password"
                           name="oldPassword"
                           class="form-control border-white bg-trans"
                           id="old_password"
                           required>
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="form-group">
                    <label for="password"
                           class="tx-dark-gray">新密码 *</label>
                    <input type="password"
                           name="newPassword"
                           class="form-control border-white bg-trans"
                           id="password"
                           required>
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="form-group">
                    <label for="confirm_password"
                           class="tx-dark-gray">确认密码 *</label>
                    <input type="password"
                           name="newPassword_confirmation"
                           class="form-control border-white bg-trans"
                           id="confirm_password"
                           required>
                    <div class="invalid-feedback"></div>
                  </div>
                  <div class="text-right">
                    <button type="submit"
                            class="btn btn-white">保存</button>
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
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { logoutRequest, loadingTips, removeLoading } from '../../util/util'
export default {
  components: { Header, Footer },
  data () {
    return {
      profilteType: 1,
      provinceOption: [],
      cityOption: [],
      areaOption: [],
      calendar: {
        yearOption: [],
        monthOption: [],
        dayOption: [],
      },
      userInfo: {
        real_name: null,
        birthday: null,
        phone: null
      },
      userAddress: {
        province: null,
        city: null,
        district: null,
        address: null,
        zip: null,
      }
    };
  },
  created () {
  },
  mounted () {
    var that = this;
    this.getUserData();
    $("#userInfo").validate({
      submitHandler: function (form) {
        loadingTips("保存中。。。")
        var yearsVal = $("#year").val()
        var monthVal = $("#month").val() < 10 ? "0" + $("#month").val() : $("#month").val()
        var dayVal = $("#day").val() < 10 ? "0" + $("#day").val() : $("#day").val()
        var birthdayVal = yearsVal + "-" + monthVal + "-" + dayVal
        axios.put(`/api/user_profile`, {
          phone: $("#phone").val(),
          real_name: $("#real_name").val(),
          sex: 1,
          birthday: birthdayVal,
          age: that.jsGetAge(birthdayVal),
          province: that.userAddress.province,
          city: that.userAddress.city,
          district: that.userAddress.district,
          address: $("#address").val(),
          zip: $("#zip").val()
        })
          .then(res => {
            if (res.data.code === 20001) {
              that.$message({
                message: "保存成功",
                type: 'success'
              });
              window.location.reload();
            } else {
              removeLoading()
              setTimeout(() => {
                that.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }, 100);
            }
          })
          .catch(e => {
            removeLoading()
              setTimeout(() => {
                that.$message({
                  message: '页面异常，请稍后刷新再试',
                  type: 'error'
                });
              }, 100);
          });
      }
    })
    $("#changePassword").validate({
      submitHandler: function (form) {
        loadingTips("密码修改中。。。")
        axios.post(`/api/auth/password_change`, {
          oldPassword: $("#old_password").val(),
          newPassword: $("#password").val(),
          newPassword_confirmation: $("#confirm_password").val()
        })
          .then(res => {
            if (res.data.code === 20001) {
              that.$message({
                message: "保存成功",
                type: 'success'
              });
              logoutRequest("密码修改成功，请重新登录")
            } else {
              removeLoading()
              setTimeout(() => {
                that.$message({
                  message: res.data.msg,
                  type: 'error'
                });
              }, 100);
            }
          })
          .catch(e => {
            removeLoading()
            setTimeout(() => {
              that.$message({
                message: '页面异常，请稍后刷新再试',
                type: 'error'
              });
            }, 100);
          });
      }
    })
  },
  methods: {
    logout: function () {
      logoutRequest("成功登出")
    },
    getUserData: function () {
      return axios.get(`/api/user_profile`)
        .then((res) => {
          if (res.data.code === 20001) {
            this.profile_id = res.data.data.id
            this.userAddress.province = res.data.data.province
            this.userAddress.city = res.data.data.city
            this.userAddress.district = res.data.data.district
            this.userAddress.address = res.data.data.address
            this.userAddress.zip = res.data.data.zip
            this.userInfo.real_name = res.data.data.real_name
            this.userInfo.birthday = res.data.data.birthday
            this.userInfo.phone = res.data.data.phone
            this.initcalendar()
            this.getProvinceOption(this.userAddress.province)
            this.getCityOption(this.userAddress.city)
            this.getDistrictOption(this.userAddress.district)
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
    initcalendar () {
      let myDate = new Date();
      let nowYear = myDate.getFullYear();
      let userYear = null;
      let userMonth = null;
      let userDays = null;
      if (this.userInfo.birthday) {
        userYear = this.userInfo.birthday.split("-")[0]
        userMonth = this.userInfo.birthday.split("-")[1]
        userDays = this.userInfo.birthday.split("-")[2]
      }
      for (var i = 0; i < 120; i++) {
        this.calendar.yearOption.push({
          value: nowYear - i,
          checked: (nowYear - i) == userYear
        })
      }
      for (var i = 1; i < 13; i++) {
        this.calendar.monthOption.push({
          value: i,
          checked: i < 10 ? ("0" + i) == userMonth : i == userMonth
        })
      }
      this.getNowDayNum(userYear, userMonth, userDays)
    },
    getNowDayNum: function (year, month, day) {
      var dayNum = 31
      this.calendar.dayOption = []
      if (year && month) {
        month = parseInt(month, 10);
        var temp = new Date(year, month, 0);
        dayNum = temp.getDate();
      }
      for (var i = 1; i < dayNum + 1; i++) {
        this.calendar.dayOption.push({
          value: i,
          checked: i < 10 ? ("0" + i) == day : i == day
        })
      }
    },
    changeDay: function () {
      var years = $("#year").val();
      var month = $("#month").val();
      this.getNowDayNum(years, month);
    },
    jsGetAge: function (strBirthday) {
      var returnAge;
      var strBirthdayArr = strBirthday.split("-");
      var birthYear = strBirthdayArr[0];
      var birthMonth = strBirthdayArr[1];
      var birthDay = strBirthdayArr[2];
      var d = new Date();
      var nowYear = d.getFullYear();
      var nowMonth = d.getMonth() + 1;
      var nowDay = d.getDate();
      if (nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁
      }
      else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
          if (nowMonth == birthMonth) {
            var dayDiff = nowDay - birthDay;//日之差
            if (dayDiff < 0) {
              returnAge = ageDiff - 1;
            }
            else {
              returnAge = ageDiff;
            }
          }
          else {
            var monthDiff = nowMonth - birthMonth;//月之差
            if (monthDiff < 0) {
              returnAge = ageDiff - 1;
            }
            else {
              returnAge = ageDiff;
            }
          }
        }
        else {
          returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
      }
      return returnAge;//返回周岁年龄
    },
    getProvinceOption: function (provinceVal) {
      var that = this;
      this.provinceOption = [];
      this.regionData.forEach((item, index, array) => {
        that.provinceOption.push({
          value: item.value,
          label: item.label,
          checked: item.label === provinceVal
        })
      })
    },
    getCityOption: function (cityVal) {
      var that = this;
      this.cityOption = [];
      this.regionData.forEach((item, index, array) => {
        if (item.label == that.userAddress.province) {
          item.children.forEach((item, index, array) => {
            if (item.label === "市辖区") {
              that.cityOption.push({
                value: item.value,
                label: that.userAddress.province.replace("市", "") + "城区",
                checked: that.userAddress.province.replace("市", "") + "城区" === cityVal
              })
            } else if (item.label === "县") {
              that.cityOption.push({
                value: item.value,
                label: that.userAddress.province.replace("市", "") + "郊县",
                checked: that.userAddress.province.replace("市", "") + "郊县" === cityVal
              })
            } else {
              that.cityOption.push({
                value: item.value,
                label: item.label,
                checked: item.label === cityVal
              })
            }
          })
        }
      })
    },
    getDistrictOption: function (districtVal) {
      var that = this;
      this.areaOption = [];
      this.regionData.forEach((item, index, array) => {
        if (item.label == that.userAddress.province) {
          item.children.forEach((item, index, array) => {
            if (that.userAddress.province.replace("市", "") + "城区" === that.userAddress.city && item.label === "市辖区" || that.userAddress.province.replace("市", "") + "郊县" === that.userAddress.city && item.label === "县" || item.label === that.userAddress.city) {
              item.children.forEach((item, index, array) => {
                if (item.label !== "市辖区") {
                  that.areaOption.push({
                    value: item.value,
                    label: item.label,
                    checked: item.label === districtVal
                  })
                }
              })
            }
          })
        }
      })
    },
    proviceChange: function () {
      this.userAddress.province = $("#province").val()
      this.getCityOption()
      this.areaOption = [];
      $("#city").find("option:selected").attr("selected", false);
    },
    cityChange: function () {
      this.userAddress.city = $("#city").val()
      this.getDistrictOption()
      $("#district").find("option:selected").attr("selected", false);
    },
    districtChange: function () {
      this.userAddress.district = $("#district").val()
    },
    profileTap (nav) {
      this.profilteType = nav
    }
  },
};
</script>

<style lang="scss" scoped>
.profile-wrapper {
  .profile-tab {
    margin: 0 0 0.5rem;
    text-align: center;
    display: flex;
    justify-content: center;
    .tabItem {
      cursor: pointer;
      min-width: 150px;
      padding: 8px 30px;
      border-left: 1px solid #fff;
      border-top: 1px solid #fff;
      border-bottom: 1px solid #fff;
      font-size: 14px;
      color: #fff;
      &:last-child {
        border-right: 1px solid #fff;
      }
      &.active {
        background: #fff;
        color: #333;
      }
    }
  }
}
.small-section {
  .error {
    overflow: hidden;
  }
  .form-group {
    &.error {
      padding: 0 5px;
      margin: 0 0 1rem;
    }
  }
  .form-control {
    color: #fff;
    &.error {
      color: #fff !important;
      font-size: 1rem !important;
    }
  }
}
</style>
