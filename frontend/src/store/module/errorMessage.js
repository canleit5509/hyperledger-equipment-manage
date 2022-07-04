const state = {
    errorMessage: ''
}

const getters = {
    errorMessage(state) {
        return state.errorMessage
    }
}

const mutations = {
    clearErrorMessage(state) {
        state.errorMessage = null
    },
    setErrorMessage(state, error) {
        if (typeof(error) == 'object') error = Object.values(error);
        state.errorMessage = error
    }
}
const actions = {
    clearErrorMessage({commit}) {
        commit('clearErrorMessage')
    }
}

export default {
    namespaced: true,
    state, 
    getters,
    mutations,
    actions
}