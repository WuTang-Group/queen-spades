import Vue from 'vue'
if (process.client) {
  var regionData = {
    install (Vue) {
      Vue.prototype.regionData = require("element-china-area-data").regionData;
    }
  }
  var CodeToText = {
    install (Vue) {
      Vue.prototype.CodeToText = require("element-china-area-data").CodeToText;
    }
  }
  Vue.use(regionData);
  Vue.use(CodeToText);
}
