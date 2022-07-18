<template>
  <b-modal
    aria-hidden="true"
    title="User"
    size="lg"
    id="modalUser"
    ref="modalUser"
    hide-footer
    hide-header-close
  >
    <div class="errorMessage">
      <error-message />
    </div>
    <b-modal-body>
      <form @submit.prevent="">
        <div class="inf group">
          <div class="header" @click="isShowDetail = !isShowDetail">
            <span>Information</span>
            <span>
              <b-icon
                class="icon"
                icon="chevron-down"
                aria-hidden="true"
              ></b-icon>
            </span>
          </div>
          <div v-show="isShowDetail" class="content">
            <div>
              <label for="">Name: </label>
              <input
                class="form-control"
                type="text"
                v-model.trim="userInfo.name"
              />
              <div class="errors">
                <p class="error" v-show="showErrors.emptyUserName">
                  Name is requied
                </p>
                <p class="error" v-show="showErrors.userNameMaxLength">
                  Name must have at most 255 letters
                </p>
              </div>
            </div>
            <div>
              <label for="">Email: </label>
              <input
                :disabled="isDisableEmail"
                class="form-control"
                type="text"
                v-model.trim="userInfo.email"
              />
              <div class="errors">
                <p class="error" v-show="showErrors.invalidEmail">
                  Incorrect email format
                </p>
                <p class="error" v-show="showErrors.emptyEmail">
                  Email is required
                </p>
                <p class="error" v-show="showErrors.emailMaxLength">
                  Email must have at most 255 letters
                </p>
              </div>
            </div>
            <div v-if="modalType === 'add'">
              <label for="">Password: </label>
              <input
                class="form-control"
                type="password"
                v-model.trim="userInfo.password"
              />
              <div class="errors">
                <p class="error" v-show="showErrors.emptyPassword">
                  Password is required
                </p>
                <p class="error" v-show="showErrors.passwordMaxLength">
                  Password must have at most 255 letters
                </p>
                <p class="error" v-show="showErrors.passwordMinLength">
                  Password must have at least 6 letters
                </p>
              </div>
            </div>
            <div>
              <label for="">Status: </label>
              <b-form-select v-model="userInfo.status" id="status">
                <b-form-select-option v-for="i in status" :key="i.name" v-bind:value="i.id">
                  {{ i.name }}
                </b-form-select-option>
              </b-form-select>
            </div>
            <div>
              <label for="">Department: </label>
              <input
                class="form-control"
                type="text"
                v-model.trim="userInfo.agency_name"
              />
              <div class="errors">
                <p class="error" v-show="showErrors.emptyAgencyName">
                  Agency name is required
                </p>
                <p class="error" v-show="showErrors.agencyNameMaxLength">
                  Agency name must have at most 255 letters
                </p>
                <p class="error" v-show="showErrors.agencyNameMinLength">
                  Agency name must have at least 3 letters
                </p>
              </div>
            </div>
            <div>
              <label for="">Role name: </label>
              <select class="red" v-model="userInfo.role_id" name="" id="role">
                <option
                  v-for="role in roles"
                  v-bind:value="role.id"
                  :key="role.id"
                >
                  {{ role.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="d-flex flex-row-reverse">
          <b-button
            class="okButton"
            block
            @click="addUser"
            :disabled="isDisableButton"
          >
            Save
          </b-button>
          <b-button
            class="cancelButton"
            block
            style="margin-right: 20px"
            @click="hideModal(userInfo.id)"
          >
            Close
          </b-button>
        </div>
      </form>
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
      isShowDetail: true,
      isShowSchedule: true,
      isShowBudget: true,
      isShowBidding: true,
      isShowCreative: true,
      roles: Data.roles,
      status: Data.status,
      isDisableEmail: false,
      isDisableButton: false,
      showErrors: {},
    };
  },
  props: ["userInfo", "modalType"],
  computed: {
    ...mapGetters({
      errorMessage: "ERROR/errorMessage",
      validateUser: "VALIDATION/validateUser",
    }),
  },
  methods: {
    ...mapActions({
      createNewUser: "USER/createNewUser",
      updateUser: "USER/updateUser",
      clearErrorMessage: "ERROR/clearErrorMessage",
    }),

    addUser() {
      this.isDisableButton = true;
      if (!this.validateBeforeSubmit()) {
        return;
      } else {
        if (this.modalType === "add") {
          this.createNewUser(this.userInfo).then(() => {
            if (!this.errorMessage) {
              this.$refs.modalUser.hide();
            }
          });
        } else {
          var info = new Object();
          info.id = this.userInfo.id;
          info.name = this.userInfo.name;
          info.role_id = this.userInfo.role_id;
          info.status = this.userInfo.status;
          this.updateUser(info).then(() => {
            if (!this.errorMessage) {
              this.$refs.modalUser.hide();
            }
          });
        }
      }
    },
    show() {
      this.clearErrorMessage();
      this.$refs.modalUser.show();
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateUser(this.userInfo);
      if (errors) {
        Vue.set(
          this.showErrors,
          "emptyUserName",
          this.showErrors && !!errors && errors.emptyUserName
        );
        Vue.set(
          this.showErrors,
          "userNameMaxLength",
          this.showErrors && !!errors && errors.userNameMaxLength
        );
        Vue.set(
          this.showErrors,
          "emptyAgencyName",
          this.showErrors && !!errors && errors.emptyAgencyName
        );
        Vue.set(
          this.showErrors,
          "agencyNameMaxLength",
          this.showErrors && !!errors && errors.agencyNameMaxLength
        );
        Vue.set(
          this.showErrors,
          "agencyNameMinLength",
          this.showErrors && !!errors && errors.agencyNameMinLength
        );
        Vue.set(
          this.showErrors,
          "emptyEmail",
          this.showErrors && !!errors && errors.emptyEmail
        );
        Vue.set(
          this.showErrors,
          "invalidEmail",
          this.showErrors && !!errors && errors.invalidEmail
        );
        Vue.set(
          this.showErrors,
          "emailMaxLength",
          this.showErrors && !!errors && errors.emailMaxLength
        );
        Vue.set(
          this.showErrors,
          "emptyPassword",
          this.showErrors && !!errors && errors.emptyPassword
        );
        Vue.set(
          this.showErrors,
          "passwordMaxLength",
          this.showErrors && !!errors && errors.passwordMaxLength
        );
        Vue.set(
          this.showErrors,
          "passwordMinLength",
          this.showErrors && !!errors && errors.passwordMinLength
        );

        passedValidate = false;
      }
      return passedValidate;
    },
    hideModal(id) {
      this.resetUser(id);
      this.$refs["modalUser"].hide();
    },
    resetUser(id) {
      if (id) {
        let listUser = JSON.parse(localStorage.getItem("listUser"));
        for (let i = 0; i < listUser.length; i++) {
          if (id == listUser[i].id) {
            this.userInfo.name = listUser[i].name;
            this.userInfo.agency_name = listUser[i].agency_name;
            this.userInfo.email = listUser[i].email;
            this.userInfo.status = listUser[i].status;
            this.userInfo.role_id = listUser[i].role_id;
            break;
          }
        }
      } else {
        (this.userInfo.name = null),
          (this.userInfo.email = null),
          (this.userInfo.password = null),
          (this.userInfo.status = 1),
          (this.userInfo.agency_name = null),
          (this.userInfo.role_id = 1);
      }
    },
  },
  watch: {
    "userInfo.name"() {
      Vue.set(this.showErrors, "emptyUserName", null);
      Vue.set(this.showErrors, "userNameMaxLength", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    "userInfo.email"() {
      Vue.set(this.showErrors, "emptyEmail", null);
      Vue.set(this.showErrors, "invalidEmail", null);
      Vue.set(this.showErrors, "emailMaxLength", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    "userInfo.agency_name"() {
      Vue.set(this.showErrors, "emptyAgencyName", null);
      Vue.set(this.showErrors, "agencyNameMaxLength", null);
      Vue.set(this.showErrors, "agencyNameMinLength", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    "userInfo.password"() {
      Vue.set(this.showErrors, "emptyPassword", null);
      Vue.set(this.showErrors, "passwordMaxLength", null);
      Vue.set(this.showErrors, "passwordMinLength", null);
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    "userInfo.role_id"() {
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
    "userInfo.status"() {
      this.isDisableButton = false;
      this.clearErrorMessage();
    },
  },
  async created() {
    if (this.modalType == "edit") {
      this.isDisableEmail = true;
      this.isDisableButton = true;
    }
  },
  components: {
    ErrorMessage,
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
button {
  background-color: $color;
}
form {
  width: 95%;
  max-height: 50vh;
  margin: 0 auto;
  .group {
    background-color: rgb(250, 246, 246);
    border-radius: 5px;
    padding-bottom: 5px;
    margin-bottom: 15px;
    .header {
      background-color: $color;
      padding: 5px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      margin: 5px 0;
      color: white;
      display: flex;
      justify-content: space-between;
    }
    .form-group {
      display: flex;
      margin: 15px 0;
      flex-wrap: wrap;
      label {
        text-align: right;
        align-items: center;
      }
      input,
      select {
        flex-basis: 70%;
        border-radius: 5px;
      }
      option {
        text-transform: capitalize;
      }
    }
  }
  .schedule .content {
    display: flex;
    flex-direction: row;
    .lableS {
      flex-basis: 13%;
      margin-top: 15px;
    }
    .form-group {
      display: flex;
      justify-content: space-between;
      label {
        text-align: left;
        flex-basis: 35%;
      }
    }
  }
}
.button-modal {
  background-color: $color;
}
.is-invalid {
  border: 2px solid red;
  background-color: rgb(240, 179, 179);
}
</style>