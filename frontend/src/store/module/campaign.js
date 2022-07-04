import http from "../../service/api";

const state = {
  campaignList: null,
  totalCampaign: null,
  currentPage: 1,
  perPage: 2,
  listBanner: null
};

const getters = {
  campaignList() {
    return state.campaignList;
  },
  totalCampaign() {
    return state.totalCampaign;
  },
  currentPage() {
    return state.currentPage;
  },
  perPage() {
    return state.perPage;
  },
  listBanner() {
    return state.listBanner;
  }
};

const mutations = {
  setCampaignList(state, list) {
    state.campaignList = list.data;
    state.totalCampaign = list.total;
    state.currentPage = list.current_page;
    state.perPage = list.per_page;
  },
  setCurrentPage(state, currentPage) {
    state.currentPage = currentPage;
  },
  setListBanner(state, list) {
    state.listBanner = list;
  }
}

const actions = {
  async getCampaigns({
    commit
  }, page = 1) {
    await http
      .get(`/campaigns/?page=${page}`)
      .then((response) => {
        commit("setCampaignList", response.data);
        commit("ERROR/clearErrorMessage", null, { root: true })
        localStorage.setItem('listCampaign', JSON.stringify(response.data.data))
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  async createCampaign({
    commit, dispatch
  }, campaignData) {
    await http
      .post("/campaigns", campaignData, "Campaign created successfully!")
      .then(() => {
        dispatch('getCampaigns')
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  async getCampaign({
    commit
  }, id) {
    await http
      .get(`/campaigns/${id}`)
      .then(() => {
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
  },
  async updateCampaign({
    commit, dispatch
  }, campaignData) {
    await http
      .put(`/campaigns/${campaignData.id}`, campaignData, 'Updated campaign successfully')
      .then(() => {
        dispatch('getListBanner')
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  deleteCampaign({
    commit, dispatch
  }, id) {
    http
      .delete(`/campaigns/${id}`, 'Delete campaign successfully')
      .then(() => {
        dispatch('getListBanner')
        dispatch('getCampaigns')
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        dispatch('getListBanner')
        dispatch('getCampaigns')
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  getImgUrl({ commit }, file) {
    http.getUrlImg(file)
      .then(() => {
        commit("ERROR/clearErrorMessage", null, { root: true })
      }).catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      })
  },
  async getListBanner({
    commit
  }) {
    await http
      .get(`/campaigns/banner`)
      .then((response) => {
        commit("setListBanner", response.data);
        commit("ERROR/clearErrorMessage", null, { root: true })
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  },
  async clickCampaign({
    commit, dispatch
  }, id) {
    await http
      .post(`/campaigns/${id}/click`)
      .then(() => {
        commit("ERROR/clearErrorMessage", null, { root: true })
        dispatch("getCampaigns");
        dispatch("getListBanner");
      })
      .catch((error) => {
        commit('ERROR/setErrorMessage', error.response.data.message, { root: true })
      });
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};