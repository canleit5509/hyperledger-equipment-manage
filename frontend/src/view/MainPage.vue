<template>
  <div class="wrapper">
    <nav-bar class="navbar" v-on:showSidebar="showSidebar"></nav-bar>
    <div class="dash-board">
      <div class="dashboard-side" v-if="isShowSidebar">
        <side-bar :isShowSidebar="isShowSidebar"></side-bar>
      </div>
      <div class="dashboard-side-hide" v-else>
        <side-bar :isShowSidebar="isShowSidebar"></side-bar>
      </div>
      <div class="content-tab">
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../component/SideBar.vue";
import NavBar from "../component/Nav.vue";
import {mapActions} from 'vuex'
export default {
  name: 'MainPage',
  data() {
    return {
      isShowSidebar: true,
    };
  },
  methods: {
    ...mapActions({
      getUserInfo: 'AUTH/getUserByToken'
    }),
    showSidebar(isShow) {
      this.isShowSidebar = isShow;
    },
  },
  components: {
    SideBar,
    NavBar,
  },
  async created() {
    this.getUserInfo()
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";
.wrapper {
  display: flex;
  height: 100vh;
  flex-direction: column;
  .navbar {
    height: 70px;
  }
  .dash-board {
    flex-grow: 1;
    display: flex;
    .dashboard-side {
      min-width: 220px;
      background-color: $color;
      text-align: center;
      img {
        width: 150px;
        height: 150px;
        border-radius: 50%; 
        margin-top: 5vh;
        margin-bottom: 2vh;
      }
      button:hover {
        background-color: rgb(70, 143, 220);
      }
    }
    .dashboard-side-hide{
      min-width: 60px;
      background-color: $color;
    }
    .content-tab {
      width: 70%;
      margin: 45px auto;
    }
  }
}
</style>