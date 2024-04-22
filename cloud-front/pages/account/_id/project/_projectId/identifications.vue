<template>
  <div>
    <EditItidentificationPattern></EditItidentificationPattern>
  </div>
</template>

<script>
import EditItidentificationPattern from "@/components/project/edit/EditItidentificationPattern";

export default {
  components: {
    EditItidentificationPattern,
  },

  computed: {
    publishable() {
      const status = ["offline", "updated", "update_rejected"];
      if (this.campaign) {
        return status.includes(this.campaign.status);
      } else return false;
    },
  },
};
</script>
