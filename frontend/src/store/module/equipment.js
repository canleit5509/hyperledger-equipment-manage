import http from "../../service/api";

const state = {
  equipments: null,
  totalEquipments: null,
  currentPage: 1,
  perPage: 10,
  availableEquipment: [],
};

const getters = {
  equipments() {
    return state.equipments;
  },
  totalItems() {
    return state.totalEquipments;
  },
  currentPage() {
    return state.currentPage;
  },
  perPage() {
    return state.perPage;
  },
  availableEquipments() {
    return state.availableEquipment;
  }
};

const mutations = {
  setEquipment(state, data) {
    state.equipments = data.docs;
    state.totalEquipments = data.totalDocs;
    state.currentPage = data.page;
    state.perPage = data.limit;
  },
  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
  },
  setAvailableEquipment(state, data) {
    state.availableEquipment = data;
  }

}

const actions = {
  async getEquipments({
    commit
  }, page = 1) {
    await http
      .get(`/api/equipment?page=${page}`)
      .then((response) => {
        commit("setEquipment", response.data);
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        console.log(error.response);
        commit('ERROR/setErrorMessage', error.response, { root: true })
      });
  },
  async getAvailableEquipments({
    commit
  }) {
    await http
      .get(`/api/equipment?limit=0&status=available`)
      .then((response) => {
        commit("setAvailableEquipment", response.data.docs);
      }
      ).catch((error) => {
        console.log(error.response);
      });
  },
  async createEquipment({
    commit, dispatch
  }, equipmentData) {
    await http
      .post("/api/equipment", equipmentData, "Equipment created successfully!")
      .then(() => {
        dispatch('getEquipments', state.currentPage)
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  async updateEquipment({
    commit, dispatch
  }, equipmentData) {
    await http
      .put(`/api/equipment/${equipmentData._id}`, equipmentData, 'Updated campaign successfully')
      .then(() => {
        dispatch('getEquipments', state.currentPage)
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
      .delete(`/api/equipment/${id}`, 'Delete campaign successfully')
      .then(() => {
        dispatch('getEquipments', state.currentPage)
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
  mutations,
  actions
}