<template>
  <div class="mt-2">
    <ConsultationIndividual />
  </div>
</template>

<script>
import ConsultationIndividual from "@/components/consultation/ConsultationIndividual.vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("business/application");

export default {
  components: {
    ConsultationIndividual,
  },
  layout: "default",

  mounted() {
    this.getApplication();
  },

  methods: {
    ...mapActions(["getApplication"]),
  },
};
</script>
