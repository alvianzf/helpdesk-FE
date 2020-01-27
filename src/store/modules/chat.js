import { get, post, postImg, destroy } from '@/api'
import router from '@/router'
import io from 'socket.io-client';

const socket = io(`${process.env.VUE_APP_SOCKET_URL}`)

const state = {
    chat : {},
    chats : [],
    count : null,
    new_chat : 0,
    notifList : []
}

const getters = {
    getChat : (state) => state.chat,
    getChats : (state) => state.chats,
    getCount : (state) => state.count,
    getNewChat : (state) => state.new_chat,
    getNotifList : (state) => state.notifList
}

const actions = {
    GET_ACTIVE_LIST_BY_WESBITE_FOR_ADMIN : ({commit}, payload) => {
        socket.emit('get_list_chat_current_for_admin', payload)
        socket.on('list_chat_with_operator_for_admin', res => {
            commit('setChats', res.data)
        })
    },
    GET_ACTIVE_LIST_BY_WESBITE_FOR_OPERATOR : ({commit}, payload) => {
        socket.emit('get_list_chat_current', payload)
        socket.on('list_chat_with_operator', res => {
            commit('setChats', res.data)
        })
    },
    GET_ACTIVE_LIST : ({commit}) => {
        socket.emit('new_chat_for_admin')
        socket.on('list_new_chat_for_admin', res => {
            commit('setChats', res.data)
        })
    },
    GET_RECENT_LIST : ({commit}) => {
        socket.emit('get_list_close_chat')
        socket.on('list_close_chat', res => {
            commit('setChats', res.data)
        })
    },
    GET_RECENT_LIST_BY_WESBITE : ({commit}, payload) => {
        socket.emit('get_list_close_chat_with_operator', payload)
        socket.on('list_close_chat_with_operator', res => {
            commit('setChats', res.data)
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
        socket.emit('retrive_new_message', payload)
        socket.on('list_new_message', res => {
            commit('setChat', res.data)
        })
        socket.emit('waiting_new_chat_on_admin')
        socket.on('list_chat_on_admin', res => {
            commit('setNotifList', res.data)
        })
        socket.emit('waiting_new_chat_on_operator', payload)
        socket.on('list_chat_on_operator', res => {
            commit('setNotifList', res.data)
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
    ASSIGN_OPERATOR : ({commit, dispatch}, payload) => {
        post('api/chat/assign/operator', payload)
        .then(res => {
            // dispatch('GET_NEW_CHAT_ON_OPERATOR', payload)
            // dispatch('GET_NEW_CHAT_ON_ADMIN')
            socket.emit('waiting_new_chat_on_admin')
            socket.on('list_chat_on_admin', res => {
                commit('setNotifList', res.data)
            })
            socket.emit('waiting_new_chat_on_operator', payload)
            socket.on('list_chat_on_operator', res => {
                commit('setNotifList', res.data)
            })
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
    TRANSFER_CHAT : ({ commit}, payload) => {
        post('api/chat/transfer', payload)
        .then(res => {
            router.push('/app/chat/open')
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
    GET_NEW_CHAT_ON_OPERATOR : ({commit}, payload) => {
        // console.log('new_chat_operator')
        socket.emit('new_chat_for_operator', payload)
        socket.on('list_new_chat_for_operator', res => {
            commit('setChats', res.data)
        })
    },
    GET_NEW_CHAT_ON_ADMIN : ({commit}) => {
        // console.log('new_chat_admin')
        socket.emit('new_chat_for_admin')
        socket.on('list_new_chat_for_admin', res => {
            commit('setChats', res.data)
        })
    },
    WAITING_NEW_CHAT_ON_ADMIN : ({commit}) => {
        socket.emit('waiting_new_chat_on_admin')
        socket.on('list_chat_on_admin', res => {
            commit('setNotifList', res.data)
        })
    },
    WAITING_NEW_CHAT_ON_OPERATOR : ({commit}, payload) => {
        socket.emit('waiting_new_chat_on_operator', payload)
        socket.on('list_chat_on_operator', res => {
            commit('setNotifList', res.data)
        })
    },
    SET_READ : ({commit}, payload) => {
        post('api/chat/setread', payload)
        .then(res => {
            console.log('readed!!')
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    DELETE_CHAT : ({commit}, payload) => {
        destroy('api/chat/destroy', payload)
        .then(res => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            dispatch('GET_RECENT_LIST_BY_WESBITE', payload)
            dispatch('GET_RECENT_LIST')
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
    },
    setNewChat (state, payload) {
        state.new_chat = payload
    },
    setNotifList (state, payload) {
        state.notifList = payload
    }
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}