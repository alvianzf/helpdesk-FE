import { get, post, put, destroy } from '@/api'

const state = {
    user : {},
    users : []
}

const getters = {
    getUser : (state) => state.user,
    getUsers : (state) => state.users
}

const actions = {
    GET_USER_AS_ROLE : ({commit}, payload) => {
        post('api/auth/list/asrole', payload)
        .then(res => {
            commit('setUsers', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_USER_AS_ROLE_AS_WEB : ({commit}, payload) => {
        post('api/auth/list/asroleasweb', payload)
        .then(res => {
            commit('setUsers', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        }) 
    },
    GET_USER : ({commit}, payload) => {
        post('api/auth/find', payload)
        .then((res) => {
            commit('setUser', res.data.data)
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    POST_USER : ({ commit, dispatch }, payload) => {
        post('api/auth/register', payload)
        .then((res) => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            dispatch('GET_USER_AS_ROLE', {
                role : payload.call_role
            })
            if(payload.call_website) {
                dispatch('GET_USER_AS_ROLE_AS_WEB', {
                    role : payload.call_role,
                    website : payload.call_website
                })
            }
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    PUT_USER : ({ commit, dispatch }, payload) => {
        put('api/auth/update', payload)
        .then((res) => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            dispatch('GET_USER_AS_ROLE', {
                role : payload.call_role
            })
            if(payload.call_website) {
                dispatch('GET_USER_AS_ROLE_AS_WEB', {
                    role : payload.call_role,
                    website : payload.call_website
                })
            }
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    DELETE_USER : ({ commit, dispatch}, payload) => {
        destroy('api/auth/delete', payload)
        .then((res) => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            dispatch('GET_USER_AS_ROLE', {
                role : payload.call_role
            })
            if(payload.call_website) {
                dispatch('GET_USER_AS_ROLE_AS_WEB', {
                    role : payload.call_role,
                    website : payload.call_website
                })
            }
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    USERS_BY_WEBSITE : ({commit}, payload) => {
        post('api/auth/list/cso/bywebsite', payload)
        .then((res) => {
            commit('setUsers', res.data.data)
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    CURRENT_USER : ({commit}, payload) => {
        post('api/auth/find', payload)
        .then((res) => {
            commit('setUser', res.data.data)
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    CHANGE_ACCOUNT : ({ commit, dispatch }, payload) => {
        put('api/auth/update/edit', payload)
        .then((res) => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            dispatch('GET_USERS')
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
}

const mutations = {
    setUsers (state, payload) {
        state.users = payload
    },
    setUser (state, payload) {
        state.user = payload
    },
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}