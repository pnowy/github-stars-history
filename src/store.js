import Vue from "vue";
import Vuex from "vuex";

import VuexPathify from "vuex-pathify";
import createPersistedState from "vuex-persistedstate";
import { make } from "vuex-pathify";
import appConfig from "@/config/app.config";

Vue.use(Vuex);

const state = {
  stacks: [],
  showPredefined: true,
  repos: []
};

const getters = {
  findRepoInStore: state => (repoName, repoDate) => {
    return state.repos.find(
      repo => repo.name === repoName && repo.date === repoDate
    );
  }
};

const mutations = {
  ...make.mutations(state),

  addStack(state, { stack }) {
    state.stacks.push(stack);
  },
  deleteStack(state, { stack }) {
    state.stacks.splice(state.stacks.indexOf(stack), 1);
  },
  saveRepoToStore(state, { repo }) {
    state.repos.push(repo);
  }
  // ,
  // editStack(state, { todo, text = todo.text, done = todo.done }) {
  //   todo.text = text
  //   todo.done = done
  // };
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
