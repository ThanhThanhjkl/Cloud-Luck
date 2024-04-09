<template>
  <EditEstablish v-if="campaign && campaign.id"></EditEstablish>
</template>

<script>
import EditEstablish from "@/components/project/edit/EditEstablish.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("business/campaign");

export default {
  components: {
    EditEstablish,
  },

  computed: {
    ...mapState(["campaign"]),
  },
};
</script>
