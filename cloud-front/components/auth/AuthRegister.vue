<template>
  <div class="register-pages">
    <b-card class="register-form">
      <div class="form-title text-center">sign up</div>
      <form @submit.prevent="register">
        <FormValidator name="registrationRequest.email">
          <b-input
            v-model="email"
            type="email"
            placeholder="Please enter your e-mail address."
            required
          ></b-input>
        </FormValidator>
        <FormValidator name="registrationRequest.name">
          <b-input
            v-model="name"
            type="name"
            placeholder="Please enter your name."
            required
          ></b-input>
        </FormValidator>
        <FormValidator class="mb-0" name="registrationRequest.password">
          <b-input
            v-model="password"
            type="password"
            placeholder="Please enter your password."
            required
          ></b-input>
        </FormValidator>
        <div class="pass-note text-left">
          ※ Half-width alphanumeric characters (8 digits or more)
        </div>
      </form>

      <div class="submit-area">
        <b-button
          id="captcha-button"
          value="Submit"
          type="submit"
          block
          :disabled="disabled"
          @click="register"
          >register</b-button
        >
      </div>
    </b-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import FormValidator from "@/components/common/FormValidator";
const { mapActions } = createNamespacedHelpers("auth");

export default {
  components: {
    FormValidator,
  },
  data() {
    return {
      email: "",
      name: "",
      password: "",
    };
  },

  computed: {
    disabled() {
      if (!this.email || !this.password || !this.name) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    ...mapActions(["accountRegister"]),

    async register() {
      const params = {
        email: this.email,
        password: this.password,
        name: this.name,
        role: "USER",
      };
      try {
        await this.accountRegister(params);
        this.$toasted.success("メールご確認お願いします");
        this.$router.push("/auth/login");
        this.email = "";
        this.password = "";
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
