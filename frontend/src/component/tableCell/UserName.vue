<template>
  <div class="name-cell-content">
    <div class="cell-content_main_text">
      {{ data.name | wrapText}}
    </div>
    <div class="btn-group-modify">
      <b-icon
        class="icon icon-edit"
        icon="pen"
        aria-hidden="true"
        variant="success"
         @click="showModalEdit"
      ></b-icon>
      <b-icon
        class="icon icon-delete"
        icon="trash"
        aria-hidden="true"
        variant="danger"
         @click="showModalDelete"
      ></b-icon>
    </div>
    <modal-user :userInfo="data" :modalType="'edit'" ref="modalEdit" />
    <modal-delete :Info="data" :deleteFor="'user'" ref="modalDelete" />
  </div>
</template>

<script>
import ModalUser from "../modal/ModalUser.vue"
import ModalDelete from "../modal/ModalDelete.vue"

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
  methods: {
    showModalEdit() {
      this.data.password = "khac null"
      this.$refs.modalEdit.show()
    },
    showModalDelete() {
      this.$refs.modalDelete.show()
    }
  },
  components: {
    ModalUser,
    ModalDelete
  }
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