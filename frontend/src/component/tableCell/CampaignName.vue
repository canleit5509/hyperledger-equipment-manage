<template>
  <div class="name-cell-content">
    <div class="cell-content_main_text">
      <img :src="data.campaign_image_url" alt="" />
      <span class="name">{{ data.campaign_name | wrapText }}</span>
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
    <modal-campaign :campaign="data" :modalType="'edit'" ref="modalEdit" />
    <modal-delete-campaign
      :Info="data"
      :deleteFor="'campaign'"
      ref="modalDelete"
    />
  </div>
</template>

<script>
import ModalCampaign from "../modal/ModalCampaign.vue";
import ModalDeleteCampaign from "../modal/ModalDelete.vue";
export default {
  name: "CampaignName",
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
      this.$refs.modalEdit.show();
    },
    showModalDelete() {
      this.$refs.modalDelete.show();
    },
  },
  components: {
    ModalCampaign,
    ModalDeleteCampaign,
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
    img {
      width: 50px;
      height: 45px;
      margin-right: 30px;
    }
  }
  .btn-group-modify {
    position: absolute;
    right: 0;
    bottom: 0;
    .icon {
      font-size: 13px;
      display: none;
      margin-left: 5px;
    }
  }
}
</style>