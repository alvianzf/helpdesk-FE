import Vue from  'vue'
import Vuex from 'vuex'
import user from './modules/user'

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
        user
    }
})