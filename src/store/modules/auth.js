import { post } from '@/api'
import router from '@/router'

const state = {
    logined : {},
    checkToken : true
}

const getters = {
    getLoginend : (state) => state.logined,
    getCheckToken : (state) => state.checkToken
}

const actions = {
    POST_LOGIN : ({commit}, payload) => {
        post('api/auth/login', payload)
        .then(res => {
            commit('setLogined', res.data.data)
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('user_email', res.data.data.email)
            localStorage.setItem('user_role', res.data.data.role)
            localStorage.setItem('user_name', res.data.data.name)
            localStorage.setItem('user_phone', res.data.data.phone)
            localStorage.setItem('user_id', res.data.data.id)
            localStorage.setItem('user_website', res.data.data.website)
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
    CHECK_TOKEN : ({commit}, payload) => {
        post('api/auth/check/token', payload)
        .then(res => {
            commit('setCheckToken', true)
        }).catch(error => {
            commit('setCheckToken', false)
            localStorage.clear()
            router.push('/user/login')
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