var mapProperties = {
  dataUrl:
    "https://www.laprairie.com.cn/on/demandware.store/Sites-LaPrairie_CN_Transactional-Site/zh_CN/Stores-JSON",
  country: "中国",

  apiUrl:
    "https://api.map.baidu.com/api?v=2.0&s=1&ak=iG6xrK85GTTrbaTwnb3mFgUp9qePpqAx&callback=mapsCallback_",

  geolocUrl:
    "/on/demandware.static/Sites-LaPrairie_CN_Transactional-Site/-/zh_CN/v1599482667319/js/lib/geolocationmarker.js",
  mcUrl:
    "/on/demandware.static/Sites-LaPrairie_CN_Transactional-Site/-/zh_CN/v1599482667319/js/lib/markerclusterer.js",
  gapikey: "AIzaSyDVA3EzMvZKIkMeQEUQkDomSwY8T0G4_5k",
  icons: {
    marker:
      "/on/demandware.static/Sites-LaPrairie_CN_Transactional-Site/-/default/dw3ba5a86a/images/storefinder/marker.png",
    marker_selected:
      "/on/demandware.static/Sites-LaPrairie_CN_Transactional-Site/-/default/dw64962cfe/images/storefinder/marker_selected.png",
    cluster:
      "/on/demandware.static/Sites-LaPrairie_CN_Transactional-Site/-/default/dw36b15098/images/storefinder/markercluster.png",
    user_location:
      "/on/demandware.static/Sites-LaPrairie_CN_Transactional-Site/-/default/dw0ce35daa/images/storefinder/user_location.png"
  },
  labels: {
    user_location: "storelocator.map.youarehere",
    directions: "storelocator.map.getdirections"
  },
  templates: {
    store_info:
      "https://www.laprairie.com.cn/on/demandware.store/Sites-LaPrairie_CN_Transactional-Site/zh_CN/Stores-Mustache"
  },
  useBaiduMaps: true,
  baiduKey: "iG6xrK85GTTrbaTwnb3mFgUp9qePpqAx",
  storeFilter: "null"
};

var pageContext = {
  title: "Storefront",
  type: "storefront",
  ns: "storefront",
  template: "homepage"
};

var meta =
  "Queen Spades 官方网站。进入无尽探寻恒久之美的护肤世界，体验兼备艺术之美和科学突破的奢华产品。";
var keywords =
  "Queen Spades 鱼子精华，护肤，美妆，奢华护肤，提升紧致，焕颜新生，抗衰老，抗老化，美白";
