<template>
  <div class="mt-2">
    <ConsultationIndividual />
  </div>
</template>

<script>
import ConsultationIndividual from "@/components/consultation/ConsultationIndividual.vue";

export default {
  components: {
    ConsultationIndividual,
  },
  layout: "default",

  mounted() {
    this.getApplication();
  },

  methods: {},
};
</script>
