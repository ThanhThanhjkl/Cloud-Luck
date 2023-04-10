<template>
  <div class="mt-2">
    <ConfirmPage />
  </div>
</template>

<script>
import ConfirmPage from "@/components/consultation/ConfirmPage.vue";

export default {
  components: {
    ConfirmPage,
  },
  layout: "default",

  mounted() {
    if (!this.$route.params.type) {
      this.$router.push("/consultation");
    }
  },
};
</script>
