import { get, post, put, destroy } from '@/api'
import router from '@/router'

const state = {
    suggest : {},
    suggests : []
}

const getters = {
    getSuggest : (state) => state.suggest,
    getSuggests : (state) => state.suggests
}

const actions = {
    GET_SUGGESTS : ({commit}) => {
        commit('SET_LOADING', true)
        get('api/suggest/list')
        .then(res => {
            commit('setSuggests', res.data.data)
            commit('SET_LOADING', false)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
            commit('SET_LOADING', false)
        })
    },
    GET_SUGGESTS_BY_WEBSITE : ({commit}, payload) => {
        commit('SET_LOADING', true)
        post('api/suggest/list/bywebsite', payload)
        .then(res => {
            commit('setSuggests', res.data.data)
            commit('SET_LOADING', false)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
            commit('SET_LOADING', false)
        })
    },
    GET_SUGGEST : ({commit}, payload) => {
        commit('SET_LOADING', true)
        post('api/suggest/find', payload)
        .then(res => {
            commit('setSuggest', res.data.data)
            commit('SET_LOADING', false)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
            commit('SET_LOADING', false)
        })
    },
    STORE_SUGGEST : ({commit, dispatch}, payload) => {
        commit('SET_LOADING', true)
        post('api/suggest/save', payload)
        .then(res => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            commit('SET_LOADING', false)
            dispatch('GET_SUGGESTS')
        }).catch(error => {
            console.log(error)
            commit('SET_LOADING', false)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    UPDATE_SUGGEST : ({commit , dispatch}, payload) => {
        commit('SET_LOADING', true)
        put('api/suggest/update', payload)
        .then(res => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            commit('SET_LOADING', false)
            dispatch('GET_SUGGESTS')
        }).catch(error => {
            console.log(error)
            commit('SET_LOADING', false)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    DELETE_SUGGEST : ({commit, dispatch}, payload) => {
        destroy('api/suggest/delete', payload)
        .then(res => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            dispatch('GET_SUGGESTS')
            commit('SET_LOADING', false)
        }).catch(error => {
            console.log(error)
            commit('SET_LOADING', false)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    }
}

const mutations = {
    setSuggests (state, payload) {
        state.suggests = payload
    },
    setSuggest (state, payload) {
        state.suggest = payload
    },
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}