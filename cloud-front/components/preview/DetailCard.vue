<template>
  <b-card class="detail-card">
    <b-card-sub-title>
      <div class="detail-title d-block d-md-none">
        {{ campaign.name }}
      </div>
      <b-row class="price">
        <b-col>
          <label class="d-block mb-2">目標額</label>
          <strong class="current-amount">{{
            campaign.currentAmount | japanMoney
          }}</strong>
        </b-col>
        <b-col lg="12" class="d-none d-md-block py-4">
          <div class="percent-progress position-relative">
            <label class="d-block mb-2">目標額</label>
            <b-progress :value="progressPercent" :max="100"></b-progress>
          </div>
        </b-col>
        <b-col>
          <div class="d-block d-lg-flex align-items-center">
            <label class="d-block mb-2 mb-lg-0">目標額</label>
            <strong class="target-amount">{{
              campaign.targetAmount | japanMoney
            }}</strong>
          </div>
        </b-col>
      </b-row>

      <div class="percent-progress position-relative d-block d-md-none">
        <label class="d-block mb-2">目標額</label>
        <b-progress :value="progressPercent" :max="100"></b-progress>
      </div>

      <div class="d-none d-md-block">
        <div class="d-flex align-items-center pb-3">
          <SvgClock></SvgClock>
          <label>残時間</label>
          <strong>{{ campaign.dueDate | remainDate }}日</strong>
        </div>
        <div class="d-flex align-items-center pb-3">
          <SvgUsers></SvgUsers>
          <label>サポーター</label>
          <strong>{{ campaign.supportedNumber | numberFormat }}人</strong>
        </div>
        <div class="d-none d-md-flex align-items-center small">
          <SvgUserSolid></SvgUserSolid>
          プロジェクト・オーナー名が入ります
        </div>
      </div>

      <b-card-text class="d-block d-md-none">
        {{ campaign.bio }}
      </b-card-text>
    </b-card-sub-title>
  </b-card>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import SvgClock from "../common/svg/SvgClock.vue";
import SvgUsers from "../common/svg/SvgUsers.vue";
import SvgUserSolid from "../common/svg/SvgUserSolid.vue";

const { mapState } = createNamespacedHelpers("campaign");

export default {
  components: {
    SvgClock,
    SvgUsers,
    SvgUserSolid,
  },

  props: {
    large: Boolean,
  },

  computed: {
    ...mapState(["campaign"]),
    progressPercent() {
      if (this.campaign) {
        return (this.campaign.currentAmount / this.campaign.targetAmount) * 100;
      } else {
        return 0;
      }
    },
  },
};
</script>
