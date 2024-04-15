<template>
  <b-card class="card-author">
    <div class="form-title text-center">記載者について</div>
    <form class="form-des">
      <FormValidator
        :confirm="confirm"
        label="HPやブログなどのURL"
        name="submitApplicationRequest.publisher.website"
        :text-required="!confirm"
      >
        <b-input
          v-model="website"
          :readonly="confirm"
          type="text"
          placeholder="（例）https://www.kobunsha.com/"
        ></b-input>
      </FormValidator>
      <FormValidator :confirm="confirm" label="本文"
        ><b-form-textarea
          id="textarea"
          v-model="body"
          placeholder="自己紹介などを記入してください"
          rows="9"
          maxlength="1000"
          :readonly="confirm"
        ></b-form-textarea>
      </FormValidator>
    </form>
  </b-card>
</template>
<script>
import FormValidator from "@/components/common/FormValidator";
export default {
  components: { FormValidator },

  props: {
    confirm: {
      type: Boolean,
      default: false,
    },
  },

  computed: {},
};
</script>
