import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Buefy from "buefy";
import VueAnalytics from "vue-analytics";

import VueChartkick from "vue-chartkick";
import Highcharts from "highcharts";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";

Vue.use(Buefy, {
  defaultIconPack: "fas"
});
Vue.use(VueChartkick, { adapter: Highcharts });
Vue.use(Loading);
Vue.use(VueAnalytics, {
  id: "UA-19090015-8",
  debug: {
    sendHitTask: process.env.NODE_ENV === "production"
  }
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
