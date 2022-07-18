<template>
  <b-modal
    title="Request Handle"
    size="lg"
    id="modalRequestHandle"
    ref="modalRequestHandle"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <b-container fluid>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Approve or Reject">
          <b-form-select
            v-model="data.status"
            required
            invalid-feedback="Decide is required"
            :state="decideState"
          >
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Response">
          <b-form-textarea
            v-model="data.response"
          ></b-form-textarea>
        </b-form-group>
      </form>
    </b-container>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ModalRequestHandle",
  data() {
    return {
      decide: "",
      decideState: null,
      response: "",
      typeState: null,
    };
  },
  props: {
    data: {
      type: Object,
    }
  },
  methods: {
    ...mapActions({
      updateRequest: "REQUEST/updateRequest",
    }),
    show() {
      this.$refs.modalRequestHandle.show();
    },
    hide(id) {
      this.$refs["modalRequestHandle"].hide();
    },
    checkFormValidity() {
      let valid = true;
      if (this.this.data.decide === "") {
        valid = false;
      } else {
        this.decideState = true;
      }
      return valid;
    },
    resetModal() {
      this.decide = "";
      this.decideState = null;
      this.response = null;
    },
    handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }

      this.updateRequest({
        _id: this.data._id,
        status: this.data.decide,
        response: this.data.response,
      });
      // Push the name to submitted names
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modalRequestHandle");
      });
    },
  },
};
</script>

<style>
</style>