<template>
  <b-container class="page-consultation" fluid="xl">
    <section>
      <div class="consultation-title">
        <div>プロジェクト掲載・相談フォーム</div>
        <div class="consultation-note">
          内容をご確認の上、「送信」ボタンを押してください
        </div>
      </div>
      <div class="result-consultation">
        <ContactInfo confirm></ContactInfo>
        <CorporateInfo confirm></CorporateInfo>
        <IndividualAuthor confirm></IndividualAuthor>
        <AboutProject confirm></AboutProject>

        <div>
          <b-button type="button" block class="btn-send" @click="onSave">
            送信
          </b-button>
          <b-button
            type="submit"
            block
            class="btn-return"
            @click="$router.go(-1)"
          >
            戻る
          </b-button>
        </div>
      </div>
    </section>
  </b-container>
</template>
<script>
import IndividualAuthor from "@/components/consultation/IndividualAuthor";
import ContactInfo from "@/components/consultation/ContactInfo";
import CorporateInfo from "@/components/consultation/CorporateInfo";
import AboutProject from "@/components/consultation/AboutProject";

import { omit } from "lodash";
import { createNamespacedHelpers } from "vuex";
import { mapFields } from "vuex-map-fields";
const { mapActions, mapState } = createNamespacedHelpers(
  "business/application"
);
export default {
  components: {
    IndividualAuthor,
    ContactInfo,
    CorporateInfo,
    AboutProject,
  },

  computed: {
    ...mapState(["application"]),

    ...mapFields("global", {
      keepError: "keepError",
    }),
  },

  methods: {
    ...mapActions(["updateApplication", "resetApplication"]),

    async onSave() {
      try {
        await this.updateApplication(omit(this.application, "company.images"));
        this.keepError = false;
        this.resetApplication();
        this.$router.push("/consultation/complete");
      } catch (error) {
        this.keepError = true;
        this.$router.go(-1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.page-consultation {
  button,
  a {
    width: 80%;
    margin: auto;
    padding: 15px 0;
    &.btn-send {
      border: none;
      background-color: $red;
      margin-bottom: 24px;
      width: 45%;
      max-width: 320px;
      @include max-width(md) {
        width: 70%;
      }
    }
    &.btn-return {
      width: 45%;
      max-width: 320px;
      color: $primary;
      border: 2px solid $gray-02;
      background-color: white;
      margin-bottom: 64px;
      @include max-width(md) {
        width: 70%;
      }
    }
  }
}
</style>
