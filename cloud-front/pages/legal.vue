<template>
  <div class="page-legal container pb-4">
    <b-card class="mt-4 mb-4">
      <h4 class="border-legal text-center font-weight-bold">
        特定商取引法に基づく表記
      </h4>
      <ul class="mt-4">
        <li v-for="(items, index) in legal" :key="index" class="legal">
          <span class="legal-title font-weight-bold">{{ items.title }}</span>
          <p v-html="items.description"></p>
        </li>
      </ul>
    </b-card>
  </div>
</template>

<script>
import legalStatus from "@/helpers/legalStatus";
export default {
  data() {
    return {
      legal: legalStatus,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .description {
    color: $primary-05;
    text-decoration-line: underline;
    cursor: pointer;
  }
}
</style>
