<template>
  <div class="auth-login-page">
    <b-card class="login-email-form">
      <div class="form-title text-center">Login with email address</div>
      <form @submit.prevent="login">
        <FormValidator name="loginRequest.email">
          <b-input
            v-model="email"
            :class="{ error: emailError }"
            type="email"
            placeholder="Please enter your e-mail address."
            required
          ></b-input>
        </FormValidator>
        <FormValidator name="loginRequest.password" class="mb-0">
          <b-input
            v-model="password"
            :class="{ error: passwordError }"
            type="password"
            placeholder="Please enter your password."
            required
          ></b-input>
          <span class="text-muted">
            ※ Half-width alphanumeric characters (8 digits or more)</span
          >
        </FormValidator>

        <div class="text-right">
          <nuxt-link to="/auth/forgot" class="d-inline-block small forgot-pass">
            Forgot password
          </nuxt-link>
        </div>
      </form>

      <div class="submit-area">
        <b-button
          type="submit"
          variant="primary"
          block
          class="btn-login"
          :disabled="disabled"
          @click="login"
          >Login</b-button
        >
        <nuxt-link
          to="/auth/registeration"
          block
          class="btn btn-block btn-sign-up"
        >
          <svg-mail></svg-mail>
          <span>Sign Up</span>
        </nuxt-link>
      </div>
    </b-card>

    <b-card class="login-external-id">
      <div class="form-title text-center">Log in with external site ID</div>
      <div class="btn-external">
        <a block class="btn btn-block btn-twitter" @click="redirectTwitter">
          <svg-twitter></svg-twitter>
          <span>Twitter</span>
        </a>
        <a block class="btn btn-block btn-facebook">
          <svg-signup-facebook></svg-signup-facebook>
          <span>Facebook</span>
        </a>
        <a block class="btn btn-block btn-line" @click="redirectLine">
          <svg-line-circle></svg-line-circle>
          <span>LINE</span>
        </a>
        <a block class="btn btn-block btn-instagram" @click="redirectInstagram">
          <svg-instagram></svg-instagram>
          <span>Instagram</span>
        </a>
      </div>
    </b-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import SvgMail from "@/components/common/svg/SvgMail";
import SvgTwitter from "@/components/common/svg/SvgTwitter";
import SvgSignupFacebook from "@/components/common/svg/SvgSignUpFacebook";
import SvgLineCircle from "@/components/common/svg/SvgLineCircle";
import SvgInstagram from "@/components/common/svg/SvgInstagram";
import FormValidator from "@/components/common/FormValidator";

const { mapActions } = createNamespacedHelpers("auth");
export default {
  components: {
    SvgMail,
    SvgTwitter,
    SvgSignupFacebook,
    SvgLineCircle,
    SvgInstagram,
    FormValidator,
  },
  data() {
    return {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
    };
  },

  computed: {
    disabled() {
      if (!this.email || !this.password) {
        return true;
      } else return false;
    },
    accountId() {
      return this.account.id;
    },
  },

  methods: {
    ...mapActions(["accountLogin"]),

    async login() {
      const params = {
        email: this.email,
        password: this.password,
      };
      try {
        const res = await this.accountLogin(params);
        if (res.token !== null) {
          this.$router.push(`/`);
        }
      } catch (error) {}
    },

    redirectInstagram() {
      this.getRedirectInstagram();
    },

    redirectLine() {
      this.getRedirectLine();
    },
    redirectTwitter() {
      this.getRedirectTwitter();
    },
  },
};
</script>
