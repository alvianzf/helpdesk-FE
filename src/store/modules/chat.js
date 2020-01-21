import { get, post, postImg } from '@/api'
import router from '@/router'

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
    GET_RECENT_LIST : ({commit}) => {
        get('api/chat/list/recent')
        .then(res => {
            commit('setChats', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_RECENT_LIST_BY_WESBITE : ({commit}, payload) => {
        post('api/chat/list/recent/bywebsite', payload)
        .then(res => {
            commit('setChats', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    LIST_UNOPERATOR_BY_WEBSITE : ({ commit }, payload) => {
      post('api/chat/list/noperator', payload)
      .then(res => {
          commit('setChats', res.data.data)
      }).catch(error => {
          commit('SET_RESPONSE', {
              success : false,
              message : error.response.data.message
          })
      })
    },
    FIND_CHAT_BY_ID : ({commit}, payload) => {
        post('api/chat/findbyid', payload)
        .then(res => {
            commit('setChat', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    SEND_MESSAGE : ({commit, dispatch}, payload) => {
        post('api/chat/new/message/operator', payload)
        .then(res => {
            dispatch('FIND_CHAT_BY_ID', payload)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    ASSIGN_OPERATOR : ({commit}, payload) => {
        post('api/chat/assign/operator', payload)
        .then(res => {
            
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    SEND_MESSAGE_IMAGE : ({commit, dispatch}, payload) => {
        var form = new FormData()
        form.set('attach', payload.attach)
        form.set('id', payload.id)
        postImg('api/chat/attach/operator', form)
        .then(res => {
            dispatch('FIND_CHAT_BY_ID', payload)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    CLOSE_CHAT : ({commit, dispatch}, payload) => {
        post('api/chat/close', payload)
        .then(res => {
            dispatch('FIND_CHAT_BY_ID', payload)
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    TRANSFER_CHAT : ({ commit, dispatch}, payload) => {
        post('api/chat/transfer', payload)
        .then(res => {
            router.push({ name : "chat.active.list"})
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
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