import http from '../../service/api';

const state = {
    userDetail: null,
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
    }, user, equipment) {
        await http
            .put(`/api/user/equipment/remove/${user}`, {
                equipmentId: equipment
            }, "Update successfully")
            .then(() => {
                dispatch('getUserEquipments', user)
            })
            .catch((error) => {
                console.log(error);
            });
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
