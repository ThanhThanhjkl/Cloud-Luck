<template>
  <div>
    <b-card class="forgot-pass-form">
      <div class="form-title text-center">Resetting a password</div>
      <form @submit.prevent="submitForgot">
        <div id class="note-description">
          We will send you a password reset URL, so please enter your registered
          email address and press the "Send" button.
        </div>
        <FormValidator>
          <b-input
            v-model="email"
            type="email"
            placeholder="Please enter your e-mail address."
            required
          ></b-input>
        </FormValidator>

        <FormValidator>
          <b-input
            v-model="password"
            type="password"
            placeholder="Please enter your password"
            required
          ></b-input>
        </FormValidator>

        <FormValidator>
          <b-input
            v-model="confirmPassword"
            type="password"
            placeholder="Please enter your password confirmation"
            required
          ></b-input>
        </FormValidator>
      </form>

      <div class="submit-area">
        <b-button
          type="submit"
          variant="primary"
          block
          class="btn-login"
          :disabled="!email"
          @click="submitForgot"
          >Reset</b-button
        >
      </div>
    </b-card>
  </div>
</template>

<script>
import FormValidator from "@/components/common/FormValidator";

import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("auth");
export default {
  components: {
    FormValidator,
  },

  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },

  computed: {
    disabled() {
      if (!this.email || !this.password || !this.confirmPassword) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    ...mapActions(["forgotPassword"]),

    async submitForgot() {
      try {
        if (!this.email) {
          return;
        }
        const params = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword,
        };
        await this.forgotPassword(params).then((res) => {
          this.$toast.success(res);
        });
        this.$router.push("/auth/login");
      } catch (error) {}
    },
  },
};
</script>
<style lang="scss" scoped>
.section-complete {
  margin-top: 135px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  text-align: center;
  @include max-width(md) {
    margin-top: 50px;
  }
  .section-title {
    margin-bottom: 60px;
    font-size: 24px;
  }
  .section-body {
    margin-bottom: 80px;
    font-size: 14px;
  }
  .btn-service-name {
    max-width: 320px;
    text-align: center;
    margin: auto;
  }
}
</style>
