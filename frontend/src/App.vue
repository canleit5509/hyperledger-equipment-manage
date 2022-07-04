<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    };
  },
  created() {
    window.document.title = "Equipment Manage System"
  },

};
</script>

<style lang="scss">
@import "./assets/style/common.scss";

#app {
  font-family: $font-family;
  font-size: $font-size;
}

ul {
  list-style: none;
}
</style>
