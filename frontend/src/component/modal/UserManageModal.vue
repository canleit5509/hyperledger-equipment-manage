<template>
  <div>
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
            <b-form-select
              v-model="userDetail.role"
              required
              :state="roleState"
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="user" selected>User</option>
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
              <b-list-group-item
                v-for="(item, index) in userEquipment"
                :key="index"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <span class="device-name"
                    >{{ item.type }} | {{ item.name }}
                  </span>
                  <b-icon
                    class="icon icon-delete"
                    icon="trash"
                    variant="danger"
                    @click="removeEquipment(userId, item._id)"
                  ></b-icon>
                </div>
              </b-list-group-item>
              <b-list-group-item>
                <div class="device-item center">
                  <b-dropdown text="+">
                    <b-dropdown-item
                      v-for="(item, index) in availableEquipments"
                      :key="index"
                      @click="addEquipment(userId, item._id)"
                    >
                      {{ item.type }} | {{ item.name }}
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </b-list-group-item>
            </b-list-group>
          </b-form-group>
        </form>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ModalUserDetail",
  data() {
    return {};
  },
  props: {
    userId: {
      type: String,
    },
    isHandleRequest: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      userDetail: "USERDETAIL/userDetail",
      userEquipment: "USERDETAIL/userEquipments",
      availableEquipments: "EQUIPMENT/availableEquipments",
    }),
  },
  methods: {
    ...mapActions({
      getUserDetail: "USERDETAIL/getUserDetail",
      getUserEquipments: "USERDETAIL/getUserEquipments",
      removeDevice: "USERDETAIL/removeDevice",
      addDevice: "USERDETAIL/addDevice",
      resetUserDetail: "USERDETAIL/resetUserDetail",
      resetUserEquipments: "USERDETAIL/resetUserEquipments",
      getAvailableEquipments: "EQUIPMENT/getAvailableEquipments",
    }),
    show() {
      if (this.userId) {
        this.getUserDetail(this.userId);
        this.getUserEquipments(this.userId);
        this.getAvailableEquipments();
      } else {
        this.resetUserDetail();
        this.resetUserEquipments();
      }
      this.$refs.modalUserDetail.show();
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
    removeEquipment(user, equipment) {
      this.$bvModal
        .msgBoxConfirm(
          "Please confirm that you want to delete the device from selected.",
          {
            title: "Please Confirm",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          if (value) {
            console.log(user, equipment);
            let data = {
              user: user,
              equipmentId: equipment,
            };
            this.removeDevice(data);
          } else {
            console.log("Canceled");
          }
        })
        .catch((err) => {
          // An error occurred
          alert(err);
        });
    },
    addEquipment(user, equipment) {
      let data = {
        user: user,
        equipmentId: equipment,
      };
      this.addDevice(data);
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
.icon {
  cursor: pointer;
}
.device-item.center {
  justify-content: center;
}
</style>