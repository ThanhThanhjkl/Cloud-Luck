<template>
  <span class="text-muted text-right">
    <b>{{ remainIndicator }}</b>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: [Array, String],
      default: "",
    },
    max: {
      type: [Number, String],
      default: 0,
    },
  },

  computed: {
    remainIndicator() {
      return this.max - (this.value ? this.value.length : 0);
    },
  },
};
</script>
