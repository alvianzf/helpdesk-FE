import { post } from '@/api'
import router from '@/router'

const state = {
    logined : {},
    checkToken : true
}

const getters = {
    getLogined : (state) => state.logined,
    getCheckToken : (state) => state.checkToken
}

const actions = {
    POST_LOGIN : ({commit}, payload) => {
        commit('SET_LOADING', true)
        post('api/auth/login', payload)
        .then(res => {
            commit('setLogined', res.data.data)
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('username', res.data.data.username)
            localStorage.setItem('user_role', res.data.data.role)
            localStorage.setItem('user_name', res.data.data.name)
            localStorage.setItem('user_id', res.data.data.id)
            localStorage.setItem('user_website', res.data.data.website)
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            commit('SET_LOADING', false)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
            commit('SET_LOADING', false)
        })
    },
    CHECK_TOKEN : ({commit}, payload) => {
        post('api/auth/check/token', payload)
        .then(res => {
            commit('setCheckToken', true)
        }).catch(error => {
            commit('setCheckToken', false)
            localStorage.clear()
            router.push('/auth/login')
        })
    },
    CHANGE_PASSWORD : ({commit}, payload) => {
        post('api/auth/change/password', payload)
        .then(res => {
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
    RESET_PASSWORD : ({commit}, payload) => {
        post('api/auth/reset/password', payload)
        .then(res => {
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
    GET_LOGINED_USER : ({commit}, payload) => {
        post('api/auth/find', payload)
        .then((res) => {
            commit('setLogined', res.data.data)
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    LOGOUT : ({commit}, payload) => {
        post('api/auth/logout', payload)
        .then((res) => {
            commit('SET_RESPONSE', {
                success : true,
                message : 'Logout successfully'
            })
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : 'Failed to logout'
            })
        })
    }
}

const mutations = {
    setLogined (state, payload) {
        state.logined = payload
    },
    setCheckToken (state, payload) {
        state.checkToken = payload
    }
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}