<template>
  <div class="name-cell-content">
    <div class="cell-content_main_text">
      {{ data.name | wrapText}}
    </div>
  </div>
</template>

<script>

export default {
  name: "userName",
  props: ["data"],
  filters: {
    wrapText: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.length < 15 ? value : value.substring(0, 13) + "...";
    },
  },
};
</script>

<style lang="scss" scoped>
.name-cell-content {
  position: relative;
  padding: 5px 0;
  .cell-content_main_text {
    margin: 0;
    flex-wrap: nowrap;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .btn-group-modify {
    position: absolute;
    right: 0;
    bottom: -20%;
    .icon {
      font-size: 13px;
      display: none;
      margin-left: 5px;
    }
  }
}
</style>