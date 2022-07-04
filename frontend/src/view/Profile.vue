<template>
  <div class="profile">
    <div class="container" v-if="userInfo">
      <form @submit.prevent="changeInf">
        <div class="avt">
          <img v-if="!fileInput && !userInfo.avatar" src="../assets/avt.png" />
          <img v-else-if="fileInput" :src="fileInput" />
          <img v-else :src="userInfo.avatar" alt="" />
          <div class="capnhat">
            <i class="bx bx-camera" v-on:click="handleClickInputFile"></i>
            <br />
            <input
              type="file"
              accept="image/*"
              @change="onFileChange"
              ref="fileInputAvt"
              style="display: none"
            />
          </div>
        </div>
        <div class="inf">
          <div class="form-group">
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
          <div class="btn-user">
            <b-button
              :disabled="disabledInfSave"
              style="margin-left: 1em"
              type="submit"
            >
              Save changes
            </b-button>
          </div>
        </div>
      </form>
      <form @submit.prevent="changePassword">
        <div class="password">
          <div class="form-group current-password">
            <label for="">Current password</label>
            <input
              class="form-control"
              type="password"
              v-model.trim="passwordReset.password"
            />
            <div class="errors">
              <p class="error" v-show="showErrors.emptyOldPassword">
                Password is requied
              </p>
              <p class="error" v-show="showErrors.oldPasswordMaxLength">
                Password must have at most 255 letters
              </p>
              <p class="error" v-show="showErrors.oldPasswordMinLength">
                Password must have at least 6 letters
              </p>
            </div>
          </div>
          <div class="form-group new-password">
            <label for="">New password</label>
            <input
              class="form-control"
              type="password"
              v-model.trim="passwordReset.new_password"
            />
            <div class="errors">
              <p class="error" v-show="showErrors.emptyNewPassword">
                New password is requied
              </p>
              <p class="error" v-show="showErrors.newPasswordMaxLength">
                New password must have at most 255 letters
              </p>
              <p class="error" v-show="showErrors.newPasswordMinLength">
                New password must have at least 6 letters
              </p>
            </div>
          </div>
          <div class="form-group confirm-password">
            <label for="">Confirm password</label>
            <input
              class="form-control"
              type="password"
              v-model.trim="confirmPassword"
            />
            <div class="errors">
              <p class="error" v-show="showErrors.emptyConfirmPassword">
                Confirm password is requied
              </p>
              <p class="error" v-show="showErrors.confirmPasswordMaxLength">
                Confirm password must have at most 255 letters
              </p>
              <p class="error" v-show="showErrors.confirmPasswordMinLength">
                Confirm password must have at least 6 letters
              </p>
            </div>
          </div>
          <div style="text-align: center">
            <p class="error" v-show="showErrors.cofirmationNotMatch">
              The Confirm Password confirmation dose not match
            </p>
            <p class="error" v-show="showErrors.oldPassWordBeSameNewPassword">
              Your new password cannot be the same as your current password
            </p>
          </div>

          <div class="btn-user">
            <b-button
              :disabled="disabledPasswordSave"
              style="margin-left: 1em"
              type="submit"
            >
              Save Password
            </b-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Vue from "vue";
