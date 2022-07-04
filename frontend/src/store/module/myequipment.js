import http from "../../service/api";

const state = {
  myEquipments: null,
  totalEquipments: null,
  currentPage: 1,
  perPage: 2,
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
  async createEquipment({
    commit, dispatch
  }, equipmentData) {
    await http
      .post("/api/equipment", equipmentData, "Equipment created successfully!")
      .then(() => {
        dispatch('getEquipments')
        commit("ERROR/clearErrorMessage", null, { root: true })
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
  async updateEquipment({
    commit, dispatch
  }, equipmentData) {
    await http
      .put(`/campaigns/${equipmentData.id}`, equipmentData, 'Updated campaign successfully')
      .then(() => {
        dispatch('getEquipments')
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  deleteEquipment({
    commit, dispatch
  }, id) {
    http
      .delete(`/campaigns/${id}`, 'Delete campaign successfully')
      .then(() => {
        dispatch('getEquipments')
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        dispatch('getEquipments')
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};