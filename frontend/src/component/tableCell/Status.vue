<template>
  <div class="status-cell" >
      <div class="cell-content_main_text">
      <span v-if="data == 1"><i class='bx bx-radio-circle-marked active'></i></span>
      <span v-if="data == 0"><i class='bx bx-radio-circle-marked inactive'></i></span>
    </div>
  </div>
</template>

<script>
export default {
    name: "Status",
    props: [
        'data'
    ]
}
</script>

<style lang="scss" scoped>
i {
    font-size: 15px;
}
.active{
    color: green;        
}
.inactive{
    color: red;
}
</style>