import { get, post, postImg, destroy } from '@/api'

const state = {
    chat : {},
    chats : [],
    current_operator : null
}

const getters = {
    getChat : (state) => state.chat,
    getChats : (state) => state.chats,
    getCurrentOperator : (state) => state.current_operator

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
                    message : `${res.data} joined this chat`,
                    id : payload.id
                })
            }
            dispatch('GET_NEW_LIST_GLOBAL')
            dispatch('GET_NEW_LIST_GROUP', payload)
            dispatch('GET_CURRENT_LIST')
            commit('setCurrentOperator', res.data)
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
            dispatch('FIND_CHAT_BY_ID', payload)
            dispatch('GET_NEW_LIST_GLOBAL')
            dispatch('GET_NEW_LIST_GROUP', payload)
            dispatch('GET_CURRENT_LIST')
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
            dispatch('GET_NEW_LIST_GLOBAL')
            dispatch('GET_NEW_LIST_GROUP', payload)
            dispatch('GET_CURRENT_LIST')
            dispatch('FIND_CHAT_BY_ID', payload)
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
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            
        }).catch(error => {
            console.log(error)
            // commit('SET_RESPONSE', {
            //     success : false,
            //     message : error.response.data.message
            // })
        })
    },
    SET_READ_OPERATOR : ({commit}, payload) => {
        post('api/chat/setread', payload)
        .then(res => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
        }).catch(error => {
            console.log(error)
            // commit('SET_RESPONSE', {
            //     success : false,
            //     message : error.response.data.message
            // })
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
    }
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}