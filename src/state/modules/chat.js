import { get, post, put, destroy } from '@api'
import io from 'socket.io-client';

const socket = io(`${process.env.VUE_APP_SOCKET_URL}`)

const state = {
    chat : {},
    chats : [],
    count : null
}

const getters = {
    getChat : (state) => state.chat,
    getChats : (state) => state.chats,
    getCount : (state) => state.count
}

const actions = {
    GET_ACTIVE_LIST_BY_WESBITE : ({commit}, payload) => {
        post('api/chat/list/active/bywebsite', payload)
        .then(res => {
            commit('setChats', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    LIST_UNOPERATOR_BY_WEBSITE : ({ dispatch, commit }, payload) => {
        socket.emit('get_list_chat_unoperator', payload)
        socket.on('unoperator_list_chat', res => {
            commit('setCount', res.data.length)
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
    setCount (state, payload) {
        state.count = payload
    }
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}