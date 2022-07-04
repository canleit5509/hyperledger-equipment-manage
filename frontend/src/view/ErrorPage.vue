<template>
  <div class="error-page">
    <div class="container">
      <img
        src="https://stories.freepiklabs.com/storage/26840/404-error-with-a-cute-animal-pana-2853.png"
        alt=""
      />
      <br />
      <button @click="backToHomePage">
        <i class="bx bx-log-out"> </i> Back to HomePage
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  methods: {
    backToHomePage() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.error-page {
  width: 100vw;
  height: 100vh;
  text-align: center;
  .container {
    img {
      width: 20em;
      height: 20em;
    }

    button {
      background-color: rgb(218, 199, 199);
      border: 1px solid grey;
      padding: 0.5em;
      border-radius: 10px;
    }
  }
}
</style>