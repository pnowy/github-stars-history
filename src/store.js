import Vue from "vue";
import Vuex from "vuex";

import VuexPathify from "vuex-pathify";
import createPersistedState from "vuex-persistedstate";
import { make } from "vuex-pathify";
import appConfig from "@/config/app.config";

Vue.use(Vuex);

const state = {
  stacks: []
};

const mutations = make.mutations(state);

export default new Vuex.Store({
  plugins: [
    VuexPathify.plugin,
    createPersistedState({ key: appConfig.defaults.persistedStore.name })
  ],
  state: state,
  mutations: mutations,
  actions: {}
});
