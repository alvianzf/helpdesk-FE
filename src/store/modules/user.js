import { get, post, put, destroy } from '@/api'

const state = {
    user : {},
    users : [],
    online_agents : []
}

const getters = {
    getUser : (state) => state.user,
    getUsers : (state) => state.users,
    getOnlineAgents : (state) => state.online_agents
}

const actions = {
    GET_USER_AS_ROLE : ({commit}, payload) => {
        commit('SET_LOADING', true)
        post('api/auth/list/asrole', payload)
        .then(res => {
            commit('setUsers', res.data.data)
            commit('SET_LOADING', false)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
            commit('SET_LOADING', false)
        })
    },
    GET_USER_AS_ROLE_AS_WEB : ({commit}, payload) => {
        commit('SET_LOADING', true)
        post('api/auth/list/asroleasweb', payload)
        .then(res => {
            commit('setUsers', res.data.data)
            commit('SET_LOADING', false)
        }).catch(error => {
            console.log(error)
            // commit('SET_RESPONSE', {
            //     success : false,
            //     message : error.response.data.message
            // })
            commit('SET_LOADING', false)
        }) 
    },
    GET_ONLINE_AGENT : ({commit}, payload) => {
        commit('SET_LOADING', true)
        post('api/auth/list/asroleasweb', payload)
        .then(res => {
            commit('setOnlineAgents', res.data.data)
            commit('SET_LOADING', false)
        }).catch(error => {
            console.log(error)
            // commit('SET_RESPONSE', {
            //     success : false,
            //     message : error.response.data.message
            // })
            commit('SET_LOADING', false)
        }) 
    },
    GET_USER : ({commit}, payload) => {
        commit('SET_LOADING', true)
        post('api/auth/find', payload)
        .then((res) => {
            commit('setUser', res.data.data)
            commit('SET_LOADING', false)
        })
        .catch((error) => {
            commit('SET_LOADING', false)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    POST_USER : ({ commit, dispatch }, payload) => {
        commit('SET_LOADING', true)
        post('api/auth/register', payload)
        .then((res) => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            commit('SET_LOADING', false)
            dispatch('GET_USER_AS_ROLE', {
                role : payload.call_role
            })
            if(payload.call_website != null && payload.call_website != "null") {
                dispatch('GET_USER_AS_ROLE_AS_WEB', {
                    role : payload.call_role,
                    website : payload.call_website
                })
            }
        })
        .catch((error) => {
            commit('SET_LOADING', false)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    PUT_USER : ({ commit, dispatch }, payload) => {
        commit('SET_LOADING', true)
        put('api/auth/update', payload)
        .then((res) => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            commit('SET_LOADING', false)
            dispatch('GET_USER_AS_ROLE', {
                role : payload.call_role
            })
            if(payload.call_website != null && payload.call_website != "null") {
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
            commit('SET_LOADING', false)
        })
    },
    DELETE_USER : ({ commit, dispatch}, payload) => {
        commit('SET_LOADING', true)
        destroy('api/auth/delete', payload)
        .then((res) => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            commit('SET_LOADING', false)
            dispatch('GET_USER_AS_ROLE', {
                role : payload.call_role
            })
            if(payload.call_website != null && payload.call_website != "null") {
                dispatch('GET_USER_AS_ROLE_AS_WEB', {
                    role : payload.call_role,
                    website : payload.call_website
                })
            }
        })
        .catch((error) => {
            commit('SET_LOADING', false)
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
        commit('SET_LOADING', true)
        put('api/auth/update/edit', payload)
        .then((res) => {
            commit('SET_LOADING', false)
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
        })
        .catch((error) => {
            commit('SET_LOADING', false)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    }
}

const mutations = {
    setUsers (state, payload) {
        state.users = payload
    },
    setUser (state, payload) {
        state.user = payload
    },
    setOnlineAgents (state, payload) {
        state.online_agents = payload
    }
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}