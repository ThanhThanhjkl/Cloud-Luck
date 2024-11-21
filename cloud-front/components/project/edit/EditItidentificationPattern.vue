<template>
  <section class="edit-verification-page">
    <div class="head-colapse text-center">Finally your information</div>
    <PublishItidentification></PublishItidentification>
  </section>
</template>
<script>
import PublishItidentification from "@/components/project/edit/PublishItidentification.vue";

import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
const projectMapper = createNamespacedHelpers("home");

export default {
  components: {
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

  methods: {},
};
</script>
