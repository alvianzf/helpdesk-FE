import { post } from '@api'
import router from '@router'

const state = {
    logined : {}
}

const getters = {
    getLoginend : (state) => state.logined
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
            router.push({ name : "home"})
        }).catch(error => {
            console.log(error)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    }
}

const mutations = {
    setLogined (state, payload) {
        state.logined = payload
    }
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}