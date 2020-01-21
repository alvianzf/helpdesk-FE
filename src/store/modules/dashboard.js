import { get, post } from '@/api'

const state = {
    total_count : 0,
    total_open : 0,
    total_active : 0,
    total_close : 0
}

const getters = {
    getTotalCount : (state) => state.total_count,
    getTotalOpen : (state) => state.total_open,
    getTotalActive : (state) => state.total_active,
    getTotalClose : (state) => state.total_close
}

const actions = {
    COUNT_ALL_CHAT_OPERATOR : ({commit}, payload) => {
        post('api/chat/count/chatoperator', payload)
        .then(res => {
            commit('setTotalCount', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    COUNT_CHAT : ({commit}) => {
        get('api/chat/count/chat')
        .then(res => {
            commit('setTotalCount', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    COUNT_OPEN_CHAT_OPERATOR : ({ commit}, payload) => {
        post('api/chat/count/chatopenoperator', payload)
        .then(res => {
            commit('setTotalOpen', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    COUNT_CHAT_OPEN : ({commit}) => {
        get('api/chat/count/chatopen')
        .then(res => {
            commit('setTotalOpen', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    COUNT_ACTIVE_CHAT_OPERATOR : ({ commit}, payload) => {
        post('api/chat/count/chatactiveoperator', payload)
        .then(res => {
            commit('setTotalActive', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    COUNT_CHAT_ACTIVE: ({commit}) => {
        get('api/chat/count/chatactive')
        .then(res => {
            commit('setTotalActive', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    COUNT_CLOSE_CHAT_OPERATOR : ({ commit}, payload) => {
        post('api/chat/count/chatcloseoperator', payload)
        .then(res => {
            commit('setTotalClose', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    COUNT_CHAT_CLOSE: ({commit}) => {
        get('api/chat/count/chatclose')
        .then(res => {
            commit('setTotalClose', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
}

const mutations = {
    setTotalCount (state, payload) {
        state.total_count = payload
    },
    setTotalOpen (state, payload) {
        state.total_open = payload
    },
    setTotalActive (state, payload) {
        state.total_active = payload
    },
    setTotalClose (state, payload) {
        state.total_close = payload
    }
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}