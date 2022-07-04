<template>
  <div class="login">
    <div class="container">
      <form v-on:submit.prevent="login" method="post">
        <h1>Welcome</h1>
        <div class="email">
          <input type="text" v-model="loginInput.email" placeholder="Email"/>
          <div class="errors">
            <p v-show="showErrors.emptyEmail" class="error">
              Email is required
            </p>
            <p v-show="showErrors.invalidEmail" class="error">
              Email is invalid
            </p>
          </div>
        </div>
        <div class="password">
          <input type="password" v-model="loginInput.password" placeholder="Password"/>
          <div class="errors">
            <p v-show="showErrors.emptyPassword" class="error">
              Password is required
            </p>
            <p v-show="showErrors.passwordMinLength" class="error">
              Password must have at least 6 letters
            </p>
            <p v-show="showErrors.passwordMaxLength" class="error">
              Password must have at most 255 letters
            </p>
          </div>
        </div>
        <p
          class="errors"
          style="font-size: 14px; color: rgb(209, 80, 80); font-style: italic"
          v-show="errorMessage"
        >
          {{ errorMessage }}
        </p>
        <button
          type="submit"
          :disabled="disabledLogin"
          :class="{ disableBtn: disabledLogin }"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: 'Login',
  data() {
    return {
      loginInput: {
        email: "",
        password: "",
      },
      disabledLogin: false,
      showErrors: {},
    };
  },
  computed: {
    ...mapGetters({
      errorMessage: "ERROR/errorMessage",
      validateLogin: "VALIDATION/validateLogin",
    }),
  },
  methods: {
    ...mapActions({
      clearErrorMessage: "ERROR/clearErrorMessage",
      loginAction: "AUTH/login",
    }),
    login() {
      if (!this.validateBeforeSubmit()) {
        this.disabledLogin = true;
        return;
      } else {
        this.loginAction(this.loginInput);
        this.disabledLogin = true;
      }
    },
    validateBeforeSubmit() {
      let passedValidate = true;
      const errors = this.validateLogin(this.loginInput);
      if (errors) {
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
          "emptyPassword",
          this.showErrors && !!errors && errors.emptyPassword
        );
        Vue.set(
          this.showErrors,
          "passwordMinLength",
          this.showErrors && !!errors && errors.passwordMinLength
        );
        Vue.set(
          this.showErrors,
          "passwordMaxLength",
          this.showErrors && !!errors.passwordMaxLength
        );
        passedValidate = false;
      }
      return passedValidate;
    },
  },
  watch: {
    "loginInput.email"() {
      Vue.set(this.showErrors, "emptyEmail", false);
      Vue.set(this.showErrors, "invalidEmail", false);
      this.clearErrorMessage();
      this.disabledLogin = false;
    },
    "loginInput.password"() {
      Vue.set(this.showErrors, "emptyPassword", false);
      Vue.set(this.showErrors, "passwordMinLength", false);
      Vue.set(this.showErrors, "passwordMaxLength", false);
      this.clearErrorMessage();
      this.disabledLogin = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/style/common.scss";

.login {
  height: 100vh;
  width: 100%;
  background-color: #dbdbdb;
  position: relative;
  text-align: center;
  .container {
    height: $height-login;
    width: $width-login;
    background-color: $bc-login;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    h1 {
      text-transform: uppercase;
      margin: 0;
      margin-bottom: 0.5em;
      font-size: 2em;
      font-weight: 900;
      font-family: "Noto Sans JP", sans-serif;
    }
    form {
      width: 75%;
      margin: 1.7em auto;
      input,
      button,
      a {
        border-radius: 5px;
        border: 1.5px solid rgb(78, 76, 76);
        height: 3.625em;
        width: 45%;
        margin-top: 1.25em;
        background-color: #f2f2f2;
        color: white;
      }
      a {
        border: 0.09375em solid $bc-login;
        text-decoration: none;
        padding: 0.9375em;
      }
      [type="text"],
      [type="password"] {
        width: 100%;
        display: block;
        background-color: none;
        padding: 0 5%;
        font-size: 1.1em;
        color: black;
      }
      [type="submit"] {
        width: 100%;
        background-color: $color;
      }
      .social {
        display: flex;
        justify-content: space-between;

        #fb {
          background-color: #4795ff;
          vertical-align: middle;
        }
        #gg {
          background-color: #ea4336;
        }
      }
      .disableBtn {
        background-color: rgb(135, 182, 203);
      }
    }
  }
}
::placeholder {
  color: black;
}
</style>