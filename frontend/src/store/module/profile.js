import http from '../../service/api';
import Vue from 'vue';
const state = {
    urlAvt: null,
}

const getters = {
    urlAvt(state) {
        return state.urlAvt
    },
};

const mutations = {
    clearError(state) {
        state.error = null
        state.errorPw = null
    },
    setUrlAvt(state, url) {
        state.urlAvt = url
    },
};

const actions = {
    async getUrlAvt({
        commit
    }, fileAvt) {
        await http.getUrlImg(fileAvt)
            .then((response) => {
                commit("setUrlAvt", response.data.url)
            }).catch((error) => {
                console.log(error);
            })
    },
    async changeUserInfo({
        commit,
        dispatch
    }, userData) {
        await http.put('/api/user/me', userData, 'Update information successfully').then(() => {
            dispatch("AUTH/getUserByToken", {}, { root: true });
        }).catch((err) => {
            commit("setError", err.response.data.message)
            console.log(err.response.data.message);
        })
    },
    async changePassword({
        commit
    }, passwordData) {
        await http.post('/api/auth/password_change', passwordData, 'Update password successfully')
            .then(() => {
                commit("clearError")
            }).catch((error) => {
                commit("setErrorPw", "Current password is incorrect")
                console.log(error);
            })
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}