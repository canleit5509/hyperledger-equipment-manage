<template>
  <b-modal
    aria-hidden="true"
    title="Equipment"
    size="lg"
    id="modalEquipment"
    ref="modalEquipment"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group label="ID:" label-for="input-id">
        <b-form-input
          id="input-id"
          v-model="equipment.id"
          type="text"
          placeholder="ID"
          required
          readonly
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Name:" label-for="input-name">
        <b-form-input
          id="input-name"
          v-model="equipment.name"
          type="text"
          placeholder="Name"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Price:" label-for="input-price">
        <b-form-input
          id="input-price"
          v-model="equipment.price"
          type="text"
          placeholder="Price"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Buy date" label-for="input-buydate">
        <b-form-datepicker
          id="input-buydate"
          v-model="equipment.buyTime"
          class="mb-2"
        ></b-form-datepicker>
      </b-form-group>
      <b-form-group label="Model:" label-for="input-model">
        <b-form-input
          id="input-model"
          v-model="equipment.model"
          type="text"
          placeholder="Model"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Supplier:" label-for="input-supplier">
        <b-form-input
          id="input-supplier"
          v-model="equipment.supplier"
          type="text"
          placeholder="Supplier"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Status" label-for="input-status">
        <b-form-select id="input-status" v-model="equipment.status" required>
          <option value="">Select Status</option>
          <option value="unavailable">Unavailable</option>
          <option value="available" selected>Available</option>
          <option value="lost">Lost</option>
          <option value="in_use">In use</option>
          <option value="repairing">Repairing</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Type" label-for="input-type">
        <b-form-select id="input-type" v-model="equipment.type" required>
          <b-form-select-option value="Keyboard">Keyboard</b-form-select-option>
          <b-form-select-option value="PC" selected>PC</b-form-select-option>
          <b-form-select-option value="Laptop">Laptop</b-form-select-option>
          <b-form-select-option value="Mouse">Mouse</b-form-select-option>
          <b-form-select-option value="Monitor">Monitor</b-form-select-option>
          <b-form-select-option value="Printer">Printer</b-form-select-option>
          <b-form-select-option value="scanner">Scanner</b-form-select-option>
          <b-form-select-option value="Other">Other</b-form-select-option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Description:" label-for="input-description">
        <b-form-textarea
          id="input-description"
          v-model="equipment.description"
          placeholder="Description"
          required
        ></b-form-textarea>
      </b-form-group>
      <br />
    </form>
  </b-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ModalEquipment",
  data() {
    return {};
  },
  props: {
    equipment: {
      type: Object,
      default: () => ({
        id: null,
        name: null,
        price: null,
        buyTime: null,
        model: null,
        status: null,
        type: null,
        description: null,
        supplier: null
      }),
    },
    modalType: {
      type: String,
      default: "add",
    },
  },
  methods: {
    ...mapActions({
      createEquipment: "EQUIPMENT/createEquipment",
    }),
    show() {
      this.$refs.modalEquipment.show();
    },
    checkFormValidity() {
      let valid = true;

      return valid;
    },
    resetModal() {
      this.equipment = {
        name: null,
        price: null,
        buyTime: null,
        model: null,
        status: null,
        type: null,
        description: null,
        supplier: null
      };
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

      this.createEquipment(this.equipment);
      // Push the name to submitted names
      console.log(this.equipment);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modalEquipment");
      });
    },
  },
};
</script>