<template>
  <div class="header-steps">
    <ul class="progressbar">
      <li :class="{ active: step == 'form' }">
        <p>入力</p>
      </li>
      <li :class="{ active: step == 'confirm' }">
        <p>確認</p>
      </li>
      <li :class="{ active: step == 'complete' }">
        <p>完了</p>
      </li>
    </ul>
    <div class="list-step-sp d-md-none">
      <ul class="progressbar-sp">
        <li :class="{ active: step == 'form' }">
          <p>入力</p>
        </li>
        <li :class="{ active: step == 'confirm' }">
          <p>確認</p>
        </li>
        <li :class="{ active: step == 'complete' }">
          <p>完了</p>
        </li>
      </ul>
    </div>
    <p v-if="step === 'form' || step == 'confirm'" class="header-title py-4">
      内容をご確認の上、「完了」ボタンを押してください
    </p>
  </div>
</template>
<script>
export default {
  props: {
    step: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped>
.header-steps {
  margin-top: 30px;
  .header-title {
    text-align: center;
    font: normal normal bold 13px/22px Noto Sans JP;
    letter-spacing: 0px;
    color: $primary;
    opacity: 1;
  }
  .progressbar {
    display: flex;
    justify-content: center;
    gap: 28px;
    counter-reset: step;
    padding: 0;
    margin: 0 auto;
    li {
      display: flex;
      align-items: center;
      color: #466cb0;
      background-color: white;
      list-style: none;
      position: relative;
      text-align: center;
      width: calc(100% / 5);
      padding: 12px;
      justify-content: center;
      p {
        text-align: center;
        font: normal normal bold 16px/22px Open Sans;
        color: #466cb0;
        opacity: 1;
        margin-bottom: 0;
      }
      &:before {
        background: #466cb0;
        border: 2px solid #ffffff;
        border-radius: 50%;
        color: white;
        content: counter(step);
        counter-increment: step;
        display: block;
        font-weight: 700;
        height: 30px;
        line-height: 25px;
        text-align: center;
        width: 30px;
        position: absolute;
        left: 12px;
      }
      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: -22px;
        transform: translate(-50%, -50%);
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
        border-left: 8px solid #466cb0;
      }
      &:last-child {
        &::after {
          content: none;
        }
      }
    }
    .active {
      background-color: $primary;
      p {
        color: white;
      }
      &:before {
        color: $primary;
        background: white;
        border-color: #466cb0;
      }
    }
    .complete {
      &:before {
        background: #466cb0;
        border-color: #466cb0;
        color: #fff;
      }
      &:after {
        background: #466cb0;
      }
    }
  }
  @include max-width(md) {
    margin-top: 0;
  }
}
@include max-width(md) {
  .header-steps {
    .progressbar {
      li {
        width: 30%;
        padding: 8px;
        &:before {
          margin: 0;
        }
        p {
          font-size: 14px;
          padding-left: 10px;
        }
      }
    }
  }
}

.progressbar {
  @include max-width(md) {
    display: none !important;
  }
}

.list-step-sp {
  @include max-width(md) {
    display: block;
    margin-top: 29px;
    .progressbar-sp {
      padding: 0;
      margin: 0 auto;
      list-style-type: none;
      display: flex;
      justify-content: center;
      counter-reset: step;

      li {
        float: left;
        list-style: none;
        position: relative;
        text-align: center;
        width: calc(100% / 5);

        &:first-child {
          &::after {
            content: none;
          }
        }

        &::before {
          background: #fff;
          border: 2px solid #fff;
          border-radius: 50%;
          color: $primary;
          content: counter(step);
          counter-increment: step;
          display: block;
          font-weight: 700;
          height: 30px;
          line-height: 27px;
          margin: 0 auto 10px;
          text-align: center;
          width: 30px;
        }

        &::after {
          background: #fff;
          content: "";
          height: 3px;
          left: -50%;
          position: absolute;
          top: 15px;
          width: 100%;
          z-index: -1;
        }

        &:active {
          color: $primary;
          font-weight: 700;
        }

        p {
          margin-bottom: 0;
          color: $primary;
          font-weight: bold;
        }
      }
    }
  }
}
.progressbar-sp li.active:after,
.progressbar-sp li.complete:after {
  background: $primary;
}
.progressbar-sp li.active:before,
.progressbar-sp li.complete:before {
  background: $primary;
  border-color: $primary;
  color: #fff;
}
</style>
