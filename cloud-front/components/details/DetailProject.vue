<template>
  <div>
    <b-card v-if="product" class="detail-article">
      <template #header>
        <b-card-title>
          {{ product.name }}
        </b-card-title>
      </template>
      <div class="ql-editor" v-html="product.descriptions"></div>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
