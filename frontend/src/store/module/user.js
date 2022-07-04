import http from "../../service/api";

const state = {
  userList: null,
  totalUser: null,
  currentPage: 1,
  perPage: 10,
};

const getters = {
  userList() {
    return state.userList;
  },
  totalUser() {
    return state.totalUser;
  },
  currentPage() {
    return state.currentPage;
  },
  perPage() {
    return state.perPage;
  }
};

const mutations = {
  setUserList(state, list) {
    state.userList = list.docs;
    state.totalUser = list.totalDocs;
    state.currentPage = list.page;
    state.perPage = list.limit;
  },
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
};

const actions = {
  async getUsers({ commit }) {
    await http
      .get("/api/user")
      .then((response) => {
        commit("setUserList", response.data);
        commit("setCurrentPage", response.data.current_page);
        localStorage.setItem('listUser', JSON.stringify(response.data.data))
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  async createNewUser({ commit, dispatch }, userData) {
    await http
      .post("/api/user", userData, 'Create a new user successfully')
      .then(() => {
        dispatch('getUsers')
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  async updateUser({ commit }, userData) {
    await http
      .put(`/api/user/${userData.id}`, userData, 'Update user successfully')
      .then((response) => {
        console.log(response.data);
        dispatch('getUsers')
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  deleteUser({ commit, dispatch }, id) {
    http
      .delete(`/api/user/${id}`, 'Delete user successfully')
      .then(() => {
        dispatch('getUsers');
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        dispatch('getusers')
        commit("clearError");
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  getUser({ commit }, id) {
    http
      .get(`/api/user/${id}`)
      .then((response) => {
        console.log(response.data);
        commit("ERROR/clearErrorMessage", null, { root: true })

      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  async getListUser({ commit }, page) {
    await http
      .get(`/api/user?page=${page}`)
      .then((response) => {
        commit("setUserList", response.data);
        commit("ERROR/clearErrorMessage", null, { root: true })
        localStorage.setItem('listUser', JSON.stringify(response.data.data))
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  async getSearchUser({ commit }, params) {
    await http
      .get(`/users/search/${params.object}?page=${params.page}`)
      .then((response) => {
        commit("setUserList", response.data);
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
