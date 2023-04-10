<template>
  <b-container class="page-consultation" fluid="xl">
    <section>
      <div class="consultation-title">
        <div>プロジェクト掲載・相談フォーム</div>
        <div class="consultation-note">
          内容をご確認の上、「送信」ボタンを押してください
        </div>
      </div>
      <b-card class="result-consultation">
        <ResultCard></ResultCard>
      </b-card>
    </section>
  </b-container>
</template>
<script>
import ResultCard from "@/components/consultation/ResultCard";
export default {
  components: {
    ResultCard,
  },
};
</script>
<style lang="scss" scoped>
.card {
  .card-body {
    padding: 80px 120px;
    @include max-width(lg) {
      padding: 20px;
    }
  }
}
</style>
