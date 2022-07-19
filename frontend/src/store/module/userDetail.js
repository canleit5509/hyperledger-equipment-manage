import http from '../../service/api';

const state = {
    userDetail: {
        name: null,
        email: null,
        phone: null,
        department: null,
        position: null,
        avatar: null,
        role: null,
    },
    userEquipments: null,
    userRequests: null,
}

const getters = {
    userDetail() {
        return state.userDetail;
    },
    userEquipments() {
        return state.userEquipments;
    },
    userRequests() {
        return state.userRequests;
    }
}

const mutations = {
    setUserDetail(state, data) {
        state.userDetail = data;
    },
    setUserEquipments(state, data) {
        state.userEquipments = data;
    },
    setUserRequests(state, data) {
        state.userRequests = data;
    },
}

const actions = {
    async getUserDetail({
        commit
    }, id) {
        await http
            .get(`/api/user/${id}`)
            .then((response) => {
                commit("setUserDetail", response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    async getUserEquipments({
        commit
    }, id) {
        await http
            .get(`/api/equipment/user/${id}`)
            .then((response) => {
                commit("setUserEquipments", response.data.docs);
            })
            .catch((error) => {
                console.log(error);
            });
    },
    async removeDevice({
        dispatch
    }, data) {
        console.log(data);
        await http
            .post(`/api/user/equipment/remove/${data.user}`, data, "Remove device successfully")
            .then(() => {
                dispatch('getUserEquipments', data.user)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    async addDevice({dispatch}, data) {
        await http
            .post(`/api/user/equipment/add/${data.user}`, data, "Add device successfully")
            .then(() => {
                dispatch('getUserEquipments', data.user)
            })
            .catch((error) => {
                console.log(error);
            });
    },
    resetUserDetail({
        commit
    }) {
        commit("setUserDetail", {
            name: null,
            email: null,
            phone: null,
            department: null,
            position: null,
            avatar: null,
            role: null,
        });
    },
    resetUserEquipments({
        commit
    }) {
        commit("setUserEquipments", null);
    }
    

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
