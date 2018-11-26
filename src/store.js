import Vue from "vue";
import Vuex from "vuex";

import VuexPathify from "vuex-pathify";
import createPersistedState from "vuex-persistedstate";
import { make } from "vuex-pathify";
import appConfig from "@/config/app.config";

Vue.use(Vuex);

const state = {
  stacks: [],
  showPredefined: true
};

const getters = {};

const findIndexByStackId = stack =>
  state.stacks.findIndex(el => el.id === stack.id);

const mutations = {
  ...make.mutations(state),

  addStack(state, { stack }) {
    state.stacks.push(stack);
  },
  deleteStack(state, { stack }) {
    state.stacks.splice(findIndexByStackId(stack), 1);
  },
  editStack(state, { stack }) {
    state.stacks[findIndexByStackId(stack)] = stack;
  }
};

export default new Vuex.Store({
  plugins: [
    VuexPathify.plugin,
    createPersistedState({ key: appConfig.defaults.persistedStore.name })
  ],
  state,
  mutations,
  getters,
  actions: {}
});
