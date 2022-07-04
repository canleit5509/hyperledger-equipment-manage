
import http from '../../service/api';
import router from '../../router/index'

const state = {
    userInfo: null,
}

const getters = {
    userInfo(state) {
        return state.userInfo
    },
    userRole() {
        if (state.userInfo) {
            return state.userInfo.role;
        }
        return '';
    }
};

const mutations = {
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
};

const actions = {
    login({ commit }, params) {
        http.post('/api/auth/login', params)
            .then((response) => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                console.log("Set info", response.data.user);
                commit('setUserInfo', response.data.user)
                router.push('/');
            }).catch((err) => {
                commit('ERROR/setErrorMessage', err.response.data.message, { root: true })
            })
    },
    getUserByToken({ commit }) {
        http.get('/api/user/me')
            .then((response) => {
                localStorage.setItem('user', JSON.stringify(response.data));
                console.log('user', response.data);
                commit('setUserInfo', response.data)
            }).catch((error) => {
                commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
                localStorage.clear()
                router.push('/login')
            })
    }, 
    logout({commit}) {
        localStorage.clear()
        router.push('/login')
    }, 
    clearErrorMessage({ commit }) {
        commit("clearError")
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
