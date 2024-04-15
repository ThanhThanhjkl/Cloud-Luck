<template>
  <EditEstablish v-if="campaign && campaign.id"></EditEstablish>
</template>

<script>
import EditEstablish from "@/components/project/edit/EditEstablish.vue";
export default {
  components: {
    EditEstablish,
  },

  computed: {},
};
</script>
