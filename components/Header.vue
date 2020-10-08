<template>
  <div class="header-con" :class="overState?'sliding-nav-open':''">
    <header class="header js-header nav-scroll-header">
      <div class="header__nav-wrapper">
        <div class="header__nav-item" @click="toggleNav">
          <span class="nav-icon" :class="navigatState?'icon-cross':''"></span>
        </div>
      </div>
      <h1 class="header__logo-wrapper">
        <nuxt-link to="/"
                   class="header__logo icon icon-logo"
                   title="Laravel"></nuxt-link>
      </h1>
      <div class="header__items">
        <div class="header__item">
          <nuxt-link v-if="loginState"
                     to="/my-account"
                     class="header__account">
            <span class="account-icon"></span>
          </nuxt-link>
          <a v-else
             href="javascript:;"
             class="header__account" @click="openLogin"><span class="account-icon"></span></a>

        </div>

        <div class="header__item">
          <div class="header__minicart js-minicartbtn js-disable-hover"
               data-nav="js-minicart-slider">
            <span class="minicart-icon"
                  aria-hidden="true"></span>
            <span v-if="loginState&&carListData.length>0&&carListData[0].shop_cart_items.length" class="header__item-indicator minicart-quantity">
              {{carListData[0].shop_cart_items.length}}
            </span>
          </div>
        </div>

        <div class="header__item">
          <div class="header__minicart">
            <nuxt-link to="/wishlist">
              <span class="wishlist-icon"
                    aria-hidden="true"></span>
              <span class="header__item-indicator minicart-quantity minicart-quantity--hide" :class="{'minicart-show': wishInfo.total > 0}">
                {{wishInfo.total}}
              </span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </header>
    <div id="mini-cart"
         class="mini-cart ">
      <div class="mini-cart-content--holder">
        <nav class="sliding-nav minicart-slider-container js-sliding-nav js-minicart-slider">
          <div class="sliding-nav__top-container">
            <div class="sliding-nav__title">
              <div class="sliding-nav__icons">
                <span class="header__logo icon-logo"></span>
                <span class="account-icon">
                  <span class="account "></span>
                </span>
                <span class="mini-bag-icon">
                  <span class="cart">
                    <span class="minicart-quantity minicart-quantity--hide"></span>
                  </span>
                </span>
              </div>
              <span class="shopping-bag">购物车</span>
              <template v-if="loginState&&carListData.length>0">({{carListData[0].shop_cart_items.length}})</template>
            </div>
            <span class="icon icon-cross js-sliding-nav-close sliding-nav__close"
                  data-nav="js-minicart-slider"></span>
          </div>
          <div class="sliding-nav__content js-sliding-nav-content">
            <span id="lastAddedProductQty"
                  data-qty-exceeded="null"
                  data-qty-added="null"></span>
            <div class="empty-minicart-container">
              <h3 v-if="!loginState"
                  class="empty-minicart-msg">请您先<nuxt-link class="empty-link"
                           to="/login">登录</nuxt-link>
              </h3>
              <h3 v-else-if="loginState&&carListData.length==0"
                  class="empty-minicart-msg">您的购物车已清空</h3>
              <div v-else
                   class="mini-cart-main-contentainer">
                <div class="mini-cart-content">
                  <div class="mini-cart-wrapper">
                    <div class="mini-cart-products">
                      <div class="mini-cart-product"  v-for="(item,index) in carListData[0].shop_cart_items" :key="index">
                        <div class="mini-cart-image">
                          <img :src="item.product.thumbnail"
                               :alt="item.product.product_name_en">
                        </div>
                        <div class="mini-cart-product-details">
                          <div class="mini-cart-name">
                            <nuxt-link :to="{path:'/rapid-response-booster', query:{slug:item.product.slug}}"
                                   :title="`${item.product.product_name}`">
                            <span class="mini-cart-product-name">{{item.product.product_name_en}}</span>
                            <span class="collection-title">{{item.product.product_name}}</span>
                            </nuxt-link>
                          </div>
                          <div class="mini-cart-attributes">
                            <div class="quantity">
                              <span class="label">数量：&nbsp;</span>
                              <span class="value">{{item.product.amount}}</span>
                            </div>
                            <div class="attribute">
                              <span class="value">{{item.product.spec}}</span>
                            </div>
                            <div class="mini-cart-pricing">
                              <span v-if="item.product.sale_price" class="mini-cart-price">¥ {{item.product.sale_price}} <del>¥ {{item.product.price}}</del></span>
                              <span v-else class="mini-cart-price"> ¥ {{item.product.price}}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="loginState" class="mini-cart-totals empty-minicart-totals">
              <nuxt-link v-if="loginState&&carListData.length==0" class="button mini-cart-link-cart button--secondary"
                         to="/"
                         title="继续购物">继续购物</nuxt-link>
              <nuxt-link v-else class="button mini-cart-link-cart button--secondary"
                         to="/cart"
                         title="购物车">购物车</nuxt-link>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <nav v-if="!loginState"
         class="account-nav sliding-nav" :class="loginPopState?'active':''">
      <div class="account-nav__title">
        <div class="sliding-nav__icons">
          <span class="header__logo icon-logo"></span>
          <span class="account-icon">
            <span class="account"></span>
          </span>
          <span class="mini-bag-icon">
            <span class="cart">
              <span class="minicart-quantity minicart-quantity--hide"></span>
            </span>
          </span>
        </div>
        My Laravel 帐户
      </div>
      <span class="icon icon-cross account-nav__close" @click="closePop"></span>
      <div class="account-nav__content login-scroll">
        <div class="account-login js-account">
          <div class="account-login__section account-login__section--login">
            <div class="account-login__section-content"
                 id="login">
              <div class="returning-customers">
                <div class="account-login__welcome-message">
                  <div class="content-asset">
                    <p>立即登录或注册，开启您的奢华护肤之旅。</p>
                  </div>
                </div>

                <form method="post"
                      class="account-login__form js-nav-login-form"
                      id="dwfrm_login_d0chewnapqsp"
                      novalidate="novalidate">
                  <fieldset>
                    <div class="input-field js-input-field   required "
                         aria-required="true">
                      <input class="input-text js-input required"
                             id="dwfrm_login_username_d0fksdawqxrr"
                             type="text"
                             name="dwfrm_login_username_d0fksdawqxrr"
                             value=""
                             maxlength="50"
                             aria-required="true" />
                      <label class="label-extra">
                        <span class="form-label">
                          用户名
                        </span>
                        <span class="required-indicator">* </span>
                      </label>
                    </div>
                    <div class="input-field js-input-field  input-field--password password  required "
                         data-required-text="请输入有效的密码（8-25 个字符）。"
                         aria-required="true">
                      <input class="input-text-pw js-input password-input required"
                             id="dwfrm_login_password_d0yaaltcwkpz"
                             type="password"
                             name="dwfrm_login_password_d0yaaltcwkpz"
                             value=""
                             maxlength="25"
                             aria-required="true" />
                      <!-- <span class="account-registration-password-button js-password-button js-toggle-text"
                            data-toggle-text="隐藏">
                        显示
                      </span> -->
                      <label for="dwfrm_login_password_d0yaaltcwkpz"
                             class="label-extra">
                        <span class="form-label">
                          密码
                        </span>
                        <span class="required-indicator">* </span>
                      </label>
                    </div>
                    <div class="form-row account-login__secondary-actions">
                      <div class="input-field js-input-field  input-field--checkbox  ">
                        <input class="input-checkbox premium"
                               type="checkbox"
                               name="dwfrm_login_rememberme_d0oghnnlbgna"
                               id="dwfrm_login_rememberme_d0oghnnlbgna"
                               value="true" />
                      </div>
                      <nuxt-link id="password-reset-premium"
                                 to="/resetPassword"
                                 class="login-password-reset js-nav-reset-password"
                                 title="忘记密码？">忘记密码？</nuxt-link>
                    </div>
                    <div class="form-row form-row-button account-login__buttons-container">
                      <div>
                        <button type="submit"
                                class="button button--transparant js-login-nav-premium"
                                value="登录"
                                name="dwfrm_cart_login">
                          登录
                        </button>
                      </div>
                      <div class="account-login__buttons-separator">
                        或
                      </div>
                      <div>
                        <nuxt-link to="/register"
                                   class="button button--transparant"
                                   title="注册">注册</nuxt-link>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- <nav class="account-nav account-password-nav js-account-nav-fotgot-password">
      <div class="account-nav__title js-close-forgot-password">
        <span class="icon icon-chevron-left"></span>
        <span>重置密码</span>
      </div>
      <span class="icon icon-cross js-accountnav-close account-nav__close"></span>
      <div class="account-nav__content forgot-password">
        <div class="password-reset js-password-reset">
          <p>提供你的手机号以接受重置密码的验证短信。</p>
          <form action="https://www.laprairie.com.cn/on/demandware.store/Sites-LaPrairie_CN_Transactional-Site/zh_CN/Account-SMSPasswordResetDialog/C1094520575"
                class="clearfix"
                method="post"
                id="PasswordResetForm"
                name="dwfrm_requestpassword"
                novalidate="novalidate">
            <input type="hidden"
                   name="csrf_token"
                   value="MINfVwqiFswCwU1DcfCyzSZu0VR_JPJKtlfZh6dPuDyxmRqzh879Wg-SToUuLskSE7UyIoV8an2FK7ySQYP-Qej0eM5CjPPtYollOfVnv9WfFB2dCje7Dtj2B1fgYcO4gojJGIJrixZjpGTzAq9mTAWVpzhuPlyZeghlEtzVuPbQOtryA70="
                   class="token" />
            <fieldset>
              <div class="input-field js-input-field   required "
                   data-required-text="请输入有效的电子邮件地址。"
                   aria-required="true">
                <input class="input-text js-input required"
                       id="dwfrm_requestpassword_phoneMobile"
                       type="text"
                       name="dwfrm_requestpassword_phoneMobile"
                       value=""
                       maxlength="50"
                       aria-required="true" />
                <label class="label-extra">
                  <span class="form-label">
                    注册手机号
                  </span>
                  <span class="required-indicator">* </span>
                </label>
              </div>
              <div class="verificationButton">
                <div class="input-field js-input-field   required "
                     aria-required="true">
                  <input class="input-text js-input required"
                         id="dwfrm_requestpassword_resetverificationCode"
                         type="text"
                         name="dwfrm_requestpassword_resetverificationCode"
                         value=""
                         maxlength="50"
                         aria-required="true" />
                  <label class="label-extra">
                    <span class="form-label">
                      短信验证码
                    </span>
                    <span class="required-indicator">* </span>
                  </label>
                </div>
                <div class="form-row form-row-button form-border-top">
                  <button type="submit"
                          class="btn button resetverificationcode"
                          name="dwfrm_requestpassword_verification">
                    获取验证码
                  </button>
                </div>
                <div class="resetverificationTimer">
                  <div id="CountDownTimerResetPassword"
                       data-timer="90"></div>
                </div>
              </div>
              <div class="input-field js-input-field  input-field--password password  required "
                   data-required-text="请输入有效的密码（8-25 个字符）。"
                   aria-required="true">
                <input class="input-text-pw js-input required"
                       id="dwfrm_requestpassword_password"
                       type="password"
                       name="dwfrm_requestpassword_password"
                       value=""
                       maxlength="25"
                       aria-required="true" />
                <span class="account-registration-password-button js-password-button js-toggle-text"
                      data-toggle-text="隐藏">
                  显示
                </span>
                <label for="dwfrm_requestpassword_password"
                       class="label-extra">
                  <span class="form-label">
                    新密码
                  </span>
                  <span class="required-indicator">* </span>
                  <span class="form-caption">8 - 25 个字符</span>
                </label>
              </div>
              <div class="input-field js-input-field  input-field--password password  required "
                   data-required-text="请输入有效的密码（8-25 个字符）。"
                   aria-required="true">
                <input class="input-text-pw js-input required"
                       id="dwfrm_requestpassword_passwordconfirm"
                       type="password"
                       name="dwfrm_requestpassword_passwordconfirm"
                       value=""
                       maxlength="25"
                       aria-required="true" />
                <span class="account-registration-password-button js-password-button js-toggle-text"
                      data-toggle-text="隐藏">
                  显示
                </span>
                <label for="dwfrm_requestpassword_passwordconfirm"
                       class="label-extra">
                  <span class="form-label">
                    确认密码
                  </span>
                  <span class="required-indicator">* </span>
                  <span class="form-caption">8 - 25 个字符</span>
                </label>
              </div>
              <input type="hidden"
                     id="matchError"
                     name="matchError"
                     value="输入的密码不匹配" />
              <div class="form-row form-row-button">
                <button type="submit"
                        value="发送"
                        name="dwfrm_requestpassword_send"
                        class="btn button">
                  发送
                </button>
              </div>
              <input type="hidden"
                     name="dwfrm_requestpassword_securekey"
                     value="497060332" />
            </fieldset>
          </form>
        </div>
      </div>
    </nav> -->
    <!-- <div class="country-selector cs-mobile-view">
      <div class="cs-wrapper">
        <div class="cs-mobile-header">
          <a class="cs-logo icon icon-logo"
             href=""
             title="Laravel"></a>
          <span class="cs-mobile-close icon-cross"
                aria-hidden="true"></span>
        </div>
        <div class="cs-title-container">
          <span class="cs-title">欢迎来到 Laravel</span>
          <span class="cs-subtitle">Please choose your Country/Region</span>
        </div>
        <div class="cs-main-container">
          <div class="country-region">
            <div class="region-name">Americas</div>
            <div class="countries-container transactional">
              <div class="country">
                <span class="country-name">Latin America</span>
                <a href="javascript:;"
                   class="country-locale">(ES)</a>
                <a href="javascript:;"
                   class="country-locale">(PT)</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;"
                   class="country-name">United States</a>
              </div>
            </div>
          </div>
          <div class="country-region">
            <div class="region-name">Europe</div>
            <div class="countries-container transactional">
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;"
                   class="country-name">Austria</a>
              </div>
              <div class="country">
                <span class="country-name">Belgium and Netherlands</span>
                <a href="javascript:;"
                   class="country-locale">(NL)</a>
                <a href="javascript:;"
                   class="country-locale">(FR)</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;"
                   class="country-name">France</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;"
                   class="country-name">Germany</a>
              </div>
              <div class="country">
                <a href="javascript:;"
                   class="country-name">Greece</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;"
                   class="country-name">Italy</a>
              </div>
              <div class="country">
                <a href="javascript:;"
                   class="country-name">Portugal</a>
              </div>
              <div class="country">
                <a href="javascript:;"
                   class="country-name">Russia</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;"
                   class="country-name">Spain</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <span class="country-name">Switzerland</span>
                <a href="javascript:;"
                   class="country-locale">(DE)</a>
                <a href="javascript:;"
                   class="country-locale">(FR)</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;"
                   class="country-name">United Kingdom</a>
              </div>
            </div>
          </div>
          <div class="country-region">
            <div class="region-name">Asia - Pacific</div>
            <div class="countries-container transactional">
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;"
                   class="country-name">Australia</a>
              </div>
              <div class="country selected">
                <span class="transactional-icon"></span>
                <a href=""
                   class="country-name">China</a>
              </div>
              <div class="country">
                <span class="country-name">Hong Kong SAR</span>
                <a href="javascript:;"
                   class="country-locale">(EN)</a>
                <a href="javascript:;"
                   class="country-locale">(ZH)</a>
              </div>
              <div class="country">
                <a href="javascript:;"
                   class="country-name">Japan</a>
              </div>
              <div class="country">
                <a href="javascript:;"
                   class="country-name">Korea</a>
              </div>
              <div class="country">
                <a href="javascript:;"
                   class="country-name">Taiwan</a>
              </div>
            </div>
          </div>
          <div class="country-region">
            <div class="region-name">Other</div>
            <div class="countries-container ">
              <div class="country">
                <span class="country-name">International</span>
                <a href="javascript:;"
                   class="country-locale">(EN)</a>
                <a href="javascript:;"
                   class="country-locale">(中文)</a>
              </div>
            </div>
          </div>
          <div class="country-region">
            <div class="region-name">Europe</div>
            <div class="countries-container transactional">
              <<div class="country">
                span class="transactional-icon"></span>
                <a href="javascript:;" class="country-name">Austria</a>
              </div>
              <div class="country">
                <span class="country-name">Belgium and Netherlands</span>
                <a href="javascript:;" class="country-locale">(NL)</a>
                <a href="javascript:;" class="country-locale">(FR)</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;" class="country-name">France</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;" class="country-name">Germany</a>
              </div>
              <div class="country">
                <a href="javascript:;" class="country-name">Greece</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;" class="country-name">Italy</a>
              </div>
              <div class="country">
                <a href="javascript:;" class="country-name">Portugal</a>
              </div>
              <div class="country">
                <a href="javascript:;" class="country-name">Russia</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;" class="country-name">Spain</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <span class="country-name">Switzerland</span>
                <a href="javascript:;" class="country-locale">(DE)</a>
                <a href="javascript:;" class="country-locale">(FR)</a>
              </div>
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;" class="country-name">United Kingdom</a>
              </div>
            </div>
          </div>
          <div class="country-region">
            <div class="region-name">Asia - Pacific</div>
            <div class="countries-container transactional">
              <div class="country">
                <span class="transactional-icon"></span>
                <a href="javascript:;" class="country-name">Australia</a>
              </div>
              <div class="country selected">
                <span class="transactional-icon"></span>
                <a href="" class="country-name">China</a>
              </div>
              <div class="country">
                <span class="country-name">Hong Kong SAR</span>
                <a href="javascript:;" class="country-locale">(EN)</a>
                <a href="javascript:;" class="country-locale">(ZH)</a>
              </div>
              <div class="country">
                <a href="javascript:;" class="country-name">Japan</a>
              </div>
              <div class="country">
                <a href="javascript:;" class="country-name">Korea</a>
              </div>-
              <div class="country">
                <a href="javascript:;" class="country-name">Taiwan</a>
              </div>
            </div>
          </div>
          <div class="country-region">
            <div class="region-name">Other</div>
            <div class="countries-container ">
              <div class="country">
                <span class="country-name">International</span>
                <a href="javascript:;" class="country-locale">(EN)</a>
                <a href="javascript:;" class="country-locale">(中文)</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <nav class="navigation" :class="navigatState?'expand-menu':'close-menu'" :style="`visibility: ${justMounted ? 'hidden' : ''}`">
      <div class="navigation-wrapper">
        <div class="nav-mobile nav-header">
          <div class="js-header-nav" @click="closePop">
            <span class="icon-cross"></span>
          </div>
          <nuxt-link to="/"
                     class="icon icon-logo"
                     title="Laravel"></nuxt-link>
        </div>
        <div class="js-navigation-categories">
          <div class="navigation-container">
            <div v-for="(item,index) in categoriesNav"
                 :key="index"
                 :data-slug="item.slug"
                 class="first-nav-level has-subcat first-nav-level--highlighted">
              <p class="top-cat-name" @click="navigationToggle">
                {{item.name}}
              </p>
              <ul class="navigation__items navigation__items--sub">
                <li :id="item.slug"
                    :data-overview="item.slug"
                    class="nav-items-sub">
                  <a class="navigation__lnk" @click="switchPage({path:'/skincare-overview', query:{type:item.type}})">
                    {{item.name}}概述
                  </a>
                </li>
                <li v-for="(category,cindex) in item.data"
                    :key="cindex"
                    :id="category.slug"
                    :data-category="category.slug"
                    class="nav-items-sub">
                  <a class="navigation__lnk" @click="switchPage({path:'/radiance-collection', query:{type:item.type,slug:category.slug}})">
                    {{item.type=='product'?category.product_name:(item.type=='product_category_skin_care'?category.name:'')}}
                  </a>
                </li>
              </ul>

            </div>
            <div class="first-nav-level has-subcat first-nav-level--highlighted">
              <p class="top-cat-name" @click="navigationToggle">
                尊享服务
              </p>
              <ul class="navigation__items navigation__items--sub">
                <li id="services"
                    data-category="services"
                    class="nav-items-sub">
                  <a data-category="services" class="navigation__lnk" @click="switchPage({path:'/services', query:{}})">
                    官网服务
                  </a>
                </li>
              </ul>
            </div>
            <div class="first-nav-level has-subcat first-nav-level--highlighted">
              <p class="top-cat-name" @click="navigationToggle">
                The House
              </p>
              <ul class="navigation__items navigation__items--sub">
                <li id="overview"
                    data-category="overview"
                    class="nav-items-sub">
                  <a data-category="overview" class="navigation__lnk" @click="switchPage({path:'/the-house', query:{}})">概述</a>
                </li>
                <li v-for="(item,index) in theHouseNav"
                    :key="index"
                    :id="item.slug"
                    :data-category="item.slug"
                    class="nav-items-sub">
                  <a data-category="the-essence" class="navigation__lnk" @click="switchPage({path:'/editorials-category', query:{slug:item.slug,name:item.name}})">
                    {{item.name}}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="nav-tiles-wrapper">
            <div class="nav-tile ">
              <div class="nav-tile-image">
                <nuxt-link to="/">
                  <img src="/picture/NEW_This-month-curation_right-co.jpg"
                       alt="探索" />
                </nuxt-link>
              </div>
              <nuxt-link to="/"
                         class="nav-tile-title">探索</nuxt-link>
            </div>
            <div class="nav-tile ">
              <div class="nav-tile-image">
                <nuxt-link to="/">
                  <img src="/picture/Navigation_thumbnail-center-260_.jpg"
                       alt="悦享" />
                </nuxt-link>
              </div>
              <nuxt-link to="/"
                         class="nav-tile-title">悦享</nuxt-link>
            </div>
            <div class="nav-tile ">
              <div class="nav-tile-image">
                <nuxt-link to="/">
                  <img src="/picture/Homepage_navigation_right-260_14.jpg"
                       alt="沉浸" />
                </nuxt-link>
              </div>
              <nuxt-link to="/"
                         class="nav-tile-title">沉浸</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="nav-overlay" v-show="overState" @click="closePop"></div>
  </div>
