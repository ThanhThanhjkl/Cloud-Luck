<template>
  <div class="page-contact container-fluid">
    <b-container fluid="xl">
      <FormContact preview @submit="submit"></FormContact>
    </b-container>
  </div>
</template>

<script>
import legalStatus from "@/helpers/legalStatus";
import FormContact from "@/components/shared/FormContact";
export default {
  components: {
    FormContact,
  },
  data() {
    return {
      legal: legalStatus,
    };
  },

  methods: {
    submit($event) {
      // TODO execute request
      this.$router.push("/contact/complete");
    },
  },
};
</script>
