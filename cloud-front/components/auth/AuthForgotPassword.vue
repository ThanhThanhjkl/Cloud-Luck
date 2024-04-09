<template>
  <div>
    <div v-if="success" class="section-complete">
      <h4 class="section-title text-primary mx-auto">メールをご確認ください</h4>
      <div class="section-body">
        メールに記載されたURLをクリックの上、パスワード再設定を続けてください。
        もしメールが届かない場合は、メールアドレスが間違っているか、
        @kokotuku.jpからのメール受信を許可していない可能性があります。
      </div>

      <div class="btn-service-name">
        <b-button class="fw-bolder" to="/" type="submit" variant="primary" block
          >kokodeTUKURU トップ</b-button
        >
      </div>
    </div>
    <b-card v-else class="forgot-pass-form">
      <div class="form-title text-center">パスワード再設定</div>
      <form @submit.prevent="submitForgot">
        <div id class="note-description">
          パスワード再設定用URLを送信しますので、ご登録いただいているメールアドレスを入力し「送信する」ボタンを押してください。
        </div>
        <FormValidator name="request.email">
          <b-input
            v-model="email"
            type="email"
            placeholder="メールアドレスを入力してください。"
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
          >送信する</b-button
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
      success: false,
    };
  },

  computed: {
    disabled() {
      if (!this.email) {
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
        await this.forgotPassword({ email: this.email });
        this.$toast.success("メールご確認お願いします");
        this.success = true;
        this.email = "";
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
