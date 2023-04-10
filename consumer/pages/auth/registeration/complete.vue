<template>
  <div class="section-complete">
    <h4 class="section-title text-primary mx-auto">登録完了</h4>
    <svg-complete class="mb-1"></svg-complete>

    <div class="section-subtitle">
      <strong class="text-primary">kokode Tukuru に </strong>
      <p class="text-primary">ご登録いただき誠にありがとうございます！</p>
    </div>

    <div class="section-body">
      当サービスへのご参加ありがとうございます。
      引き続きお楽しみいただけますよう、魅力的な商品を生み出せるよう努めて参ります。
    </div>

    <div class="btn-service-name">
      <nuxt-link to="/auth/login" class="btn btn-primary">
        ログイン画面へ
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import SvgComplete from "@/components/common/svg/SvgComplete";

export default {
  layout: "auth",

  components: {
    SvgComplete,
  },
};
</script>
<style lang="scss" scoped>
.section-complete {
  margin-top: 44px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  text-align: center;
  @include max-width(md) {
    margin-top: 50px;
  }
  .section-title {
    margin-bottom: 32px;
    font-size: 24px;
  }
  .section-subtitle {
    margin-bottom: 30px;
  }
  .section-body {
    margin-bottom: 20px;
    font-size: 14px;
  }
  .btn-service-name {
    max-width: 320px;
    text-align: center;
    margin: auto;
    a {
      width: 320px;
    }
  }
}
</style>
