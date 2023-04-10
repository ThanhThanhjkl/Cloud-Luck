<template>
  <EditItidentificationPattern v-if="publishable"></EditItidentificationPattern>
</template>

<script>
import EditItidentificationPattern from "@/components/project/edit/EditItidentificationPattern";

import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("business/campaign");

export default {
  components: {
    EditItidentificationPattern,
  },

  computed: {
    ...mapState(["campaign"]),

    publishable() {
      const status = ["offline", "updated"];
      return status.includes(this.campaign.status);
    },
  },
};
</script>
