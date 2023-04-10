<template>
  <div class="page-contact container-fluid">
    <b-container fluid="xl">
      <FormContact @confirm="toConfirm"></FormContact>
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
    toConfirm($event) {
      sessionStorage.setItem("contact", JSON.stringify($event));

      this.$router.push({
        name: "contact-confirm",
        params: { contact: $event },
      });
    },
  },
};
</script>
