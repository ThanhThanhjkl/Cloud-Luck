<template>
  <b-container class="page-consultation" fluid="xl">
    <section>
      <div class="consultation-title">
        <div>退会完了</div>
      </div>
      <div class="complete-content text-center">
        <svg-complete></svg-complete>
        <div class="complete-alert">
          CloudFunding の<br />ご利用ありがとうございました！
        </div>
        <ul>
          <li>
            当サービスへのご参加ありがとうございました！<br />
            魅力的な商品を生み出せるようこれからも努めて参ります。<br />
            もし思い出していただけることがあれば <br />
            いつでも覗いてみてくださいね！
          </li>
        </ul>
      </div>
    </section>
    <div class="btn-service-name">
      <nuxt-link to="/auth/login">CloudFunding トップ</nuxt-link>
    </div>
  </b-container>
</template>

<script>
import SvgComplete from "@/components/common/svg/SvgComplete";
export default {
  components: {
    SvgComplete,
  },
  layout: "auth",
};
</script>

<style lang="scss" scoped>
.page-consultation {
  section {
    margin-bottom: 20px;
    .consultation-title {
      margin-top: 0;
      font-size: 24px;
      color: $primary;
      font-weight: 500;
      text-align: center;
      @include max-width(sm) {
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
      padding-top: 50px;
      .complete-alert {
        margin-bottom: 20px;
        color: $primary;
        font-size: 16px;
        font-weight: bold;
        padding-top: 14px;
      }
      ul {
        padding: 0 15px;
        margin-bottom: 30px;
        li {
          list-style-type: none;
          font-size: 11px;
          padding-top: 10px;
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
      display: block;
      text-align: center;
      color: white;
      width: 70%;
      border-radius: 4px;
      margin-left: auto;
      margin-right: auto;
      background-color: $primary;
      @include max-width(md) {
        width: 100%;
      }
    }
  }
}
</style>
