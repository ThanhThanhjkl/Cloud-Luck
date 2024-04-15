<template>
  <div>
    <EditIntuitive v-if="campaign && campaign.id"></EditIntuitive>
  </div>
</template>

<script>
import EditIntuitive from "@/components/project/edit/EditIntuitive.vue";
export default {
  components: {
    EditIntuitive,
  },

  computed: {},
};
</script>
