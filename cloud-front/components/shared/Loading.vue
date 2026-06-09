<template>
  <div v-if="visible" class="loading" :class="{ hidden }">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    visible: false,
    hidden: true,
    requestCount: 0,
    finishTimer: null,
  }),
  methods: {
    start() {
      this.requestCount++;
      if (this.finishTimer) {
        clearTimeout(this.finishTimer);
        this.finishTimer = null;
      }
      this.hidden = false;
      this.visible = true;
    },
    finish() {
      this.requestCount--;
      if (this.requestCount <= 0) {
        this.requestCount = 0;
        this.finishTimer = setTimeout(() => {
          if (this.requestCount === 0) {
            this.hidden = true;
            setTimeout(() => {
              if (this.requestCount === 0) {
                this.visible = false;
              }
            }, 500);
          }
        }, 100);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  @include flex-center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: black, $alpha: 0.1);
  z-index: 1100;
  transition: 1s;

  &.hidden {
    opacity: 0;
  }

  .spinner {
    width: 100px;
    height: 100px;
    border: 15px solid white;
    border-top-color: $primary;
    border-radius: 50%;
    animation: spinner-border 0.75s linear infinite;
  }
}
</style>
