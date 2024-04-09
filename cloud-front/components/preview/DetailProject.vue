<template>
  <b-card class="detail-article">
    <template #header>
      <b-card-title>
        {{ campaign.detail.title }}
      </b-card-title>
    </template>
    <b-card-text class="ql-editor" v-html="campaign.body.body"> </b-card-text>
  </b-card>
</template>
<script>
export default {
  props: {
    campaign: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
