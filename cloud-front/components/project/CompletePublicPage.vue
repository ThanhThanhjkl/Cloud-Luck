<template>
  <b-container class="page-consultation" fluid="xl">
    <section>
      <div class="consultation-title">
        <div>プロジェクトが公開されました！</div>
      </div>
      <div class="complete-content text-center">
        <svg-complete></svg-complete>
        <div class="complete-alert">公開した内容を確認しましょう！</div>
      </div>
    </section>
    <div class="row mt-5">
      <nuxt-link
        :to="`/account/${accountId}/project`"
        class="btn btn-primary col-md-5"
        >プロジェクト一覧へ戻る</nuxt-link
      >
      <nuxt-link
        :to="`/account/${accountId}/project/${campaignId}`"
        class="btn btn-primary col-md-5"
        >公開したプロジェクトを見る</nuxt-link
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

  computed: {
    accountId() {
      return this.$route.params.id;
    },
    campaignId() {
      return this.$route.params.campaignId;
    },
  },

  mounted() {
    if (!this.accountId || !this.campaignId) {
      this.$router.push("/");
    }
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
}
</style>
