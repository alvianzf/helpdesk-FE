import { get, post, postImg, destroy } from '@/api'
import router from '@/router'
import io from 'socket.io-client';

const socket = io(`${process.env.VUE_APP_SOCKET_URL}`)

const state = {
    chat : {},
    chats : [],
    current_operator : null,
    visitor_typing : false,
    operator_typing : null,
    newNotif : [],
    currentNofif : [],
    notif : []
}

const getters = {
    getChat : (state) => state.chat,
    getChats : (state) => state.chats,
    getCurrentOperator : (state) => state.current_operator,
    getVisitorTyping : (state) => state.visitor_typing,
    getOperatorTyping : (state) => state.operator_typing,
    getNewNotif : (state) => state.newNotif,
    getCurrentNofif : (state) => state.currentNofif,
    getNotif : (state) => state.notif
}

const mutations = {
    setChat (state, payload) {
        state.chat = payload
    },
    setChats (state, payload) {
        state.chats = payload
    },
    setCurrentOperator (state, payload) {
        state.current_operator = payload
    },
    setVisitorTyping (state, payload) {
        state.visitor_typing = payload
    },
    setOperatorTyping (state, payload) {
        state.operator_typing = payload
    },
    setNewNotif (state, payload) {
        state.newNotif = payload
    },
    setCurrentNotif (state, payload) {
        state.currentNofif = payload
    },
    setNotif (state, payload) {
        state.notif = payload
    }
}

const actions = {
    GET_NOTIFICATION : ({commit}) => {
        socket.emit('notification_list_global')
        socket.on('get_notification_list_global', res => {
            commit('setNotif', res.data)
        })
    },
    GET_NOTIFICATION_GROUP : ({commit}, payload) => {
        socket.emit('notification_list_group', payload)
        socket.on('get_notification_list_group', res => {
            commit('setNotif', res.data)
        })
    },
    GET_NEW_LIST_GLOBAL : ({commit}) => {
        socket.emit('new_list_global')
        socket.on('get_new_list_global', res => {
            commit('setChats', res.data)
        })
    },
    GET_NEW_LIST_GROUP : ({commit}, payload) => {
        socket.emit('new_list_group', payload)
        socket.on('get_new_list_group', res => {
            commit('setChats', res.data)
        })
    },
    GET_CURRENT_LIST : ({commit}, payload) => {
        socket.emit('current_list_chat', payload)
        socket.on('get_current_list', res => {
            commit('setChats', res.data)
        })
    },
    GET_CLOSE_LIST_GLOBAL : ({commit}) => {
        socket.emit('close_list_global')
        socket.on('get_close_list_global', res => {
            commit('setChats', res.data)
        })
    },
    GET_CLOSE_LIST_GROUP : ({commit}, payload) => {
        socket.emit('close_list_group', payload)
        socket.on('get_close_list_group', res => {
            commit('setChats', res.data)
        })
    },
    FIND_CHAT_BY_ID : ({commit}, payload) => {
        socket.emit('send_message', payload)
        socket.on('get_message', res => {
            commit('setChat', res.data)
        })
    },
    ASSIGN_OPERATOR : ({commit, dispatch}, payload) => {
        post('api/chat/assign/operator', payload)
        .then(response => {
            socket.emit('assigned_operator', payload)
            socket.on('get_current_operator', res => {
                if(response.data.code != 443) {
                    dispatch('SEND_MESSAGE_SYSTEM', {
                        message : `${res.data} joined this chat`,
                        id : payload.id
                    })
                }
                socket.emit('notification_list_global')
                socket.emit('notification_list_group', payload)
                // console.log(res)
                commit('setCurrentOperator', res.data)
            })
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
    SEND_MESSAGE_SYSTEM : ({commit, dispatch}, payload) => {
        post('api/chat/new/message/system', payload)
        .then(res => {
            dispatch('FIND_CHAT_BY_ID', payload)
        }).catch(error => {
            
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
            dispatch('SEND_MESSAGE_SYSTEM', {
                message : `chat ended by ${res.data.data.active_operator.name}`,
                id : payload.id
            })
            socket.emit('notification_list_global')
            socket.emit('notification_list_group', payload)
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
    TRANSFER_CHAT : ({ commit,dispatch}, payload) => {
        post('api/chat/transfer', payload)
        .then(res => {
            dispatch('SEND_MESSAGE_SYSTEM', {
                message : `chat transfered to ${res.data.data.active_operator.name}`,
                id : payload.id
            })
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            socket.emit('notification_list_global')
            socket.emit('notification_list_group', { website : res.data.data.website})

            router.push('/app/chat/open')
        }).catch(error => {
            console.log(error)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_VISITOR_TYPING : ({commit}) => {
        socket.emit('visitor_typing')
        socket.on('set_visitor_typing', res => {
            commit('setVisitorTyping', res.data)
        })
    },
    FETCH_OPERATOR_TYPING : ({commit}, payload) => {
        socket.emit('operator_typing', payload)
        socket.on('set_operator_typing', res => {
            commit('setOperatorTyping', res.data)
        })
    },
    SET_READ : ({commit}, payload) => {
        console.log(payload)
        post('api/chat/setread', payload)
        .then(res => {
            console.log(res)
            socket.emit('notification_list_global')
            socket.emit('notification_list_group', { website : res.data.data.website})
        }).catch(error => {
            console.log(error)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    DELETE_CHAT : ({commit, dispatch}, payload) => {
        destroy('api/chat/destroy', payload)
        .then(res => {
            console.log(res)
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            dispatch('GET_CLOSE_LIST_GROUP', payload)
            dispatch('GET_CLOSE_LIST_GLOBAL')
        }).catch(error => {
            console.log(error)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    FETCH_NEW_NOTIF_GLOBAL : ({commit}) => {
        socket.emit('new_notification_list_global')
        socket.on('get_new_notification_list_global', res => {
            commit('setNewNotif', res.data)
        })
    },
    FETCH_NEW_NOTIF_GROUP : ({commit}, payload) => {
        socket.emit('new_notification_list_group', payload)
        socket.on('get_new_notification_list_group', res => {
            commit('setNewNotif', res.data)
        })
    },
    FETCH_CURRENT_NOTIF_GLOBAL : ({commit}) => {
        socket.emit('current_notification_list_global')
        socket.on('get_current_notification_list_global', res => {
            commit('setCurrentNotif', res.data)
        })
    },
    FETCH_CURRENT_NOTIF_GROUP : ({commit}, payload) => {
        socket.emit('current_notification_list_group', payload)
        socket.on('get_current_notification_list_group', res => {
            commit('setCurrentNotif', res.data)
        })
    }
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}