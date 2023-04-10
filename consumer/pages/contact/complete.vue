<template>
  <div class="page-contact container-fluid">
    <b-container fluid="xl">
      <ContactComplete></ContactComplete>
    </b-container>
  </div>
</template>

<script>
import ContactComplete from "@/components/shared/ContactComplete";
export default {
  components: {
    ContactComplete,
  },
};
</script>
