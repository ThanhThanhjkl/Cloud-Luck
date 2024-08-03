<template>
  <b-container fluid="xl">
    <EditProject class="mb-4"></EditProject>
    <nuxt-child></nuxt-child>
  </b-container>
</template>
<script>
import EditProject from "@/components/project/edit/EditProject";

import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
const projectMapper = createNamespacedHelpers("home");

export default {
  components: {
    EditProject,
  },
  layout: "default",

  provide: {
    prefix: "campaignSubmitRequest",
  },

  computed: {
    ...mapState(["userId"]),
    ...projectMapper.mapState(["product"]),

    showToolbar() {
      if (
        this.$route.fullPath.includes("preview") ||
        this.$route.fullPath.includes("note")
      ) {
        return false;
      } else return true;
    },
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },

  async mounted() {
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    if (!this.userId) {
      this.$router.push("/auth/login");
    }
    if (this.$route.params.projectId !== "add") {
      await this.getProductsDetail(this.$route.params.projectId);
    }
  },

  methods: {
    ...projectMapper.mapActions(["getProductsDetail"]),
    handleBeforeUnload(event) {
      event.preventDefault();
      event.returnValue = "";
    },
  },
};
</script>
