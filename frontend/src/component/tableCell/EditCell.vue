<template>
  <div class="name-cell-content">
    <b-icon
      class="icon icon-edit"
      icon="wrench"
      aria-hidden="true"
      variant="success"
      @click="showModalEdit"
    ></b-icon>

    <modal-request-handle :data="data" ref="modalEdit" />
  </div>
</template>

<script>
import ModalRequestHandle from "../modal/ModalRequestHandle.vue";
export default {
  name: "EditCell",
  props: ["data"],
  methods: {
    showModalEdit() {
      this.$refs.modalEdit.show();
    },
    showModalDelete() {
      this.$refs.modalDelete.show();
    },
  },
  components: {
    ModalRequestHandle,
    
  },
};
</script>

<style lang="scss" scoped>
.name-cell-content {
  position: relative;
  padding: 5px 0;
  .icon {
    cursor: pointer;
  }
}
</style>