import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import login from './modules/login'
import clickAble from './modules/clickAble'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    clickAble
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});
