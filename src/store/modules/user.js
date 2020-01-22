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
    GET_ADMINS : ({commit}) => {
        get('api/auth/list/admin')
        .then(res => {
            commit('setUsers', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_USERS : ({commit}) => {
        get('api/auth/list/cso')
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
            dispatch('GET_ADMINS')
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
            dispatch('GET_ADMINS')
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
            dispatch('GET_ADMINS')
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    POST_CSO : ({ commit, dispatch }, payload) => {
        post('api/auth/register', payload)
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
    PUT_CSO : ({ commit, dispatch }, payload) => {
        put('api/auth/update', payload)
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
    DELETE_CSO : ({ commit, dispatch}, payload) => {
        destroy('api/auth/delete', payload)
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