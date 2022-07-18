<template>
  <b-modal
    title="Request"
    size="lg"
    id="modalRequest"
    ref="modalRequest"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <b-container fluid>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Request type">
          <b-form-select
            :options="requestType"
            v-model="type"
            required
            invalid-feedback="Type is required"
            :state="typeState"
          />
        </b-form-group>
        <b-form-group label="Description" required>
          <b-form-textarea
            v-model="description"
            invalid-feedback="Description is required"
            :state="descriptionState"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Related Equipment">
          <b-form-input></b-form-input>
        </b-form-group>
      </form>
    </b-container>
  </b-modal>
</template>

<script>
import requestType from "../../constant/requestType";
export default {
  name: "ModalRequest",
  data() {
    return {
      requestType: requestType.map((item) => {
        return {
          text: item,
          value: item.toLowerCase()
        };
      }),
      description: "",
      descriptionState: null,
      type: "",
      typeState: null,
    };
  },
  methods: {
    show() {
      this.$refs.modalRequest.show();
    },
    hide(id) {
      this.$refs["modalRequest"].hide();
    },
    checkFormValidity() {
      let valid = true;
      if (this.description.length > 0) {
        this.descriptionState = true;
      } else {
        this.descriptionState = false;
        valid = false;
      }
      if (this.type != "") {
        this.typeState = true;
      } else {
        this.typeState = false;
        valid = false;
      }
      return valid;
    },
    resetModal() {
      this.description = "";
      this.descriptionState = null;
      this.type = null;
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
      // Push the name to submitted names
      console.log(this.description, this.type);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modalRequest");
      });
    },
  },
};
</script>

<style>
</style>