</template>

<script>
import { loginRequest, getcookiesInClient, getShoppingCartData } from '../util/util';
import axios from "~/plugins/axios";
import { getWishList } from "~/api/wish";
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      loginState: false,
      categoriesNav: [],
      theHouseNav: [],
      loginPopState: false,
      // 是否刚刚渲染
      justMounted: true
    };
  },
  computed: {
    ...mapState({
      navigatState: state => state.navigatState,
      overState: state => state.overState,
      carListData: state => state.cartInfo,
      wishInfo: state => state.wishInfo,
    })
  },
  created () {
    if (getcookiesInClient("token") !== 'undefined' && getcookiesInClient("token")) {
      this.loginState = true
    }
    this.getCategories()
    this.getTheHouseNav()
    this.getCarData()
    this.getWishData()
  },
  mounted () {
    $("#dwfrm_login_d0chewnapqsp").validate({
      submitHandler: function (form) {
        var data = {
          username: $("#dwfrm_login_username_d0fksdawqxrr").val(),
          password: $("#dwfrm_login_password_d0yaaltcwkpz").val()
        }
        loginRequest(data)
      }
    })
    // 在原先的动画结束时，去掉导航展示的限制
    window.setTimeout(() => {
      this.justMounted = false
    }, 1000);
  },
  methods: {
    ...mapMutations({
      setCartInfo: 'SET_CART_INFO',
      setWishInfo: "SET_WISH_INFO",
      setNavigatState: "SET_NAVIGAT_STATE",
      setOverState: "SET_OVER_STATE"
    }),
    navigationToggle(evt) {
      const target = evt.target
      const currentState = $(target).hasClass("nav-minus")
      $(target).parent().parent().find(".top-cat-name").removeClass("nav-minus")
      $(target).parent().parent().find(".navigation__items").removeClass("show")
      if(!currentState){
        $(target).addClass("nav-minus")
        $(target).siblings(".navigation__items").addClass("show")
      }
    },
    getCategories: async function () {
      var that = this
      return await axios.get(`/api/navbar/product_categories`)
        .then((res) => {
          if (res.data.code === 20001) {
            that.categoriesNav = res.data.data
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
    getTheHouseNav: async function () {
      var that = this
      return await axios.get(`/api/the_house/category`)
        .then((res) => {
          if (res.data.code === 20001) {
            that.theHouseNav = res.data.data
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
    getWishData(){
      const that = this
      getWishList({
        page: 1,
        page_limit: 2
      }).then(res => {
        let wishInfo = res.data.data
        that.setWishInfo(wishInfo)
      }).catch(err=>{
        console.log('获取心愿单数量异常')
      })
    },
    getCarData: function() {
      var that = this
      if(this.loginState){
        getShoppingCartData().then(res => {
          that.setCartInfo(res)
        });
      }
    },
    toggleNav: function() {
      this.setNavigatState(!this.navigatState)
      this.setOverState(!this.overState)
    },
    openLogin: function() {
      this.loginPopState = true
      this.setOverState(true)
    },
    closePop: function() {
      this.setNavigatState(false)
      this.setOverState(false)
      this.loginPopState = false
    },
    // 跳转页面
    switchPage(pageInfo) {
      this.setNavigatState(false)
      this.setOverState(false)
      this.$router.push(pageInfo)
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation__lnk {
  cursor: pointer;
}
/deep/.mini-cart .empty-minicart-container .empty-minicart-msg{
  padding-top: 5rem;
  letter-spacing: 2px;
}
/deep/.account-nav {
  .input-field:not(.input-field--checkbox) {
    label {
      &.error {
        position: absolute;
        left: 4.5rem;
        top: -1rem !important;
        font-size: 13px;
        color: #fff;
      }
    }
  }
}
/deep/.sliding-nav__icons{
  position: relative;
  .header__logo{
    position: absolute;
    left: 50%;
    top: 0.75rem;
    transform: translate(-50%,0);
  }
}

.minicart-show {
  display: flex !important;
}
@media screen and (max-width: 85.375rem){
  /deep/nav .icon-logo{
    display: inline-block;
  }
  /deep/.top-cat-name{
    cursor: pointer;
  }
  /deep/.navigation__items{
    max-height: 0;
    overflow: hidden;
    display: block;
    transition: all 0.5s;
    padding: 0;
    &.show{
      padding: 1.1875rem 0 1.5625rem 1.5625rem;
      max-height: 100rem;
    }
  }
}
</style>
