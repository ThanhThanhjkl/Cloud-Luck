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
          <div class="form-title text-center">Cài đặt mật khẩu</div>
          <form @submit.prevent="submitForm">
            <FormValidator label="Mật khẩu hiện tại" class="mb-1" required>
              <b-input
                v-model="password"
                type="password"
                placeholder="Vui lòng nhập mật khẩu hiện tại"
                required
              >
              </b-input>
              <div class="pass-note mb-2">
                ※Mật khẩu gồm chữ/số, tối thiểu 8 ký tự
              </div>
            </FormValidator>

            <FormValidator class="mb-1" label="Mật khẩu mới" required>
              <b-input
                v-model="newPassword"
                type="password"
                placeholder="Nhập mật khẩu mới"
                required
              ></b-input>
              <div class="pass-note">
                ※Mật khẩu gồm chữ/số, tối thiểu 8 ký tự
              </div>
            </FormValidator>

            <FormValidator label="Xác nhận mật khẩu" required>
              <b-input
                v-model="passwordConfirmation"
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                class="mt-3"
                required
                :class="{ 'border border-danger': !error }"
              ></b-input>
              <div class="pass-note mb-4">
                ※Mật khẩu gồm chữ/số, tối thiểu 8 ký tự
              </div>

              <p v-if="!error" class="text-danger">
                Mật khẩu mới và mật khẩu xác nhận không khớp
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
              >Cập nhật</b-button
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
            this.$toast.success("Cập nhật mật khẩu thành công");
          });
        } else {
          this.$toast.error("Lỗi");
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
