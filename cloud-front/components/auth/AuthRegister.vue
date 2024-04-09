<template>
  <div class="register-pages">
    <div v-if="success" class="section-complete">
      <h4 class="section-title text-primary mx-auto">メールをご確認ください</h4>

      <div class="section-body">
        メールに記載されたURLをクリックの上、新規会員登録を続けてください。
        もしメールが届かない場合は、メールアドレスが間違っているか、
        @kokotuku.jpからのメール受信を許可していない可能性があります。
      </div>

      <div class="btn-service-name">
        <b-button to="/" type="submit" variant="primary" block
          >kokodeTUKURU トップ</b-button
        >
      </div>
    </div>
    <b-card v-else class="register-form">
      <div class="form-title text-center">新規登録</div>
      <form @submit.prevent="register">
        <FormValidator name="registrationRequest.email">
          <b-input
            v-model="email"
            type="email"
            placeholder="メールアドレスを入力してください。"
            required
          ></b-input>
        </FormValidator>
        <FormValidator class="mb-0" name="registrationRequest.password">
          <b-input
            v-model="password"
            type="password"
            placeholder="パスワードを入力してください。"
            required
          ></b-input>
        </FormValidator>
        <div class="pass-note text-left">※半角英数字（8桁以上）</div>
      </form>

      <div class="submit-area">
        <b-button
          id="captcha-button"
          value="Submit"
          type="submit"
          block
          :disabled="disabled"
          @click="register"
          >登録する</b-button
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
      passwordConfirmation: "",
      success: false,
      msg: {},
    };
  },

  computed: {
    disabled() {
      if (!this.email || !this.password) {
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
      };
      try {
        await this.accountRegister(params);
        this.$toasted.success("メールご確認お願いします");
        this.success = true;
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
