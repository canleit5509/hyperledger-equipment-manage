<template>
  <div class="error-message">
    <ul v-if="typeof(errorMessage) === 'object'">
      <li v-for="(error, index) in errorMessage" :key="index">
        {{ error[0] }}
      </li>
    </ul>
    <span v-else>
      {{ errorMessage }}
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ErrorMessage",
  computed: {
    ...mapGetters({
      errorMessage: "ERROR/errorMessage",
    }),
  },
};
</script>

<style>
.error-message {
  color: rgb(209, 80, 80);
  font-size: 14px;
  text-align: center;
}
</style>