<template>
  <div v-if="campaign" class="pt-4 pt-md-5">
    <div class="page-detail">
      <b-card-title class="d-none d-lg-block text-center">
        {{ campaign.detail.title }}
      </b-card-title>

      <div class="box alert-message">
        <div class="box-header">VERY編集部コメント</div>
        <div class="box-body">
          <div class="icon">
            <SvgMessage></SvgMessage>
          </div>
          <div class="box-title">
            {{ campaign.detail.title }}
          </div>
        </div>
      </div>

      <div class="page-detail-content">
        <section class="left-content">
          <b-card-title class="d-none mb-0 d-lg-block text-center">
            {{ campaign.name }}
          </b-card-title>

          <section class="d-grid g-32">
            <DetailCarousel />

            <div class="right-content d-md-none">
              <DetailSummary :campaign="campaign"></DetailSummary>
            </div>

            <div class="right-section">
              <section class="section-tabs">
                <div class="campaign-body col-12 p-0">
                  <div class="d-none d-lg-block section-header">
                    <h2 class="section-title">PROJECT DETAIL</h2>
                    <h4 class="section-subtitle">プロジェクト詳細</h4>
                  </div>
                  <div class="tabs">
                    <div>
                      <ul role="tablist" class="nav nav-tabs nav-fill">
                        <!---->
                        <li role="presentation" class="nav-item">
                          <nuxt-link
                            :to="url"
                            role="tab"
                            class="nav-link active"
                          >
                            <span class="title-main"> ホーム </span>
                          </nuxt-link>
                        </li>
                        <li
                          role="presentation"
                          class="nav-item"
                          :class="{ disabled: !report }"
                          disabled
                        >
                          <a href="#" class="nav-link">
                            <span class="title-tab">活動報告</span>
                            <span class="alert-amount text-center">0</span>
                          </a>
                        </li>
                        <li
                          role="presentation"
                          class="nav-item disabled"
                          disabled
                        >
                          <a href="#" class="nav-link">
                            <span class="title-tab" v-html="`応援\nメッセージ`">
                            </span>
                            <span class="alert-amount text-center">0</span>
                          </a>
                        </li>
                        <li
                          role="presentation"
                          class="nav-item disabled"
                          disabled
                        >
                          <a href="#" class="nav-link">
                            <span class="title-tab">コメント</span>
                            <span class="alert-amount text-center">0</span>
                          </a>
                        </li>
                        <!---->
                      </ul>
                    </div>
                  </div>

                  <DetailProject :campaign="campaign"></DetailProject>
                </div>
              </section>
            </div>
          </section>
        </section>

        <section class="right-content">
          <DetailSummary
            :campaign="campaign"
            class="d-none d-md-block"
          ></DetailSummary>

          <section class="project-owner">
            <div class="section-header">
              <h2 class="section-title">PROJECT OWNER</h2>
              <h4 class="section-subtitle">プロジェクトオーナー</h4>
            </div>
            <DetailProjectOwner
              :account-id="campaign.accountId"
            ></DetailProjectOwner>
          </section>

          <section class="return-plan">
            <div class="section-header">
              <h2 class="section-title">Return Plan</h2>
              <h4 class="section-subtitle">リターンを選択する</h4>
            </div>
            <div class="d-grid g-16">
              <ReturnPlanCard
                v-for="(item, index) in campaign.returns"
                :key="index"
                :item="item"
              ></ReturnPlanCard>
            </div>
          </section>

          <b-card class="card-notice">
            <span>
              このプロジェクトは、<a class="text-primary">{{
                campaign.target.method
              }}</a>
              です。
            </span>
            <span>
              目標金額に関わらず、
              <a class="text-primary">
                {{ campaign.target.endedAt | fullDateTime }}
              </a>
              までに集まった金額がファンディングされます。
            </span>
          </b-card>
        </section>
      </div>

      <div class="d-flex d-lg-none box likes floating">
        <div @click="changeLike()">
          <SvgHeart
            class="icon"
            opacity="0.7"
            :class="{ liked: isLiked }"
          ></SvgHeart>
        </div>

        <span>{{ campaign.favoritesNumber }}</span>
        <b-button variant="primary" to="/project/1/buy">
          このプロジェクトを応援する
        </b-button>
      </div>
      <div class="box-eyes floating">
        <span class="cursor-pointer d-flex align-items-center" @click="goBack">
          <SvgEyeSmall />
          <p>プレビュー終了</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import DetailCarousel from "@/components/preview/DetailCarousel.vue";
import DetailProject from "@/components/preview/DetailProject";
import DetailProjectOwner from "@/components/preview/DetailProjectOwner";
import ReturnPlanCard from "@/components/preview/ReturnPlanCard.vue";
import DetailSummary from "@/components/preview/DetailSummary";
import SvgMessage from "@/components/common/svg/SvgMessage";
import SvgHeart from "@/components/common/svg/SvgHeart";
import SvgEyeSmall from "@/components/common/svg/SvgEyeSmall.vue";
export default {
  components: {
    DetailCarousel,
    DetailProject,
    DetailProjectOwner,
    ReturnPlanCard,
    SvgMessage,
    SvgHeart,
    DetailSummary,
    SvgEyeSmall,
  },
  data() {
    return {
      isLiked: false,
    };
  },
  computed: {
    url() {
      return this.$route.path;
    },
    report() {
      return this.$route.query.report;
    },
  },

  methods: {
    noteUrl() {
      this.$router.push({
        path: "preview/note",
        query: {
          report: this.report,
        },
      });
    },

    goBack() {
      this.$router.go(-1);
    },

    changeLike() {
      this.isLiked = !this.isLiked;
    },
  },
};
</script>
<style lang="scss" scoped>
@include max-width(lg) {
  .page-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
.nav-item {
  &.disabled {
    opacity: 0.5;
    color: #466cb0 !important;

    .nav-link {
      background-color: #cccccc !important;
    }
  }
}

.title-main {
  @include max-width(lg) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @include max-width(sm) {
    margin-top: 10px;
  }
}

@include min-width(md) {
  .page-detail {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
