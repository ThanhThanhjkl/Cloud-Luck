<template>
  <div>
    <EditIntuitive v-if="campaign && campaign.id"></EditIntuitive>
  </div>
</template>

<script>
import EditIntuitive from "@/components/project/edit/EditIntuitive.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("business/campaign");
export default {
  components: {
    EditIntuitive,
  },

  computed: {
    ...mapState(["campaign"]),
  },
};
</script>
