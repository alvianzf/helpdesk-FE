import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import chat from './modules/chat'
import website from './modules/website'
import auth from './modules/auth'
import dashboard from './modules/dashboard'
import widget from './modules/widget'
import suggest from './modules/suggest'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    response : {},
    loading : false
  },
  getters: {
    getResponse : (state) => state.response,
    getLoading : (state) => state.loading
  },
  mutations: {
    SET_RESPONSE : (state,payload) => state.response = payload,
    SET_LOADING : (state, payload) => state.loading = payload
  },
  modules: {
    user,
    chat,
    website,
    auth,
    dashboard,
    widget,
    suggest
  }
})
