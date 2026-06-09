<template>
  <div v-if="visible" class="loading" :class="{ hidden }">
    <div class="loading-content">
      <div class="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
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
            }, 400);
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
  background: rgba($color: black, $alpha: 0.15);
  backdrop-filter: blur(2px);
  z-index: 1100;
  transition: opacity 0.4s ease;

  &.hidden {
    opacity: 0;
  }

  .loading-content {
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 16px;
    padding: 28px 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }

  .dots {
    display: flex;
    gap: 8px;

    span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: $primary;
      animation: bounce 1.4s ease-in-out infinite both;

      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 0.16s;
      }
      &:nth-child(3) {
        animation-delay: 0.32s;
      }
    }
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
