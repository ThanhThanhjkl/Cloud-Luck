<template>
  <div class="changeinfo detail">
    <div class="mx-lg-5">
      <div
        v-if="userId"
        id="register-setting-1"
        accordion="register-setting"
        class="password-setting"
      >
        <b-card>
          <div class="form-title text-center">Password setting</div>
          <form @submit.prevent="submitForm">
            <FormValidator label="Password" class="mb-1" required>
              <b-input
                v-model="password"
                type="password"
                placeholder="Please enter your current password"
                required
              >
              </b-input>
              <div class="pass-note mb-2">
                ※Half-width alphanumeric characters (8 digits or more)
              </div>
            </FormValidator>

            <FormValidator class="mb-1" label="New Password" required>
              <b-input
                v-model="newPassword"
                type="password"
                placeholder="New password"
                required
              ></b-input>
              <div class="pass-note">
                ※Half-width alphanumeric characters (8 digits or more)
              </div>
            </FormValidator>

            <FormValidator label="Confirm Password" required>
              <b-input
                v-model="passwordConfirmation"
                type="password"
                placeholder="New password (for confirmation)"
                class="mt-3"
                required
                :class="{ 'border border-danger': !error }"
              ></b-input>
              <div class="pass-note mb-4">
                ※Half-width alphanumeric characters (8 digits or more)
              </div>

              <p v-if="!error" class="text-danger">
                New password and reconfirm password do not match
              </p>
            </FormValidator>
          </form>

          <div class="submit-area">
            <b-button
              type="submit"
              variant="primary"
              block
              :disabled="!clickable"
              @click="submitChangePassword"
              >更新する</b-button
            >
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import FormValidator from "@/components/common/FormValidator";

const { mapState, mapActions } = createNamespacedHelpers("auth");

export default {
  components: {
    FormValidator,
  },

  layout: "auth",

  data() {
    return {
      password: "",
      newPassword: "",
      passwordConfirmation: "",
      error: true,
    };
  },
  computed: {
    ...mapState(["userId"]),
    clickable() {
      if (this.newPassword && this.password && this.passwordConfirmation) {
        return true;
      } else return false;
    },
    confirmPassword() {
      return this.passwordConfirmation;
    },
  },

  watch: {
    confirmPassword(value) {
      if (value !== this.newPassword) {
        return (this.error = false);
      } else {
        return (this.error = true);
      }
    },
  },
  mounted() {
    if (!this.userId) {
      this.$router.upsh("/auth/login");
    }
  },
  methods: {
    ...mapActions(["changePassword"]),
    submitChangePassword() {
      try {
        if (this.newPassword === this.passwordConfirmation) {
          const params = {
            id: this.userId,
            password: this.password,
            newPassword: this.newPassword,
            confirmPassword: this.confirmPassword,
          };
          this.changePassword(params).then(() => {
            this.password = "";
            this.passwordConfirmation = "";
            this.newPassword = "";
            this.$toast.success("Password updated successfully");
          });
        } else {
          this.$toast.error("Error");
        }
      } catch (e) {
        alert(e.message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.border-danger {
  background: red;
}
</style>