export default {
  name: "Profile",
  data() {
    return {
      fileInput: null,
      avtFile: null,
      avtUrl: null,
      disabledInfSave: false,
      disabledPasswordSave: false,
      passwordReset: {
        password: "",
        new_password: "",
      },
      confirmPassword: "",
      errorMessage: null,
      showErrors: {},
    };
  },
  computed: {
    ...mapGetters({
      urlAvt: "PROFILE/urlAvt",
      userInfo: "AUTH/userInfo",
      validatePassword: "VALIDATION/validatePassword",
      validateProfile: "VALIDATION/validateProfile",
    }),
  },
  methods: {
    ...mapActions({
      clearErrorMessage: "ERROR/clearErrorMessage",
      changeUserInfo: "PROFILE/changeUserInfo",
      changePasswordAction: "PROFILE/changePassword",
      getUrlAvt: "PROFILE/getUrlAvt",
    }),
    handleClickInputFile() {
      this.$refs.fileInputAvt.click();
    },
    onFileChange(e) {
      this.avtFile = e.target.files[0];
      this.fileInput = URL.createObjectURL(this.avtFile);
      this.disabledInfSave = false;
    },
    changeInf() {
      this.disabledInfSave = true;
      if (!this.validateProfileBeforeSubmit()) {
        return;
      } else {
        var info = new Object();
        if (
          this.userInfo.name != JSON.parse(localStorage.getItem("user")).name
        ) {
          info.name = this.userInfo.name;
        }
        if (this.avtFile != null) {
          const formData = new FormData();
          formData.append("file", this.avtFile);
          formData.append("upload_preset", "wfcqkljk");
          this.getUrlAvt(formData)
            .then(() => {
              if (this.urlAvt != null) {
                info.avatar = this.urlAvt;
              }
              this.changeUserInfo(info);
            })
            .catch((error) => {
              console.log("loi", error);
            });
        } else {
          if (info.name == null) {
            return;
          } else {
            this.changeUserInfo(info);
          }
        }
      }
    },
    changePassword() {
      if (!this.validatePasswordBeforeSubmit()) {
        return;
      } else {
        this.changePasswordAction(this.passwordReset);
      }
      this.disabledPasswordSave = true;
    },
    validateProfileBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateProfile(this.userInfo);
      if (errors) {
        Vue.set(
          this.showErrors,
          "emptyprofileName",
          this.showErrors && !!errors && errors.emptyprofileName
        );
        Vue.set(
          this.showErrors,
          "profileNameMaxLength",
          this.showErrors && !!errors && errors.profileNameMaxLength
        );
        passedValidate = false;
      }
      return passedValidate;
    },
    validatePasswordBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validatePassword(
        this.passwordReset.password,
        this.passwordReset.new_password,
        this.confirmPassword
      );
      if (errors) {
        Vue.set(
          this.showErrors,
          "emptyOldPassword",
          this.showErrors && !!errors && errors.emptyOldPassword
        );
        Vue.set(
          this.showErrors,
          "emptyNewPassword",
          this.showErrors && !!errors && errors.emptyNewPassword
        );
        Vue.set(
          this.showErrors,
          "emptyConfirmPassword",
          this.showErrors && !!errors && errors.emptyConfirmPassword
        );
        Vue.set(
          this.showErrors,
          "oldPasswordMaxLength",
          this.showErrors && !!errors && errors.oldPasswordMaxLength
        );
        Vue.set(
          this.showErrors,
          "oldPasswordMinLength",
          this.showErrors && !!errors && errors.oldPasswordMinLength
        );
        Vue.set(
          this.showErrors,
          "newPasswordMaxLength",
          this.showErrors && !!errors && errors.newPasswordMaxLength
        );
        Vue.set(
          this.showErrors,
          "newPasswordMinLength",
          this.showErrors && !!errors && errors.newPasswordMinLength
        );
        Vue.set(
          this.showErrors,
          "confirmPasswordMaxLength",
          this.showErrors && !!errors && errors.confirmPasswordMaxLength
        );
        Vue.set(
          this.showErrors,
          "confirmPasswordMinLength",
          this.showErrors && !!errors && errors.confirmPasswordMinLength
        );
        Vue.set(
          this.showErrors,
          "cofirmationNotMatch",
          this.showErrors && !!errors && errors.cofirmationNotMatch
        );
        Vue.set(
          this.showErrors,
          "oldPassWordBeSameNewPassword",
          this.showErrors && !!errors && errors.oldPassWordBeSameNewPassword
        );
        passedValidate = false;
      }
      return passedValidate;
    },
  },
  watch: {
    "userInfo.name"(val) {
      console.log(val);
      Vue.set(this.showErrors, "emptyprofileName", null);
      Vue.set(this.showErrors, "profileNameMaxLength", null);
      this.disabledInfSave = false;
    },
    "passwordReset.password"() {
      Vue.set(this.showErrors, "emptyOldPassword", null);
      Vue.set(this.showErrors, "oldPasswordMaxLength", null);
      Vue.set(this.showErrors, "oldPasswordMinLength", null);
      Vue.set(this.showErrors, "cofirmationNotMatch", null);
      Vue.set(this.showErrors, "oldPassWordBeSameNewPassword", null);
      this.disabledPasswordSave = false;
    },
    "passwordReset.new_password"() {
      Vue.set(this.showErrors, "emptyNewPassword", null);
      Vue.set(this.showErrors, "newPasswordMaxLength", null);
      Vue.set(this.showErrors, "newPasswordMinLength", null);
      Vue.set(this.showErrors, "cofirmationNotMatch", null);
      Vue.set(this.showErrors, "oldPassWordBeSameNewPassword", null);
      this.disabledPasswordSave = false;
    },
    confirmPassword() {
      Vue.set(this.showErrors, "emptyConfirmPassword", null);
      Vue.set(this.showErrors, "confirmPasswordMaxLength", null);
      Vue.set(this.showErrors, "confirmPasswordMinLength", null);
      Vue.set(this.showErrors, "cofirmationNotMatch", null);
      Vue.set(this.showErrors, "oldPassWordBeSameNewPassword", null);
      this.disabledPasswordSave = false;
    },
  },

  async created() {
    this.disabledInfSave = true;
    this.disabledPasswordSave = true;
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";
.profile {
  margin: 0 auto;
  .container {
    width: 60%;
    form {
      .btn-user {
        display: flex;
        justify-content: center;
        button {
          border: 1px solid $color;
          padding: 0.5em 1em;
          border-radius: 10px;
          background-color: $color;
          color: white;
        }
      }
    }

    .avt {
      position: relative;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin: 0 auto;
      text-align: center;
      margin-bottom: 3em;

      img {
        width: 150px;
        height: 150px;
        border-radius: 50%;
      }
      i {
        font-size: 2em;
        position: absolute;
        top: 4.5em;
        left: 4.3em;
        padding: 0.2em;
        background-color: rgb(117, 116, 116);
        border-radius: 50%;
        color: white;
        opacity: 0.5;
      }
    }

    .inf,
    .password {
      background-color: rgb(247, 245, 245);
      margin: 2em;
      padding: 1em;
      border-radius: 10px;
    }

    .form-group {
      margin: 1em;
      display: flex;
      flex-wrap: wrap;
      label {
        align-items: center;
        padding: 0.5em;
        flex-basis: 25%;
      }
      input {
        flex-basis: 75%;
        width: 100%;
        padding: 0.5em;
      }
      .invalid-feedback {
        margin-left: 25%;
      }
    }
  }
}
</style>