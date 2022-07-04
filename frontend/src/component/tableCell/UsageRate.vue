<template>
  <div class="status-cell">
    <div class="cell-content_main_text">
      {{ parseFloat((data.cost/data.campaign_budget*100)).toFixed(2) +  ' %' }}
    </div>
  </div>
</template>

<script>
export default {
  name: "UsageRate",
  props: ["data"],
};
</script>

<style lang="scss" scoped>
i {
  font-size: 15px;
}
</style>