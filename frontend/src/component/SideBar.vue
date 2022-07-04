<template>
  <div class="sidebar" v-if="user">
    <div class="menu-item" v-if="isShowSidebar">
      <div class="img">
        <img v-if="!user.avatar" src="../assets/avt.png" alt="" />
        <img v-else :src="user.avatar" alt="" />
        <br />
      </div>
      <br />
      <span>{{ user.name }}</span>

      <ul>
        <router-link tag="li" to="/"
          ><b-icon class="icon" icon="house-door-fill" aria-hidden="true"></b-icon>
          Dashboard</router-link
        >
        <router-link tag="li" v-if="userRole == 'Admin'" to="/accountmanagement"
          ><b-icon class="icon" icon="person-circle" aria-hidden="true"></b-icon>
          Account</router-link
        >
        <router-link tag="li" to="/campaign"
          ><b-icon class="icon" icon="columns-gap" aria-hidden="true"></b-icon>
          Campaign</router-link
        >
      </ul>
    </div>
    <div class="menu-item-hide" v-else>
      <ul>
        <router-link tag="li" to="/"
          ><b-icon class="icon" icon="house-door-fill" aria-hidden="true"></b-icon>
          </router-link
        >
        <router-link tag="li" v-if="userRole == 'Admin'" to="/accountmanagement"
          ><b-icon class="icon" icon="person-circle" aria-hidden="true"></b-icon>
          </router-link
        >
        <router-link tag="li" to="/campaign"
          ><b-icon class="icon" icon="columns-gap" aria-hidden="true"></b-icon>
          </router-link
        >
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'SideBar',
  props: ["isShowSidebar"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      user: "AUTH/userInfo",
      userRole: "AUTH/userRole",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";
.menu-item {
  min-height: 70vh;
  color: white;
  .img {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 50%;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 5vh auto;
    text-align: left;
    li {
      list-style: none;
      padding: 0;
      cursor: pointer;
      height: 60px;
      line-height: 60px;
      text-decoration: none;
      color: white;
      border-top: 1px solid white;
    }
    .router-link-exact-active {
      background-color: $secondary-color;
    }
    li:hover {
      background-color: $secondary-color;
    }
    hr {
      margin: 0;
    }
    .icon {
      margin-left: 20px;
    }
  }
}
.menu-item-hide{
  color: white;
  ul {
    list-style: none;
    padding: 0;
    text-align: left;
    li {
      // margin-left: 25px;
      list-style: none;
      padding: 0;
      cursor: pointer;
      height: 40px;
      line-height: 40px;
      text-decoration: none;
      color: white;
      border-top: 1px solid white;
      text-align: center;
    }
    .router-link-exact-active {
      background-color: $secondary-color;
    }
    li:hover {
      background-color: $secondary-color;
    }
    hr {
      margin: 0;
    }
  }
}
</style>