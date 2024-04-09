<template>
  <b-container class="page-consultation" fluid="xl">
    <section>
      <div class="consultation-title">プロジェクト掲載・相談フォーム</div>
    </section>
    <ContactInfo></ContactInfo>
    <CorporateInfo></CorporateInfo>
    <IndividualAuthor></IndividualAuthor>
    <AboutProject></AboutProject>
    <b-button
      type="button"
      variant="primary"
      block
      class="btn-submit"
      @click="toConfirmPage"
    >
      確認画面へ
    </b-button>
  </b-container>
</template>
<script>
import IndividualAuthor from "@/components/consultation/IndividualAuthor.vue";
import ContactInfo from "@/components/consultation/ContactInfo";
import CorporateInfo from "@/components/consultation/CorporateInfo";
import AboutProject from "@/components/consultation/AboutProject";

import { mapFields } from "vuex-map-fields";

export default {
  components: {
    IndividualAuthor,
    ContactInfo,
    CorporateInfo,
    AboutProject,
  },

  computed: {
    ...mapFields("global", {
      keepError: "keepError",
    }),
  },

  beforeDestroy() {
    this.keepError = false;
  },

  methods: {
    toConfirmPage() {
      this.$router.push("/consultation/company/confirm");
    },
  },
};
</script>
