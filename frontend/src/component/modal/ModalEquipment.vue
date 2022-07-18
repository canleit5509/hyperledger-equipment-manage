<template>
  <b-modal
    aria-hidden="true"
    title="Equipment"
    size="lg"
    id="modalEquipment"
    ref="modalEquipment"
  >
    <b-modal-body>
      <b-form>
        <b-form-group label="ID:" label-for="input-id">
          <b-form-input
            id="input-id"
            v-model="equipment.id"
            type="text"
            placeholder="ID"
            required
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
            placeholder="price"
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
            placeholder="model"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Status" label-for="input-status">
          <b-form-select id="input-status" v-model="equipment.status" required>
            <option value="">Select Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Type" label-for="input-type">
          <b-form-select id="input-type" v-model="equipment.type" required>
            <b-form-select-option value="">Select Status</b-form-select-option>
            <b-form-select-option value="pc">PC</b-form-select-option>
            <b-form-select-option value="laptop">Laptop</b-form-select-option>
            <b-form-select-option value="mouse">Mouse</b-form-select-option>
            <b-form-select-option value="monitor">monitor</b-form-select-option>
            <b-form-select-option value="printer">Printer</b-form-select-option>
            <b-form-select-option value="scanner">Scanner</b-form-select-option>
            <b-form-select-option value="other">Other</b-form-select-option>
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
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-modal-body>
  </b-modal>
</template>
<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import Data from "../../constant/index.js";
import ErrorMessage from "../ErrorMessage.vue";
export default {
  name: "ModalUser",
  data() {
    return {
      equipment: {
        id: null,
        name: null,
        price: null,
        buyTime: null,
        model: null,
        status: null,
        type: null,
        description: null,
      },
      errorMessage: null,
      modalType: "add",
    };
  },
  methods: {
    show() {
      this.$refs.modalEquipment.show();
    },
  },
};
</script>