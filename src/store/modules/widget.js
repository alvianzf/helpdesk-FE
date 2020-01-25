import { get, post, postImg, destroy } from '@/api'
import router from '@/router'

const state = {
    widget : {},
    widgets : []
}

const getters = {
    getWidget : (state) => state.widget,
    getWidgets : (state) => state.widgets
}

const actions = {
    GET_WIDGETS : ({commit}) => {
        get('api/widget/list')
        .then(res => {
            commit('setWidgets', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    GET_WIDGET : ({commit}, payload) => {
        post('api/widget/find', payload)
        .then(res => {
            commit('setWidget', res.data.data)
        }).catch(error => {
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    UPDATE_WIDGET : ({commit}, payload) => {
        post('api/widget/update', payload)
        .then(res => {
            router.push('/app/setting/widget')
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
        }).catch(error => {
            console.log(error)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    CREATE_WELCOME_TEXT : ({commit,dispatch}, payload) => {
        post('api/widget/store/welcome-message', payload)
        .then(res => {
            dispatch('GET_WIDGET', payload)
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
        }).catch(error => {
            console.log(error)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    REMOVE_WELCOME_TEXT : ({commit, dispatch}, payload) => {
        destroy('api/widget/delete/welcome-message', payload)
        .then(res => {
            dispatch('GET_WIDGET', payload)
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
        }).catch(error => {
            console.log(error)
            commit('SET_RESPONSE', {
                success : false,
                message : error.response.data.message
            })
        })
    },
    UPLOAD_SPLASH : ({commit}, payload) => {
        postImg('api/widget/manage-splash-screen', payload)
        .then(res => {
            router.push('/app/setting/widget')
            commit('SET_RESPONSE', {
                success : true,
                message : res.data.message
            })
            
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
    setWidgets (state, payload) {
        state.widgets = payload
    },
    setWidget (state, payload) {
        state.widget = payload
    },
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}