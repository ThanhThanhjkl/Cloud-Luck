<template>
  <div>
    <EditItidentificationPattern
      v-if="publishable"
    ></EditItidentificationPattern>
    <EditVerification
      v-if="campaign && campaign.id && !publishable"
    ></EditVerification>
  </div>
</template>

<script>
import EditVerification from "@/components/project/edit/EditVerification";
import EditItidentificationPattern from "@/components/project/edit/EditItidentificationPattern";

export default {
  components: {
    EditVerification,
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
