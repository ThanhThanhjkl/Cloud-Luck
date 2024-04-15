<template>
  <b-container fluid="xl">
    <EditProject
      v-if="showToolbar && campaign && campaign.id"
      class="mb-4"
    ></EditProject>
    <nuxt-child v-if="account"></nuxt-child>
  </b-container>
</template>
<script>
import EditProject from "@/components/project/edit/EditProject";

import { createNamespacedHelpers } from "vuex";
const accountMapper = createNamespacedHelpers("account");
const authMapper = createNamespacedHelpers("auth");

export default {
  components: {
    EditProject,
  },
  layout: "default",

  provide: {
    prefix: "campaignSubmitRequest",
  },

  computed: {
    ...authMapper.mapState(["user"]),
    ...accountMapper.mapState(["account"]),

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
    if (!this.account) {
      this.$router.push("/auth/login");
    }
    if (this.user) {
      const campaign = await this.getLocalCampaign(
        this.$route.params.projectId
      );
      if (!campaign) {
        await this.getCampaignDetail(this.$route.params.projectId);
      }
      this.getAccountCards(this.user.id);
    }
  },

  methods: {
    ...accountMapper.mapActions(["getAccountCards"]),

    handleBeforeUnload(event) {
      // Cancel the event
      event.preventDefault();

      // Prompt the user with a confirmation dialog
      event.returnValue = "";
    },
  },
};
</script>
