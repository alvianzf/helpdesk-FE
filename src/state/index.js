import Vue from  'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import user from './modules/user'
import website from './modules/website'
import chat from './modules/chat'

Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        response : {}
    },
    getters : {
        getResponse : (state) => state.response
    },
    mutations : {
        SET_RESPONSE : (state,payload) => state.response = payload
    },
    modules : {
        user,website, auth, chat
    }
})