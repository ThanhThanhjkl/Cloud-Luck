<template>
  <div v-if="type">
    <div class="input-money input-small d-flex">
      <b-input type="text" placeholder="（例）サイズの種類" required></b-input>
    </div>
    <button class="btn-remove-type" @click="$emit('remove')">
      <SvgCloseBlack v-if="index == 1" />
    </button>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: Array,
      default: () => [],
    },
  },
  data() {},
};
</script>
