<template>
  <div class="status-cell">
    <div class="cell-content_main_text">
      {{ data.status }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
  props: ["data"],
};
</script>

<style lang="scss" scoped>
i {
  font-size: 15px;
}
.active {
  color: green;
}
.inactive {
  color: red;
}
</style>