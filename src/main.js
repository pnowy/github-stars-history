import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Buefy from "buefy";

import VueChartkick from "vue-chartkick";
import Highcharts from "highcharts";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.min.css";

Vue.use(Buefy);
Vue.use(VueChartkick, { adapter: Highcharts });

Vue.use(Loading);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
