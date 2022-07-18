<template>
  <b-modal
    title="User detail"
    size="lg"
    id="modalUserDetail"
    ref="modalUserDetail"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
  >
    <b-container fluid>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group label="Name">
          <b-form-input
            v-model="userDetail.name"
            :state="nameState"
            :readonly="isHandleRequest"
          />
        </b-form-group>
        <b-form-group label="Email" :readonly="isHandleRequest">
          <b-form-input v-model="userDetail.email" :state="emailState" />
        </b-form-group>
        <b-form-group label="Phone">
          <b-form-input
            v-model="userDetail.phone"
            :state="phoneState"
            :readonly="isHandleRequest"
          />
        </b-form-group>
        <b-form-group label="Role">
          <b-form-select v-model="userDetail.role" required :state="roleState">
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user" selected>User</option>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Status">
          <b-form-select
            v-model="userDetail.status"
            required
            :state="statusState"
            :readonly="isHandleRequest"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Department">
          <b-form-input
            v-model="userDetail.department"
            :state="departmentState"
            :readonly="isHandleRequest"
          />
        </b-form-group>
        <b-form-group label="Position">
          <b-form-input
            v-model="userDetail.position"
            :state="positionState"
            :readonly="isHandleRequest"
          />
        </b-form-group>
        <b-form-group label="Devices">
          <b-list-group>
            <b-list-group-item v-for="(item, index) in userEquipment" :key="index">
              <div class="d-flex justify-content-between align-items-center">
                <span class="device-name">{{ item.name  }} </span>
                <b-icon
                  class="icon icon-delete"
                  icon="trash"
                  variant="danger"
                ></b-icon>
              </div>
            </b-list-group-item>
            <b-list-group-item>
              <div class="device-item center">
                <b-icon class="icon" icon="plus"></b-icon>
              </div>
            </b-list-group-item>
          </b-list-group>
        </b-form-group>
      </form>
    </b-container>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ModalUserDetail",
  data() {
    return {
      items: ["Monitor 1", "PC 2", "Keyboard 3"],
      nameState: null,
      emailState: null,
      phoneState: null,
      roleState: null,
      statusState: null,
      departmentState: null,
      positionState: null,
    };
  },
  props: {
    userId: {
      type: String,
    },
    isHandleRequest: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      userDetail: "USERDETAIL/userDetail",
      userEquipment: "USERDETAIL/userEquipments",
    }),
  },
  methods: {
    ...mapActions({
      getUserDetail: "USERDETAIL/getUserDetail",
      getUserEquipments: "USERDETAIL/getUserEquipments",
    }),
    show() {
      this.$refs.modalUserDetail.show();
      this.getUserDetail(this.userId);
      this.getUserEquipments(this.userId);
    },
    hide() {
      this.$refs["modalUserDetail"].hide();
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
        this.$bvModal.hide("modalUserDetail");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.device-item {
  display: flex;
  align-items: center;
  .device-name {
    margin-right: 10px;
    flex-basis: 90%;
  }
}
.device-item.center {
  justify-content: center;
}
</style>