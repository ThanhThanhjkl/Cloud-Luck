<template>
  <div v-if="campaign">
    <b-card class="card-infor">
      <b-card-title class="d-block d-md-none">
        {{ campaign.detail.title }}
      </b-card-title>

      <b-row class="price target">
        <b-col>
          <label class="d-block">現在の応援金額</label>
          <strong class="current-amount amount">{{
            (campaign.summary.totalAmountOfDonation || 0) | japanMoney
          }}</strong>
        </b-col>

        <b-col class="d-md-none">
          <label class="d-block">目標金額</label>
          <strong class="target-amount-sp">{{
            (campaign.target.amount || 0) | japanMoney
          }}</strong>
        </b-col>
      </b-row>

      <b-row class="percent-progress position-relative">
        <b-col>
          <label class="mb-2">達成率</label>
          <div class="position-relative">
            <b-progress :value="progressPercent || 0" :max="100"> </b-progress>
            <span class="progress-percent">
              {{ progressPercent | formatNumber }}%
            </span>
          </div>
        </b-col>
      </b-row>

      <b-row class="price current">
        <b-col class="d-none d-md-flex align-items-center">
          <label>目標金額</label>
          <strong class="target-amount">{{
            (campaign.target.amount || 0) | japanMoney
          }}</strong>
        </b-col>
      </b-row>

      <b-row class="remain">
        <b-col class="sub-summary mb-0">
          <div class="d-flex align-items-center remain-date">
            <SvgClock></SvgClock>
            <label>募集終了まで残り</label>
            <strong class="remain-detail-date"
              >{{ campaign.target.endedAt | remainDate }}日</strong
            >
          </div>
          <div class="d-flex d-md-none align-items-center card-info sp">
            <label class="supporter">
              <svg-users></svg-users>
              <span>サポーター数</span>
            </label>
            <strong class="supporters-sp">
              {{ campaign.summary.totalNumberOfDonors }}人
            </strong>
          </div>
        </b-col>
      </b-row>

      <b-row class="py-10px d-none d-md-flex">
        <b-col class="card-info">
          <div class="d-flex align-items-center">
            <label class="supporter">
              <svg-users></svg-users>
              <span>サポーター数</span>
            </label>
            <strong class="supporters">
              {{ campaign.summary.totalNumberOfDonors }}人
            </strong>
          </div>
        </b-col>
      </b-row>

      <b-row v-if="currentCampaignAccount" class="mt-3 mt-md-0">
        <b-col class="author d-flex align-items-center">
          <svg-user-solid></svg-user-solid>
          <span>
            {{ currentCampaignAccount.name }}
          </span>
        </b-col>
      </b-row>
    </b-card>

    <b-card-text class="d-block d-lg-none col-12 col-lg-8">
      {{ campaign.detail.summary }}
    </b-card-text>

    <div class="d-flex flex-column box likes">
      <nuxt-link
        class="d-none d-md-block btn-favorite btn btn-primary"
        variant="primary"
        :to="`/project/${campaignId}/buy/?returnId=${firstReturnId}`"
      >
        このプロジェクトを応援する
      </nuxt-link>
      <div
        class="icon-favorite d-flex justify-content-center align-items-center"
      >
        <div
          :class="{
            liked: campaignFavorite ? campaignFavorite.isFavorited : false,
          }"
          @click="changeLike()"
        >
          <SvgLike class="icon" opacity="0.7"></SvgLike>
        </div>
        <b class="mt-auto mb-auto text-primary">お気に入りに追加</b>
        <div class="badge">
          <span>{{ campaignFavorite.totalFavoritedNumber || 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

import SvgLike from "@/components/common/svg/SvgLike";
import SvgClock from "@/components/common/svg/SvgClock";
import SvgUsers from "@/components/common/svg/SvgUsers";
import SvgUserSolid from "@/components/common/svg/SvgUserSolid";
import { get } from "lodash";
const { mapState, mapActions, mapGetters } =
  createNamespacedHelpers("campaign");

export default {
  components: {
    SvgClock,
    SvgUsers,
    SvgUserSolid,
    SvgLike,
  },

  data() {
    return {
      isLiked: false,
      author: "",
    };
  },

  computed: {
    ...mapState(["campaign", "campaignFavorite"]),
    ...mapGetters(["currentCampaignAccount"]),

    progressPercent() {
      if (this.campaign) {
        return Math.floor(
          (this.campaign.summary.totalAmountOfDonation /
            this.campaign.target.amount) *
            100
        );
      } else {
        return 0;
      }
    },

    campaignId() {
      return this.$route.params.id;
    },

    firstReturnId() {
      if (this.campaign) {
        return get(this.campaign.returns[0], "id", "");
      } else return "";
    },
  },

  methods: {
    ...mapActions([
      "postCampaignFavorite",
      "deleteCampaignFavorite",
      "getCampaignFavorite",
    ]),

    async changeLike() {
      if (!this.campaignFavorite.isFavorited) {
        await this.postCampaignFavorite(this.campaignId);
      } else {
        this.deleteCampaignFavorite(this.campaignId);
      }

      this.getCampaignFavorite(this.campaignId);
    },
  },
};
</script>

<style lang="scss" scoped>
.remain-detail-date,
.supporters {
  font-size: 36px;
  @include max-width(lg) {
    font-size: 20px;
  }
}

.sub-summary {
  display: flex;
  align-items: center;
  @include max-width(sm) {
    display: grid;
  }

  .remain-date {
    position: relative;
    margin-right: 40px;
    &::after {
      content: "/";
      position: absolute;
      top: -1;
      right: -23px;

      @include max-width(sm) {
        display: none;
        content: "";
      }

      @include min-width(md) {
        display: none;
      }
    }
  }
}

.progress {
  margin-bottom: 10px;
  height: 20px;
}
.progress-percent {
  position: absolute;
  top: -2px;
  left: calc(50% - 12px);
  color: #ffffff;
}
</style>
