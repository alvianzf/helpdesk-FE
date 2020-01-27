import { get, post, postImg, destroy } from '@/api'
import router from '@/router'
import io from 'socket.io-client';

const socket = io(`${process.env.VUE_APP_SOCKET_URL}`)

const state = {
    chat : {},
    chats : []
}

const getters = {
    getChat : (state) => state.chat,
    getChats : (state) => state.chats
}

const actions = {
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
    // FIND_CHAT_BY_ID : ({commit}, payload) => {
    //     socket.emit('retrive_new_message', payload)
    //     socket.on('list_new_message', res => {
    //         commit('setChat', res.data)
    //     })
    //     socket.emit('waiting_new_chat_on_admin')
    //     socket.on('list_chat_on_admin', res => {
    //         commit('setNotifList', res.data)
    //     })
    //     socket.emit('waiting_new_chat_on_operator', payload)
    //     socket.on('list_chat_on_operator', res => {
    //         commit('setNotifList', res.data)
    //     })
    // },
    // SEND_MESSAGE : ({commit, dispatch}, payload) => {
    //     post('api/chat/new/message/operator', payload)
    //     .then(res => {
    //         dispatch('FIND_CHAT_BY_ID', payload)
    //     }).catch(error => {
    //         commit('SET_RESPONSE', {
    //             success : false,
    //             message : error.response.data.message
    //         })
    //     })
    // },
    // ASSIGN_OPERATOR : ({commit, dispatch}, payload) => {
    //     post('api/chat/assign/operator', payload)
    //     .then(res => {
    //         // dispatch('GET_NEW_CHAT_ON_OPERATOR', payload)
    //         // dispatch('GET_NEW_CHAT_ON_ADMIN')
    //         socket.emit('waiting_new_chat_on_admin')
    //         socket.on('list_chat_on_admin', res => {
    //             commit('setNotifList', res.data)
    //         })
    //         socket.emit('waiting_new_chat_on_operator', payload)
    //         socket.on('list_chat_on_operator', res => {
    //             commit('setNotifList', res.data)
    //         })
    //     }).catch(error => {
    //         commit('SET_RESPONSE', {
    //             success : false,
    //             message : error.response.data.message
    //         })
    //     })
    // },
    // SEND_MESSAGE_IMAGE : ({commit, dispatch}, payload) => {
    //     var form = new FormData()
    //     form.set('attach', payload.attach)
    //     form.set('id', payload.id)
    //     postImg('api/chat/attach/operator', form)
    //     .then(res => {
    //         dispatch('FIND_CHAT_BY_ID', payload)
    //     }).catch(error => {
    //         commit('SET_RESPONSE', {
    //             success : false,
    //             message : error.response.data.message
    //         })
    //     })
    // },
    // CLOSE_CHAT : ({commit, dispatch}, payload) => {
    //     post('api/chat/close', payload)
    //     .then(res => {
    //         dispatch('FIND_CHAT_BY_ID', payload)
    //         commit('SET_RESPONSE', {
    //             success : true,
    //             message : res.data.message
    //         })
    //     }).catch(error => {
    //         commit('SET_RESPONSE', {
    //             success : false,
    //             message : error.response.data.message
    //         })
    //     })
    // },
    // TRANSFER_CHAT : ({ commit}, payload) => {
    //     post('api/chat/transfer', payload)
    //     .then(res => {
    //         router.push('/app/chat/open')
    //         commit('SET_RESPONSE', {
    //             success : true,
    //             message : res.data.message
    //         })
    //     }).catch(error => {
    //         commit('SET_RESPONSE', {
    //             success : false,
    //             message : error.response.data.message
    //         })
    //     })
    // },
    // GET_NEW_CHAT_ON_OPERATOR : ({commit}, payload) => {
    //     // console.log('new_chat_operator')
    //     socket.emit('new_chat_for_operator', payload)
    //     socket.on('list_new_chat_for_operator', res => {
    //         commit('setChats', res.data)
    //     })
    // },
    // GET_NEW_CHAT_ON_ADMIN : ({commit}) => {
    //     // console.log('new_chat_admin')
    //     socket.emit('new_chat_for_admin')
    //     socket.on('list_new_chat_for_admin', res => {
    //         commit('setChats', res.data)
    //     })
    // },
    // WAITING_NEW_CHAT_ON_ADMIN : ({commit}) => {
    //     socket.emit('waiting_new_chat_on_admin')
    //     socket.on('list_chat_on_admin', res => {
    //         commit('setNotifList', res.data)
    //     })
    // },
    // WAITING_NEW_CHAT_ON_OPERATOR : ({commit}, payload) => {
    //     socket.emit('waiting_new_chat_on_operator', payload)
    //     socket.on('list_chat_on_operator', res => {
    //         commit('setNotifList', res.data)
    //     })
    // },
    // SET_READ : ({commit}, payload) => {
    //     post('api/chat/setread', payload)
    //     .then(res => {
    //         console.log('readed!!')
    //     }).catch(error => {
    //         commit('SET_RESPONSE', {
    //             success : false,
    //             message : error.response.data.message
    //         })
    //     })
    // },
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
    // GET_NEW_LIST_GLOBAL : ({commit}, payload) => {
    //     socket.emit('new_channel_created', {
    //         website : null
    //     })
    //     socket.on('list_new_chat_global', res => {
    //         commit('setNotifList', res.data)
    //         commit('setChats', res.data)
    //     })
    // },
    // GET_NEW_LIST_GROUP : ({commit}, payload) => {
    //     socket.emit('new_channel_created', {
    //         website : payload.website
    //     })
    //     socket.on('list_new_chat_group', res => {
    //         commit('setNotifList', res.data)
    //         commit('setChats', res.data)
    //     })
    // }
}

const mutations = {
    setChat (state, payload) {
        state.chat = payload
    },
    setChats (state, payload) {
        state.chats = payload
    }
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}