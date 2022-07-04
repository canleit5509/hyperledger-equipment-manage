<template>
  <div class="nav-bar" v-if="user">
    <div class="left-navbar">
      <div class="h2 mb-0">
        <div class="toggle" @click="showSidebar">
          <b-icon-list></b-icon-list>
        </div>
      </div>
    </div>
    <div class="logo"><img src="../assets/logo.png"></div>
    <div class="right-navbar">
      <b-dropdown right>
        <b-dropdown-item><router-link to="/profile">User Profile</router-link></b-dropdown-item>
        <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
      </b-dropdown>
      <img v-if="!user.avatar" src="../assets/avt.png" alt="" />
      <img v-else :src="user.avatar" alt="" />
    </div>
  </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
export default {
  name: 'Navbar',
  data() {
    return {
      isShowSidebar: true
    }
  },
  methods: {
    ...mapActions ({
      signout: "AUTH/logout"
    }),
    showSidebar() {
      this.isShowSidebar = !this.isShowSidebar
      this.$emit('showSidebar', this.isShowSidebar)
    },
    logout() {
      this.signout();
    },
  },
  computed: {
    ...mapGetters({
      user: "AUTH/userInfo",
    }),
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/style/common.scss";
.nav-bar {
  background-color: $color;
  display: flex;
  .left-navbar {
    min-width: 220px;
    display: flex;
    align-items: center;
    .toggle {
      margin: auto;
      color: rgb(224, 231, 240);
      padding: 20px;
      cursor: pointer;
      font-size: 1rem;
    }
  }
  .logo {
    flex-basis: 73.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 60px;
    }
  }
  .right-navbar {
    flex-basis: 7%;
    width: auto;
    position: relative;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .dropdown {
      position: absolute;
      left: 0;
      margin: 0;
      a {
        text-decoration: none;
        color: black;
      }
      ::v-deep button {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        opacity: 0;
      }
      ::v-deep ul {
        li {
          a:active {
            background-color: $color;
          }
        }
      }
    }
  }
}
</style>