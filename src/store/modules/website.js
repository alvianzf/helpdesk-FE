import { get, post, put, destroy } from '@/api'

const state = {
    website : {},
    websites : []
}

const getters = {
    getWebsite : (state) => state.website,
    getWebsites : (state) => state.websites
}

const actions = {
    GET_WEBSITES : ({commit}) => {
        commit('SET_LOADING', true)
        get('api/website/list')
        .then(res => {
            commit('SET_LOADING', false)
            commit('setWebsites', res.data.data)
        }).catch(error => {
            commit('SET_LOADING', false)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_WEBSITE : ({commit}, payload) => {
        post('api/website/find', payload)
        .then((res) => {
            commit('setWebsite', res.data.data)
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    POST_WEBSITE : ({ commit, dispatch }, payload) => {
        post('api/website/save', payload)
        .then((res) => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            dispatch('GET_WEBSITES')
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    PUT_WEBSITE : ({ commit, dispatch }, payload) => {
        put('api/website/update', payload)
        .then((res) => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            dispatch('GET_WEBSITES')
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    DELETE_WEBSITE : ({ commit, dispatch}, payload) => {
        destroy('api/website/delete', payload)
        .then((res) => {
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            dispatch('GET_WEBSITES')
        })
        .catch((error) => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    }
}

const mutations = {
    setWebsites (state, payload) {
        state.websites = payload
    },
    setWebsite (state, payload) {
        state.website = payload
    },
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}