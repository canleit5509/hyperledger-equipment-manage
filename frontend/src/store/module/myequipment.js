import http from "../../service/api";

const state = {
  myEquipments: null,
  totalEquipments: null,
  currentPage: 1,
  perPage: 10,
};

const getters = {
  myEquipments() {
    return state.myEquipments;
  },
  totalEquipments() {
    return state.totalEquipments;
  },
  currentPage() {
    return state.currentPage;
  },
  perPage() {
    return state.perPage;
  }
};

const mutations = {
  setMyEquipment(state, data) {
    state.myEquipments = data;
    state.totalEquipments = data.length;
    state.currentPage = 1;
    state.perPage = data.length;
  },
  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
  },
}

const actions = {
  async getEquipments({
    commit
  }, page = 1) {
    await http
      .get(`/api/equipment/me?page=${page}`)
      .then((response) => {
        commit("setMyEquipment", response.data);
        commit("ERROR/clearErrorMessage", null, { root: true })
        // localStorage.setItem('listCampaign', JSON.stringify(response.data.data))
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  
  async getEquipment({
    commit
  }, id) {
    await http
      .get(`/api/equipment/${id}`)
      .then(() => {
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
  },
  
  
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};