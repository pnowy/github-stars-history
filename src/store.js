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

const mutations = {
  ...make.mutations(state),

  addStack(state, { stack }) {
    state.stacks.push(stack);
  },
  deleteStack(state, { stack }) {
    const indexToDelete = state.stacks.findIndex(item => item.id === stack.id);
    state.stacks.splice(indexToDelete, 1);
  },
  editStack(state, { stack }) {
    state.stacks[state.stacks.findIndex(el => el.id === stack.id)] = stack;
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
