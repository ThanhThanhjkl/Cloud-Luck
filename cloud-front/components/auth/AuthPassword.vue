<template>
  <div>
    <b-card class="pass-setting-form">
      <div class="form-title text-center">パスワード再設定</div>
      <form>
        <div class="note-description">
          新しいパスワードを入力し「パスワードを再設定する」ボタンを押してください。
        </div>
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
            required
          ></b-input>
          <div v-if="errors" class="error mt-2">
            パスワード確認と新しいパスワードが異なります
          </div>
          <div class="pass-note">※半角英数字（8桁以上）</div>
        </FormValidator>
      </form>

      <div class="submit-area">
        <b-button
          type="button"
          variant="primary"
          block
          class="btn-login"
          @click="onResetPassword"
        >
          パスワードを再設定する
        </b-button>
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
      password: "",
      passwordConfirmation: "",
      errors: false,
    };
  },

  watch: {
    passwordConfirmation(value) {
      if (value.toString() !== this.password.toString()) {
        this.errors = true;
      } else {
        this.errors = false;
      }
    },
    password(value) {
      if (value.toString() !== this.passwordConfirmation.toString()) {
        this.errors = true;
      } else {
        this.errors = false;
      }
    },
  },

  methods: {
    ...mapActions(["resetPassword"]),

    async onResetPassword() {
      // TODO
      try {
        const token = this.$route.query.token;
        const params = {
          oneTimeToken: token,
          password: this.password,
        };
        if (token && !this.errors) {
          await this.resetPassword(params);
          this.$toast.success("パスワードのリセットが成功しました");
          this.$router.push("/auth/reset/success");
        }
      } catch (error) {}
    },
  },
};
</script>
<style lang="scss" scoped>
.error {
  font-size: 80%;
  color: #dc3545;
}
</style>
