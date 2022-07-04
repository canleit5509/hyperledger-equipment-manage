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
        commit
    }, userData) {
        await http.put('/profile', userData, 'Update information successfully').then(() => {
            commit("clearError")
        }).catch((err) => {
            commit("setError", err.response.data.message.email[0])
            console.log(err.response.data.message.email[0]);
        })
    },
    async changePassword({
        commit
    }, passwordData) {
        await http.put('/password', passwordData, 'Update password successfully')
            .then(() => {
                console.log(passwordData);
                commit("clearError")
            }).catch((error) => {
                Vue.toasted.show('Something was wrong!!')
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