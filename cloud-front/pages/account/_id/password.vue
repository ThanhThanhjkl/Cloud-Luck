<template>
  <div class="changeinfo detail">
    <AuthRegisterInfo class="mb-4"></AuthRegisterInfo>
    <div class="mx-lg-5">
      <div
        v-if="user"
        id="register-setting-1"
        accordion="register-setting"
        class="password-setting"
      >
        <b-card>
          <div class="form-title text-center">パスワード設定</div>
          <form @submit.prevent="submitForm">
            <FormValidator name="createRequest.password" class="mb-1">
              <b-input
                v-model="oldPassword"
                type="password"
                placeholder="現在のパスワードを入力してください"
                required
              >
              </b-input>
              <div class="pass-note mb-2">※半角英数字（8桁以上）</div>
            </FormValidator>

            <FormValidator class="mb-1" name="resetRequest.password">
              <b-input
                v-model="password"
                type="password"
                placeholder="新パスワード"
                required
              ></b-input>
              <div class="pass-note">※半角英数字（8桁以上）</div>
            </FormValidator>

            <FormValidator>
              <b-input
                v-model="passwordConfirmation"
                type="password"
                placeholder="新パスワード（確認用）"
                class="mt-3"
                required
                :class="{ 'border border-danger': !error }"
              ></b-input>
              <div class="pass-note mb-4">※半角英数字（8桁以上）</div>

              <p v-if="!error" class="text-danger">
                新しいパスワードと再確認パスワードが一致しません
              </p>
            </FormValidator>
          </form>

          <div class="submit-area">
            <b-button
              type="submit"
              variant="primary"
              block
              :disabled="!clickable"
              @click="newPassword"
              >更新する</b-button
            >
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import AuthRegisterInfo from "@/components/auth/AuthRegisterInfo";
import { createNamespacedHelpers } from "vuex";
import FormValidator from "@/components/common/FormValidator";

const { mapState, mapActions } = createNamespacedHelpers("auth");

export default {
  components: {
    AuthRegisterInfo,
    FormValidator,
  },

  layout: "auth",

  data() {
    return {
      password: "",
      oldPassword: "",
      passwordConfirmation: "",
      error: true,
    };
  },
  computed: {
    ...mapState(["user"]),
    clickable() {
      if (this.password && this.oldPassword && this.passwordConfirmation) {
        return true;
      } else return false;
    },
    confirmPassword() {
      return this.passwordConfirmation;
    },
  },

  watch: {
    confirmPassword(value) {
      if (value !== this.password) {
        return (this.error = false);
      } else {
        return (this.error = true);
      }
    },
  },
  mounted() {
    if (!this.user) {
      this.$router.push("/auth/login");
    }
  },
  methods: {
    ...mapActions(["changePassword", "createToken"]),
    async newPassword() {
      try {
        const token = await this.createToken({ password: this.oldPassword });
        if (this.password === this.passwordConfirmation) {
          this.changePassword({
            oneTimeToken: token.body,
            password: this.password,
          }).then(() => {
            this.password = "";
            this.passwordConfirmation = "";
            this.oldPassword = "";
            this.$toast.success("成功");
          });
        } else {
          this.$toast.error("新しいパスワードと再確認パスワードが一致しません");
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
