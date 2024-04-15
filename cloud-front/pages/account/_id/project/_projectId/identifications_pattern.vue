<template>
  <EditItidentificationPattern v-if="publishable"></EditItidentificationPattern>
</template>

<script>
import EditItidentificationPattern from "@/components/project/edit/EditItidentificationPattern";

export default {
  components: {
    EditItidentificationPattern,
  },

  computed: {
    publishable() {
      const status = ["offline", "updated"];
      return status.includes(this.campaign.status);
    },
  },
};
</script>
