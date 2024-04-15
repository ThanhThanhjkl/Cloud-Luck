<template>
  <div class="about-project">
    <b-card>
      <div class="form-title text-center">プロジェクトについて</div>
      <div class="form-des">
        <form @submit.prevent="submitForm">
          <FormValidator :confirm="confirm" label="本文"
            ><b-form-textarea
              id="textarea"
              v-model="aboutProject"
              placeholder="何をやるのか/プロジェクトの面白い点や新しい点、共感される点などの特徴/なぜやるのか/どのようになるのか/誰がやるのか/いつやるのか/プロジェクトの内容が伝わる動画や画像など"
              rows="9"
              maxlength="1000"
              :readonly="confirm"
            ></b-form-textarea
          ></FormValidator>
          <FormValidator
            :confirm="confirm"
            label="想定プロジェクト掲載希望期間"
            :text-required="!confirm"
            :name="`${prefix}.preferredPublicationDateStart`"
          >
            <div class="request-date">
              <date-picker
                v-model="preferredPublicationDateStart"
                value-type="format"
                :disabled="confirm"
              >
              </date-picker>
              ~
              <date-picker
                v-model="preferredPublicationDateEnd"
                value-type="format"
                :disabled="confirm"
              >
              </date-picker>
            </div>
          </FormValidator>
          <FormValidator
            :confirm="confirm"
            label="目標金額"
            :name="`${prefix}.targetAmount`"
            :text-required="!confirm"
          >
            <div class="d-flex">
              <b-input
                v-model="targetAmount"
                class="col-6 target-amount"
                type="text"
                placeholder="（例）100,000"
                required
                :readonly="confirm"
                @keypress="isNumber($event)"
              ></b-input>
              <span class="mt-auto mb-auto ml-2">円</span>
            </div>
            <span v-if="!confirm" class="input-note"
              >※目標金額は100,000円以上の金額で入力してください。</span
            >
          </FormValidator>
        </form>
      </div>
    </b-card>
  </div>
</template>
<script>
import FormValidator from "@/components/common/FormValidator";
import DatePicker from "vue2-datepicker";
// import { mapFields } from "vuex-map-fields";
export default {
  components: { FormValidator, DatePicker },

  props: {
    confirm: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      prefix: "submitApplicationRequest.project",
    };
  },

  computed: {},

  methods: {
    isNumber(event) {
      if (!/\d/.test(event.key) && (event.key !== "." || /\./))
        return event.preventDefault();
    },
  },
};
</script>
<style lang="scss" scoped>
.target-amount {
  max-width: 240px;
}
</style>
