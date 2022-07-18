import http from "../../service/api";

const state = {
  requests: null,
  totalItems: null,
  currentPage: 1,
  perPage: 10,
};

const getters = {
  requests() {
    return state.requests;
  },
  totalItems() {
    return state.totalItems;
  },
  currentPage() {
    return state.currentPage;
  },
  perPage() {
    return state.perPage;
  }
};

const mutations = {
  setRequests(state, data) {
    state.requests = data.docs;
    state.totalItems = data.totalDocs;
    state.currentPage = 1;
    state.perPage = data.limit;
  },
  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
  },
}

const actions = {
  async getRequests({
    commit
  }, page = 1) {
    await http
      .get(`/api/request?page=${page}`)
      .then((response) => {
        commit("setRequests", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async createRequest({
    commit, dispatch
  }, requestData) {
    await http
      .post("/api/request", requestData, "Request created successfully!")
      .then(() => {
        dispatch('getRequests', state.currentPage)
      })
      .catch((error) => {
      });
  },
  async updateEquipment({
    commit, dispatch
  }, requestData) {
    await http
      .put(`/api/request/${requestData._id}`, requestData, 'Updated campaign successfully')
      .then(() => {
        dispatch('getRequests', state.currentPage)
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
      .delete(`/api/request/${id}`, 'Delete campaign successfully')
      .then(() => {
        dispatch('getRequests', state.currentPage)
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        dispatch('getRequests')
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