(function () {
  window.Constants = {
    AVAIL_STATUS_IN_STOCK: "IN_STOCK",
    AVAIL_STATUS_PREORDER: "PREORDER",
    AVAIL_STATUS_BACKORDER: "BACKORDER",
    AVAIL_STATUS_NOT_AVAILABLE: "NOT_AVAILABLE"
  };
  window.Resources = {
    I_AGREE: "global.i_agree",
    CLOSE: "关闭",
    NO_THANKS: "不，谢谢",
    OK: "global.ok",
    SHIP_QualifiesFor: "This shipment qualifies for",
    CC_LOAD_ERROR: "Couldn't load credit card!",
    COULD_NOT_SAVE_ADDRESS: "multishippingaddresses.couldnotsaveaddress",
    REG_ADDR_ERROR: "无法加载地址",
    BONUS_PRODUCT: "奖励产品",
    BONUS_PRODUCTS: "奖励产品",
    SELECT_BONUS_PRODUCTS: "选择{0}奖励产品",
    SELECT_BONUS_PRODUCT: "选择",
    BONUS_PRODUCT_MAX:
      "奖励产品的最大数量已选择。请删除一件以便添加其他奖励产品。",
    BONUS_PRODUCT_TOOMANY: "product.bonusproductstoomany",
    SIMPLE_SEARCH: "搜索",
    SUBSCRIBE_EMAIL_DEFAULT: "Email Address",
    CURRENCY_SYMBOL: "¥",
    CURRENCY_SYMBOL_AT_BACK: false,
    MISSINGVAL: "请输入 {0}",
    SERVER_ERROR: "服务器连接失败！",
    MISSING_LIB: "未定义 jQuery。",
    BAD_RESPONSE: "响应不良，分析器错误",
    INVALID_PHONE: "请输入有效的电话号码。",
    REMOVE: "删除",
    QTY: "数量：",
    EMPTY_IMG_ALT: "删除",
    COMPARE_BUTTON_LABEL: "比较商品",
    COMPARE_CONFIRMATION: "这将删除首件添加比较的产品。是否确定？",
    COMPARE_REMOVE_FAIL: "无法从列表中删除商品",
    COMPARE_ADD_FAIL: "无法将商品添加至列表中",
    ADD_TO_CART_FAIL: "Unable to add item '{0}' to bag",
    REGISTRY_SEARCH_ADVANCED_CLOSE: "account.giftregistry.closeadvanced",
    GIFT_CERT_INVALID: "Invalid Gift Certificate Code",
    GIFT_CERT_BALANCE: "Your current gift certificate balance is",
    GIFT_CERT_AMOUNT_INVALID:
      "礼品券的购买数额下限为 5 美元，上限为 5000 美元",
    GIFT_CERT_MISSING: "Please enter a gift certificate code.",
    INVALID_OWNER: "billing.ownerparseerror",
    COUPON_CODE_MISSING: "请输入正确的优惠代码",
    COOKIES_DISABLED: "global.browsertoolscheck.cookies",
    BML_AGREE_TO_TERMS: "您必须同意条款与条件",
    CHAR_LIMIT_MSG: "character.limit",
    CONFIRM_DELETE: "confirm.delete",
    TITLE_GIFTREGISTRY: "title.giftregistry",
    TITLE_ADDRESS: "title.address",
    TITLE_CREDITCARD: "title.creditcard",
    SERVER_CONNECTION_ERROR: "服务器连接失败！",
    IN_STOCK_DATE: "预期的到货日期是 {0}.",
    ITEM_STATUS_NOTAVAILABLE: "暂时缺货",
    INIFINITESCROLL: "显示全部",
    STORE_NEAR_YOU: "What's available at a store near you",
    SELECT_STORE: "storelist.lightbox.selectstore",
    SELECTED_STORE: "storelist.lightbox.selectedstore",
    PREFERRED_STORE: "storelist.lightbox.preferredstore",
    SET_PREFERRED_STORE: "storelist.lightbox.setpreferredstore",
    ENTER_ZIP: "storelist.lightbox.enterzip",
    INVALID_ZIP: "storelist.lightbox.invalidpostalcode",
    SEARCH: "搜索",
    CHANGE_LOCATION: "storelist.lightbox.changelocation",
    CONTINUE_WITH_STORE: "storelist.lightbox.continuewithstore",
    CONTINUE: "继续",
    SEE_MORE: "storelist.lightbox.seemore",
    SEE_LESS: "storelist.lightbox.seeless",
    QUICK_VIEW: "快速查看",
    QUICK_VIEW_POPUP: "产品快速查看",
    TLS_WARNING: "global.browsertoolscheck.tls",
    LIMITEDSTOCK: "所选数量超出库存量",
    LIMITEDSTOCKSTICKY: "超过库存水平",
    FREE: "提供",
    OFFERED: "礼品",
    VALIDATE_REQUIRED: "请填写该字段",
    VALIDATE_REMOTE: "请更正该字段",
    VALIDATE_EMAIL: "请输入有效的电子邮件地址",
    VALIDATE_URL: "请输入有效 URL",
    VALIDATE_DATE: "请输入有效日期",
    VALIDATE_DATEISO: "请输入有效日期 (ISO)",
    VALIDATE_NUMBER: "请输入有效号码",
    VALIDATE_DIGITS: "请仅输入数字",
    VALIDATE_CREDITCARD: "请输入有效的信用卡号码",
    VALIDATE_EQUALTO: "请再次输入同一个值",
    VALIDATE_MAXLENGTH: "输入的字符不能多于 {0} 个",
    VALIDATE_MINLENGTH: "请至少输入 {0} 个字符",
    VALIDATE_RANGELENGTH: "请输入一个介于 {0} 至 {1} 的字符值",
    VALIDATE_RANGE: "请输入一个 {0} 至 {1} 之间的数值",
    VALIDATE_MAX: "请输入一个小于或等于 {0} 的数值",
    VALIDATE_MIN: "请输入一个大于或等于 {0} 的数值",
    VALIDATE_PASSWORD: "请输入有效的密码（8-25 个字符）。",
    VALIDATE_POSTAL: "请输入有效的邮政编码。",
    FAPIAO_APPLIED: "已申请",
    VALIDATE_CONSENT: "需要同意方可创建账户。",
    READ_MORE: "了解更多",
    READ_LESS: "收起",
    taxNumberValidationError: "请输入15或18位纳税人识别号",
    MobileNumberRegExp: "^1[3|4|5|6|7|8|9|][0-9]{9}$",
    EmailRegExp:
      "^([a-zA-Z0-9_.+-])+\\@(([a-zA-Z0-9-])+\\.)+([a-zA-Z0-9]{2,4})+$",
    taxNumberRegExp: "^(?=[a-zA-Z0-9]*$)(.{15}|.{18})$",
    YOUKU_ID: "bf7aad0f6b213f02",
    CONTACTUS_ORDER_ERROR: "无效订单编号",
    CONTACTUS_ORDER_NOT_FOUND: "抱歉，您的订单编号不正确。请重试。",
    RESULT: "Result Found",
    RESULTS: "Results Found",
    USERNAME_TAKEN: "该手机号已被注册。",
    FILL_MOBILENUMBER: "请输入有效的手机号码。",
    IN_STOCK: "有货",
    QTY_IN_STOCK: "{0} 商品有货",
    PREORDER: "预订",
    QTY_PREORDER: "{0} 商品可供预订。",
    REMAIN_PREORDER: "其余商品可供预订。",
    BACKORDER: "欠交订单",
    QTY_BACKORDER: "欠交订单 {0} 商品",
    REMAIN_BACKORDER: "其余商品可供欠交订单使用。",
    NOT_AVAILABLE: "暂时缺货",
    REMAIN_NOT_AVAILABLE: "其余商品暂时缺货。请调整数量。"
  };
  window.Urls = {};
  window.SitePreferences = {
    LISTING_INFINITE_SCROLL: true,
    LISTING_REFINE_SORT: true,
    COUNTRY: "CN",
    STORE_PICKUP: false,
    COOKIE_HINT: false,
    CHECK_TLS: false,
    GTM_ENABLE: true,
    CURRENT_SITE_ID: "LaPrairie_CN_Transactional",
    NUMBER_OF_SAMPLES: "3",
    CONTACTLAB_DO_IN_ENABLE: true,
    LIVEPERSON_ENABLED: false,
    LIVEPERSON_LOCALES: ""
  };
  window.SessionAttributes = { SHOW_CAPTCHA: null };
  window.User = { zip: null, storeId: null };
})();