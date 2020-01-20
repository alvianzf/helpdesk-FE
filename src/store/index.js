import Vue from 'vue'
import Vuex from 'vuex'

import app from '../main'
import menu from './modules/menu'
import user from './modules/user'
import chat from './modules/chat'
import todo from './modules/todo'
import survey from './modules/survey'
import website from './modules/website'
import auth from './modules/auth'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    response : {}
  },
  getters: {
    getResponse : (state) => state.response
  },
  mutations: {
    SET_RESPONSE : (state,payload) => state.response = payload,
    changeLang (state, payload) {
      app.$i18n.locale = payload
      localStorage.setItem('currentLanguage', payload)
    }
  },
  actions: {
    setLang ({ commit }, payload) {
      commit('changeLang', payload)
    }
  },
  modules: {
    menu,
    user,
    chat,
    todo,
    survey,
    website,
    auth
  }
})
