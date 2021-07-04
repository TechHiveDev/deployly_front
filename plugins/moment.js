import Vue from "vue";
const moment = require('moment')
Vue.prototype.$moment = (...args) => moment(...args);
