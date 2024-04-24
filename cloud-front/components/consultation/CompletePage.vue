<template>
  <b-container class="page-consultation" fluid="xl">
    <section>
      <div class="consultation-title">
        <div>プロジェクト掲載・相談フォーム</div>
      </div>
      <div class="complete-content text-center">
        <svg-complete></svg-complete>
        <div class="complete-alert">申請を受け付けました</div>
        <ul>
          <li>
            ●営業日以内に、担当者よりご連絡いたしますので今しばらくお待ちくださいませ。
          </li>
        </ul>
      </div>
    </section>
    <div class="btn-service-name">
      <b-button to="/" type="submit" variant="primary" block
        >CloudFunding トップ</b-button
      >
    </div>
  </b-container>
</template>
<script>
import SvgComplete from "@/components/common/svg/SvgComplete";
export default {
  components: {
    SvgComplete,
  },
};
</script>
<style lang="scss" scoped>
.page-consultation {
  section {
    margin-bottom: 20px;
    .consultation-title {
      font-size: 24px;
      color: $primary;
      font-weight: bold;
      text-align: center;
      @include max-width(md) {
        font-size: 18px;
      }
      .consultation-note {
        font-size: 13px;
        font-weight: bold;
        margin: 40px 0 32px 0;
      }
    }
    .complete-content {
      width: 80%;
      margin: auto;
      padding-top: 40px;
      .complete-alert {
        color: $primary;
        font-size: 16px;
        font-weight: bold;
        padding-top: 14px;
      }
      ul {
        margin: 30px 0;
        padding: 0 15px;
        @include max-width(md) {
          margin-top: 20px;
        }
        li {
          list-style-type: none;
          font-size: 14px;
          @include max-width(md) {
            font-size: 11px;
          }
        }
      }
    }
  }
  .btn-service-name {
    width: 50%;
    margin: auto;
    @include max-width(sm) {
      width: 90%;
    }
    a {
      padding: 15px 0;
    }
  }
}
</style>
