<template>
  <b-container class="page-consultation" fluid="xl">
    <section>
      <div class="consultation-title">Create Projects</div>
    </section>
    <ConsultationSelect></ConsultationSelect>
  </b-container>
</template>
<script>
import ConsultationSelect from "@/components/consultation/ConsultationSelect";
export default {
  components: {
    ConsultationSelect,
  },
};
</script>
