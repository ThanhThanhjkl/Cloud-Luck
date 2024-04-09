<template>
  <div>
    <b-card v-if="campaign" class="detail-article">
      <template #header>
        <b-card-title>
          {{ campaign.detail.title }}
        </b-card-title>
      </template>
      <div class="ql-editor" v-html="campaign.body.body"></div>
    </b-card>
  </div>
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
