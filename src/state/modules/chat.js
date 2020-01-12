import { get, post, put, destroy } from '@api'

const state = {
    chat : {},
    chats : []
}

const getters = {
    getChat : (state) => state.chat,
    getChats : (state) => state.chats
}

const actions = {
    GET_ACTIVE_LIST : ({commit}) => {
        get('api/chat/list/active')
        .then(res => {
            commit('setChats', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_ACTIVE_LIST_BY_OPERATOR : ({commit}, payload) => {
        post('api/chat/list/active/byoperator', payload)
        .then(res => {
            commit('setChats', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_CHAT_DETAIL : ({commit}, payload) => {
        post('api/chat/list/message/bychannel', payload)
        .then(res => {
            commit('setChat', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    }
}

const mutations = {
    setChat (state, payload) {
        state.chat = payload
    },
    setChats (state, payload) {
        state.chats = payload
    },
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}