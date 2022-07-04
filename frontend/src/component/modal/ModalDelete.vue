<template>
  <b-modal size="lg" id="deleteModal" ref="deleteModal" hide-footer title="Delete user" hide-header-close>
    <form form @submit.prevent="">
      <div v-show="isShowDetail" class="content">
        <div v-if="deleteFor === 'user'" class="form-group">
          <label>Are you sure to delete user {{ Info.name }}</label>
        </div>
        <div v-if="deleteFor === 'campaign'" class="form-group">
          <label>Are you sure to delete campaign {{ Info.campaign_name }}</label>
        </div>
      </div>
      <div class="d-flex flex-row-reverse">
        <b-button v-if="deleteFor === 'user'" class="okButton" block @click="deleteUser" >Delete</b-button>
        <b-button v-if="deleteFor === 'campaign'" class="okButton" block @click="deleteCampaign" >Delete</b-button>
        <b-button
          class="cancelButton"
          block
          style="margin-right: 20px"
          @click="$bvModal.hide('deleteModal')"
          >Close</b-button
        >
      </div>
    </form>
  </b-modal>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: 'ModalDelete',
  data() {
    return {
      isShowDetail: true,
    };
  },
  props: {
    Info: Object,
    deleteFor: String
  },
  methods: {
    ...mapActions({
      delUser: "USER/deleteUser",
      delCampaign: "CAMPAIGN/deleteCampaign"
    }),
    deleteUser() {
      this.delUser(this.Info.id);
      this.$emit("hideMd", "DeleteUser");
      this.$refs.deleteModal.hide()
    },
    deleteCampaign() {
      this.delCampaign(this.Info.id);
      this.$emit("hideMd", "DeleteUser");
      this.$refs.deleteModal.hide();
    },
    show() {
      this.$refs.deleteModal.show();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/style/common.scss";
::v-deep .close {
  border: none;
  background: none;
  font-size: 25px;
}
form {
  width: 95%;
  margin: 0 auto;
  .okButton{
    background-color: rgb(245, 84, 84);
  }
  .btn {
    display: flex;
    justify-content: center;
    button {
      margin-left: 1em;
      text-align: center;
    }
    button:hover {
      background-color: $color;
    }
  }
}
</style>