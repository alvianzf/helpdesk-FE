import { get, post, postImg, destroy } from '@/api'
import io from 'socket.io-client';

const socket = io(`${process.env.VUE_APP_SOCKET_URL}`)

const state = {
    chat : {},
    chats : [],
    current_operator : null,
    message_event : {},
    reply_event : {},
    new_ticket_event : {},
    notifs : []
}

const getters = {
    getChat : (state) => state.chat,
    getChats : (state) => state.chats,
    getCurrentOperator : (state) => state.current_operator,
    getMessageEvent : (state) => state.message_event,
    getReplyEvent : (state) => state.reply_event,
    getNewTicketEvent : (state) => state.new_ticket_event,
    getNotifs : (state) => state.notifs
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
    setMessageEvent (state, payload) {
        state.message_event = payload
    },
    setReplyEvent (state, payload) {
        state.reply_event = payload
    },
    setNewTicketEvent (state, payload) {
        state.new_ticket_event = payload
    },
    setNotifs (state, payload) {
        state.notifs = payload
    }
}

const actions = {
    GET_NEW_LIST_GLOBAL : ({commit}) => {
        get('api/chat/list/new/global')
        .then(res => {
            commit('setChats', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_NEW_LIST_GROUP : ({commit}, payload) => {
        post('api/chat/list/new/group', payload)
        .then(res => {
            commit('setChats', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_CURRENT_LIST : ({commit}, payload) => {
        post('api/chat/list/active/chat', payload)
        .then(res => {
            commit('setChats', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_CLOSE_LIST_GLOBAL : ({commit}) => {
        get('api/chat/list/close/global')
        .then(res => {
            commit('setChats', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_CLOSE_LIST_GROUP : ({commit}, payload) => {
        post('api/chat/list/close/group', payload)
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
        })
        .catch(error => {
            console.log(error)
        })
    },
    CHAT_BY_ID : ({commit}, payload) => {
        post('api/chat/findbyidandsetminimize', payload)
        .then(res => {
            commit('setChat', res.data.data)
        })
        .catch(error => {
            console.log(error)
        })
    },
    ASSIGN_OPERATOR : ({commit, dispatch}, payload) => {
        post('api/chat/assign/operator', payload)
        .then(response => {
            if(response.data.code != 443) {
                dispatch('SEND_MESSAGE_SYSTEM', {
                    message : `${response.data.data.active_operator.name} joined this chat`,
                    id : payload.id
                })
                
            }
            dispatch('GET_NEW_LIST_GLOBAL')
            dispatch('GET_NEW_LIST_GROUP', payload)
            dispatch('GET_CURRENT_LIST')
            socket.emit('notif_event', "new operator")
            commit('setCurrentOperator', response.data)
        }).catch(error => {
            console.log(error)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    SEND_MESSAGE : ({commit, dispatch}, payload) => {
        post('api/chat/new/message/operator', payload)
        .then(res => {
            socket.emit('send_message', payload)
            dispatch('FIND_CHAT_BY_ID', payload)
        }).catch(error => {
            console.log(error)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    SEND_MESSAGE_SYSTEM : ({commit, dispatch}, payload) => {
        post('api/chat/new/message/system', payload)
        .then(res => {
            socket.emit('send_message', payload)
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
            socket.emit('send_message', payload)
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
            dispatch('FIND_CHAT_BY_ID', payload)
            dispatch('GET_NEW_LIST_GLOBAL')
            dispatch('GET_NEW_LIST_GROUP', payload)
            dispatch('GET_CURRENT_LIST')
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            socket.emit('notif_event', "new operator")
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
            dispatch('GET_NEW_LIST_GLOBAL')
            dispatch('GET_NEW_LIST_GROUP', payload)
            dispatch('GET_CURRENT_LIST')
            dispatch('FIND_CHAT_BY_ID', payload)
            socket.emit('notif_event', "new operator")
            socket.emit('send_message', payload)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    SET_READ : ({commit}, payload) => {
        post('api/chat/setread', payload)
        .then(res => {
            socket.emit('notif_event', "new operator")
        }).catch(error => {
            console.log(error)
        })
    },
    SET_READ_OPERATOR : ({commit}, payload) => {
        post('api/chat/setread', payload)
        .then(res => {
            socket.emit('notif_event', "new operator")
        }).catch(error => {
            console.log(error)
        })
    },
    DELETE_CHAT : ({commit, dispatch}, payload) => {
        destroy('api/chat/destroy', payload)
        .then(res => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            dispatch('GET_NEW_LIST_GLOBAL')
            dispatch('GET_NEW_LIST_GROUP', payload)
            dispatch('GET_CURRENT_LIST')
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_MESSAGE_EVENT : ({commit, dispatch}) => {
        socket.on('get_message', res => {
            commit('setMessageEvent',res.data)
        })
    },
    GET_REPLY_EVENT : ({commit}) => {
        socket.on('get_reply_client', res => {
            commit('setReplyEvent',res.data)
        })
    },
    GET_NEW_TICKET_EVENT : ({commit}) => {
        socket.on('get_new_ticket', res => {
            commit('setNewTicketEvent',res.data)
        })
    },
    GET_NOTIF : ({commit}, payload) => {
        post('api/chat/notif/list', payload)
        .then(res => {
            commit('setNotifs', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_NOTIF_EVENT : ({dispatch}, payload) => {
        socket.on('get_notif_event', res => {
            dispatch('GET_NOTIF', payload)
        })
    }
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}