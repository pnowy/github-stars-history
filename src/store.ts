import Vue from 'vue';
import Vuex from 'vuex';
import VuexPathify from 'vuex-pathify';
import createPersistedState from 'vuex-persistedstate';
import {make} from 'vuex-pathify';
import appConfig from '@/config/app.config';
import _ from 'lodash';
import {Stack} from '@/models';

Vue.use(Vuex);

interface State {
  stacks: Stack[];
  showPredefined: boolean;
}

const state: State = {
  stacks: [],
  showPredefined: true,
};

const getters = {};

function findIndexByStack(stack: Stack): any {
  return _.findIndex(state.stacks, (el: Stack) => el.id === stack.id);
}

const mutations = {
  ...make.mutations(state),

  // tslint:disable-next-line:no-shadowed-variable
  addStack(state: State, {stack}: { stack: Stack }) {
    state.stacks.push(stack);
  },
  // tslint:disable-next-line:no-shadowed-variable
  deleteStack(state: State, {stack}: { stack: Stack }) {
    state.stacks.splice(findIndexByStack(stack), 1);
  },
  // tslint:disable-next-line:no-shadowed-variable
  editStack(state: State, {stack}: { stack: Stack }) {
    state.stacks[findIndexByStack(stack)] = stack;
  },
};

export default new Vuex.Store({
  plugins: [
    VuexPathify.plugin,
    createPersistedState({key: appConfig.defaults.persistedStore.name}),
  ],
  state,
  mutations,
  getters,
  actions: {},
});
