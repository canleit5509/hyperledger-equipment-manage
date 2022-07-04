<template>
  <div class="agencyName-cell">
    <div class="cell-content_main_text">
      {{ data.agency_name | wrapText }}
    </div>
  </div>
</template>

<script>
export default {
  name: "AgencyName",
  props: ['data'],
  filters: {
    wrapText: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.length < 15 ? value : value.substring(0, 13) + "...";
    },
  }
}
</script>

<style>

</style>