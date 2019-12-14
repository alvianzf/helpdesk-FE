
const state = {
  test: null,
}

const getters = {
    GET_TEST : state => state.test
}

const mutations = {
  SET_TEST(state, newState) {
    state.test = newState
  }
}

const actions = {
  fetchTest({ commit }) {
    commit('SET_TEST', "testing")
  }
}

export default {
    state : state,
    getters : getters,
    actions : actions,
    mutations : mutations
}