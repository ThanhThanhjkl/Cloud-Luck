<template>
  <b-card class="card-contac">
    <div class="form-title text-center">ご担当者情報</div>
    <form class="title-input">
      <FormValidator
        :confirm="confirm"
        :text-required="!confirm"
        label="担当者名"
      >
        <b-input
          v-model="name"
          type="text"
          placeholder="（例）光文花子"
          required
          :readonly="confirm"
        ></b-input>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        :text-required="!confirm"
        label="担当者名カナ"
      >
        <b-input
          v-model="nameKana"
          type="text"
          placeholder="（例）コウブンハナコ"
          required
        ></b-input>
        <span v-if="!confirm" class="input-note"> ※全角カナ </span>
      </FormValidator>
      <FormValidator :confirm="confirm" label="部署名">
        <b-input
          v-model="department"
          type="text"
          placeholder="（例）編集部"
          required
        ></b-input>
      </FormValidator>
      <FormValidator :confirm="confirm" label="役職名">
        <b-input
          v-model="position"
          type="text"
          placeholder="（例）部長"
        ></b-input>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        :text-required="!confirm"
        label="メールアドレス"
        :name="`${prefix}.contact.email`"
      >
        <b-input
          v-model="email"
          type="email"
          placeholder="（例）example@example.com"
          required
        ></b-input>
        <span v-if="!confirm" class="input-note">※ 半角英数</span>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        :text-required="!confirm"
        label="メールアドレス（確認用）"
      >
        <b-input
          v-model="emailConfirm"
          type="email"
          placeholder="（例）example@example.com"
        ></b-input>
        <span v-if="!confirm" class="input-note">※ 半角英数</span>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        :text-required="!confirm"
        label="メールアドレス（予備）"
        :name="`${prefix}.contact.emailSub`"
      >
        <b-input
          v-model="emailSub"
          type="email"
          placeholder="（例）example@example.com"
        ></b-input>
        <span v-if="!confirm" class="input-note">※ 半角英数</span>
      </FormValidator>
      <FormValidator :confirm="confirm" label="メールアドレス（予備確認用）">
        <b-input
          v-model="emailSubConfirm"
          type="email"
          placeholder="（例）example@example.com"
        ></b-input>
        <span v-if="!confirm" class="input-note">※ 半角英数</span>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        label="携帯電話"
        :name="`${prefix}.contact.phoneNumber`"
        :text-required="!confirm"
      >
        <b-input
          v-model="phoneNumber"
          type="text"
          placeholder="（例）0312345678"
          @keypress="isNumber($event)"
        ></b-input>
        <span v-if="!confirm" class="input-note">
          ※「-」は入力不要です。半角英数字で入力してください。
        </span>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        :text-required="!confirm"
        label="日中つながりやすい電話番号"
        :name="`${prefix}.contact.phoneNumberMain`"
      >
        <b-input
          v-model="phoneNumberMain"
          type="text"
          placeholder="（例）0312345678"
          @keypress="isNumber($event)"
        ></b-input>
        <span v-if="!confirm" class="input-note">
          ※「-」は入力不要です。半角英数字で入力してください。
        </span>
      </FormValidator>
    </form>
  </b-card>
</template>
<script>
import FormValidator from "@/components/common/FormValidator";
import { mapFields } from "vuex-map-fields";
export default {
  components: {
    FormValidator,
  },
  props: {
    confirm: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      prefix: "submitApplicationRequest.company",
      validation: "情報を完全に入力してください",
    };
  },

  computed: {
    ...mapFields("business/application", {
      name: "application.company.contact.name",
      nameKana: "application.company.contact.nameKana",
      department: "application.company.contact.department",
      position: "application.company.contact.position",
      email: "application.company.contact.email",
      emailConfirm: "application.company.contact.emailConfirm",
      emailSubConfirm: "application.company.contact.emailSubConfirm",
      emailSub: "application.company.contact.emailSub",
      phoneNumber: "application.company.contact.phoneNumber",
      phoneNumberMain: "application.company.contact.phoneNumberMain",
    }),
  },

  methods: {
    isNumber(event) {
      if (!/\d/.test(event.key) && (event.key !== "." || /\./))
        return event.preventDefault();
    },
  },
};
</script>
