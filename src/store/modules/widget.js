import { get, post, put, destroy } from '@/api'

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