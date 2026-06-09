<template>
  <div
    class="skeleton-box"
    :style="{
      width: width,
      height: height,
      borderRadius: rounded ? '50%' : radius,
    }"
  ></div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "16px",
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: String,
      default: "4px",
    },
  },
};
</script>

<style lang="scss" scoped>
.skeleton-box {
  display: inline-block;
  background: linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s infinite;
}

@keyframes skeleton-shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
