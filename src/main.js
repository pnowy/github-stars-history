import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Buefy from "buefy";

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
