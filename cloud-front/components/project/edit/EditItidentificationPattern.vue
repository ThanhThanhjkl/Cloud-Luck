<template>
  <section class="edit-verification-page">
    <div class="head-colapse text-center">Finally your information</div>
    <PublishItidentification></PublishItidentification>

    <div class="group-btn">
      <b-button
        type="button"
        class="btn-true col-5"
        @click.prevent="submitProject"
      >
        keep
      </b-button>
      <nuxt-link
        class="btn btn-fall col-5"
        :to="`/account/${accountId}/project/${productId}/preview`"
        ><SvgEyes />preview</nuxt-link
      >
    </div>
  </section>
</template>
<script>
import SvgEyes from "@/components/common/svg/SvgEyes.vue";
import PublishItidentification from "@/components/project/edit/PublishItidentification.vue";

import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
const projectMapper = createNamespacedHelpers("home");

export default {
  inject: ["prefix"],

  components: {
    SvgEyes,
    PublishItidentification,
  },

  computed: {
    ...projectMapper.mapState(["product"]),
    ...mapState(["userId"]),
    accountId() {
      return this.userId;
    },
    productId() {
      return this.$route.params.projectId;
    },
  },

  methods: {
    submitProject() {
      this.setLocalCampaign();
    },
  },
};
</script>
