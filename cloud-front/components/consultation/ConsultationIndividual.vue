<template>
  <b-container class="page-consultation" fluid="xl">
    <section>
      <div class="consultation-title">プロジェクト掲載・相談フォーム</div>
    </section>
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
import IndividualAuthor from "@/components/consultation/IndividualAuthor";
import AboutProject from "@/components/consultation/AboutProject";

import { mapFields } from "vuex-map-fields";

export default {
  components: {
    IndividualAuthor,
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
      this.$router.push("/consultation/individual/confirm");
    },
  },
};
</script>
