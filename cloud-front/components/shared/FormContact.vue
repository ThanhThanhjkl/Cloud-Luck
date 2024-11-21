<template>
  <section class="contact">
    <div class="text-center">
      <h3 class="text-primary contact-title">お問い合わせ</h3>
    </div>

    <b-card>
      <font class="text-muted contact-description"
        >弊社プライバシーポリシーをお読みの上、
        以下のフォームに、お客様の情報とお問い合わせ内容を入力し送信して下さい。追って弊社担当より、ご連絡申し上げます。
      </font>
      <hr />

      <form v-if="contact" class="form-contact">
        <FormValidator label="氏名" text-required>
          <div class="d-flex align-items-center">
            <b-input
              v-model="contact.name"
              placeholder="姓"
              class="contact-name mr-4"
              :class="{ disabled: preview }"
              :disabled="preview"
            ></b-input>
            <b-input
              v-model="contact.sur_name"
              placeholder="名"
              class="contact-name"
              :class="{ disabled: preview }"
              :disabled="preview"
            ></b-input>
          </div>
        </FormValidator>

        <FormValidator label="氏名（フリガナ）" text-required>
          <div class="d-flex align-items-center">
            <b-input
              v-model="contact.kana_name"
              placeholder="セイ"
              class="contact-name mr-4"
              :class="{ disabled: preview }"
              :disabled="preview"
            ></b-input>
            <b-input
              v-model="contact.kana_sur_name"
              placeholder="メイ"
              class="contact-name"
              :class="{ disabled: preview }"
              :disabled="preview"
            ></b-input>
          </div>
        </FormValidator>

        <FormValidator label="メールアドレス " text-required>
          <b-input
            v-model="contact.email"
            class="contact-mail"
            :class="{ disabled: preview }"
            :disabled="preview"
          ></b-input>
        </FormValidator>

        <FormValidator label="メールアドレス（確認用）" text-required>
          <b-input
            v-model="contact.email_confirm"
            class="contact-mail"
            :class="{ disabled: preview }"
            :disabled="preview"
          ></b-input>
        </FormValidator>

        <FormValidator label="お問い合わせ内容" text-required>
          <b-form-select
            v-model="contact.inquiry"
            class="contact-inquiry form-control"
            :options="options"
            :class="{ disabled: preview }"
            :disabled="preview"
          ></b-form-select>
        </FormValidator>

        <FormValidator label="お問い合わせ内容（詳細）" text-required>
          <b-textarea
            v-model="contact.content"
            rows="8"
            placeholder="お問い合わせの詳細をご記載ください。"
            :class="{ disabled: preview }"
            :disabled="preview"
          ></b-textarea>
        </FormValidator>

        <div class="text-muted" v-html="caution"></div>

        <div class="submit-area confirm">
          <b-button variant="primary" @click="nextStep">
            {{ preview ? "入力画面に戻る" : "確認画面へ" }}
          </b-button>

          <b-button v-if="preview" variant="danger" @click="submit"
            >送信</b-button
          >
        </div>
      </form>
    </b-card>
  </section>
</template>

<script scoped>
import FormValidator from "@/components/common/FormValidator";
import _ from "lodash";

export default {
  components: {
    FormValidator,
  },

  props: {
    preview: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      options: [
        { value: 0, text: "プロジェクト掲載について" },
        { value: 1, text: "応援購入について" },
        { value: 2, text: "キャンセルについて" },
        { value: 3, text: "その他" },
      ],
      caution: "",
      contact: {
        name: "",
        sur_name: "",
        kana_name: "",
        kana_sur_name: "",
        email: "",
        email_confirm: "",
        inquiry: 0,
        content: "",
      },
    };
  },

  mounted() {
    const contactStorage = sessionStorage.getItem("contact");
    if (contactStorage && contactStorage.name) {
      this.contact = _.cloneDeep(JSON.parse(contactStorage));
    }
  },

  methods: {
    nextStep() {
      if (this.preview) {
        this.$router.go(-1);
      } else {
        this.$emit("confirm", this.contact);
      }
    },
    submit() {
      this.$emit("submit", this.contact);
    },
  },
};
</script>
