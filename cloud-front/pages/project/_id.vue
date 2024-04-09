<template>
  <div v-if="buyLayout" class="pt-md-5">
    <nuxt-child></nuxt-child>
  </div>
  <div v-else class="pt-md-5">
    <b-container v-if="campaign && campaign.id" class="page-detail" fluid="xl">
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
              <DetailSummary></DetailSummary>
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
                            :to="`/project/${campaignId}`"
                            role="tab"
                            class="nav-link text-center"
                            :class="{ active: url == 'project-id' }"
                          >
                            <span class="title-main"> ホーム </span>
                          </nuxt-link>
                        </li>
                        <li role="presentation" class="nav-item">
                          <nuxt-link
                            :to="`/project/${campaignId}/note`"
                            class="nav-link"
                            :class="{
                              active:
                                url == 'project-id-note' ||
                                url == 'project-id-note-noteId',
                            }"
                          >
                            <span class="title-tab">活動報告</span>
                            <span class="alert-amount text-center">0</span>
                          </nuxt-link>
                        </li>
                        <li role="presentation" class="nav-item">
                          <nuxt-link
                            :to="`/project/${campaignId}/sponsor`"
                            class="nav-link"
                            :class="{ active: url == 'project-id-sponsor' }"
                          >
                            <span class="title-tab">
                              <span v-html="`応援\nメッセージ`"></span>
                            </span>
                            <span class="alert-amount text-center">0</span>
                          </nuxt-link>
                        </li>
                        <li role="presentation" class="nav-item">
                          <nuxt-link
                            :to="`/project/${campaignId}/comment`"
                            class="nav-link"
                            :class="{ active: url == 'project-id-comment' }"
                          >
                            <span class="title-tab">コメント</span>
                            <span class="alert-amount text-center">0</span>
                          </nuxt-link>
                        </li>
                        <!---->
                      </ul>
                    </div>
                  </div>

                  <nuxt-child></nuxt-child>
                  <DetailProject
                    v-if="url == 'project-id'"
                    :campaign="campaign"
                  ></DetailProject>
                </div>
              </section>
            </div>
          </section>
        </section>

        <section class="right-content">
          <DetailSummary class="d-none d-md-block"></DetailSummary>

          <DetailProjectOwner
            v-if="currentCampaignAccount"
          ></DetailProjectOwner>

          <section class="return-plan">
            <div class="section-header">
              <h2 class="section-title">Return Plan</h2>
              <h4 class="section-subtitle">リターンを選択する</h4>
            </div>
            <div class="d-grid g-16">
              <div v-for="item in campaignReturns" :key="item.id">
                <ReturnPlanCard v-if="item" :plan="item"></ReturnPlanCard>
              </div>
            </div>
          </section>

          <b-card v-if="campaign.target" class="card-notice">
            <span>
              このプロジェクトは、<a class="text-primary">
                {{ campaign.target.method }}
              </a>
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
        <div class="cursor-pointer" @click="changeLike()">
          <SvgHeart
            class="icon"
            opacity="0.7"
            :class="{
              liked: campaignFavorite ? campaignFavorite.isFavorited : false,
            }"
          ></SvgHeart>
        </div>

        <span>{{ campaignFavorite.totalFavoritedNumber }}</span>
        <nuxt-link class="btn btn-primary" :to="`/project/${campaignId}/buy`">
          このプロジェクトを応援する
        </nuxt-link>
      </div>
    </b-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import DetailProject from "@/components/details/DetailProject";
import DetailSummary from "@/components/details/DetailSummary";
import DetailCarousel from "@/components/details/DetailCarousel.vue";
import DetailProjectOwner from "@/components/details/DetailProjectOwner";
import ReturnPlanCard from "@/components/details/ReturnPlanCard.vue";
import SvgMessage from "@/components/common/svg/SvgMessage";
import SvgHeart from "@/components/common/svg/SvgHeart";

const { mapState, mapActions, mapGetters } =
  createNamespacedHelpers("campaign");
const authMapper = createNamespacedHelpers("auth");

export default {
  components: {
    DetailCarousel,
    DetailProjectOwner,
    SvgMessage,
    SvgHeart,
    DetailSummary,
    DetailProject,
    ReturnPlanCard,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState(["campaign", "campaignReturns", "campaignFavorite"]),
    ...mapGetters(["currentCampaignAccount"]),
    ...authMapper.mapState(["user"]),

    url() {
      return this.$route.name;
    },

    campaignId() {
      return this.$route.params.id;
    },

    buyLayout() {
      return (
        this.url === "project-id-buy" ||
        this.url === "project-id-buy-complete" ||
        this.url === "project-id-buy-confirm" ||
        this.url === "project-id-profile"
      );
    },
  },
  async mounted() {
    try {
      const campaignResponse = await this.getCampaignDetail(this.campaignId);
      this.getCampaignReturn(this.campaignId);

      if (campaignResponse.accountId) {
        this.getAccountCampaign(campaignResponse.accountId);
      }

      if (this.user && this.user.id) {
        this.getCampaignFavorite(this.campaignId);
      }
    } catch (error) {}
  },

  beforeDestroy() {
    this.resetCampaignDetail();
  },

  methods: {
    ...mapActions([
      "getCampaignDetail",
      "getCampaignFavorite",
      "postCampaignFavorite",
      "deleteCampaignFavorite",
      "getCampaignReturn",
      "resetCampaignDetail",
      "getAccountCampaign",
    ]),

    async changeLike() {
      if (!this.campaignFavorite.isFavorited) {
        await this.postCampaignFavorite(this.campaignId);
        this.getCampaignFavorite(this.campaignId);
      } else {
        await this.deleteCampaignFavorite(this.campaignId);
        this.getCampaignFavorite(this.campaignId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title-main {
  @include max-width(lg) {
    display: flex;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
  }
}
</style>
