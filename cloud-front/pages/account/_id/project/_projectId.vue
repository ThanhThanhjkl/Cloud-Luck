<template>
  <b-container fluid="xl">
    <EditProject class="mb-4"></EditProject>
    <nuxt-child></nuxt-child>
  </b-container>
</template>
<script>
import EditProject from "@/components/project/edit/EditProject";

export default {
  components: {
    EditProject,
  },
  layout: "default",
};
</script>
