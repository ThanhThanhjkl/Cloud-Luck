<template>
  <div v-if="campaign">
    <b-card class="card-infor">
      <b-card-title class="d-block d-md-none">
        {{ campaign.name }}
      </b-card-title>

      <b-row class="price target">
        <b-col>
          <label class="d-block">現在の応援金額</label>
          <strong>{{ 0 | japanMoney }}</strong>
        </b-col>

        <b-col class="d-md-none">
          <label class="d-block">目標金額</label>
          <strong>{{ campaign.target.amount | japanMoney }}</strong>
        </b-col>
      </b-row>

      <b-row class="percent-progress position-relative">
        <b-col>
          <label class="mb-2">達成率</label>
          <div class="position-relative">
            <b-progress value="0" :max="100"></b-progress>
            <span class="progress-percent"> {{ 0 | formatNumber }}% </span>
          </div>
        </b-col>
      </b-row>

      <b-row class="price current">
        <b-col class="d-none d-md-flex align-items-center">
          <label>目標金額</label>
          <strong class="target-amount">
            {{ campaign.target.amount | japanMoney }}
          </strong>
        </b-col>
      </b-row>

      <b-row class="remain">
        <b-col>
          <div class="d-flex align-items-center">
            <SvgClock></SvgClock>
            <label>募集終了まで残り</label>
            <strong class="remain-detail-date">
              {{ campaign.target.endedAt | remainDate }}日
            </strong>
          </div>
          <div class="d-flex d-md-none align-items-center card-info sp mt-2">
            <label class="supporter">
              <svg-users></svg-users>
              <span>サポーター数</span>
            </label>
            <strong class="supporters-sp">0人</strong>
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
            <strong class="supporters">0人</strong>
          </div>
        </b-col>
      </b-row>

      <b-row class="mt-3 mt-md-0">
        <b-col class="author d-flex align-items-center">
          <svg-user-solid></svg-user-solid>
          <span v-if="account">{{ account.name }}</span>
        </b-col>
      </b-row>

      <b-row class="mt-3 d-md-none detail-summary-sp">
        <b-card-text class="col-12 col-lg-8">
          {{ campaign.detail.summary }}
        </b-card-text>
      </b-row>
    </b-card>

    <div class="d-flex flex-column box likes">
      <b-button class="d-none d-md-block btn-favorite" variant="primary" to="/">
        このプロジェクトを応援する
      </b-button>
      <div
        class="icon-favorite d-flex justify-content-center align-items-center"
      >
        <div :class="{ liked: isLiked }" @click="changeLike()">
          <SvgLike class="icon" opacity="0.7"></SvgLike>
        </div>
        <b class="mt-auto mb-auto text-primary">お気に入りに追加</b>
        <div class="badge">
          <span>{{ campaign.favoritesNumber || 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SvgLike from "@/components/common/svg/SvgLike";
import SvgClock from "@/components/common/svg/SvgClock";
import SvgUsers from "@/components/common/svg/SvgUsers";
import SvgUserSolid from "@/components/common/svg/SvgUserSolid";

import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("account");

export default {
  components: {
    SvgClock,
    SvgUsers,
    SvgUserSolid,
    SvgLike,
  },

  props: {
    campaign: {
      type: Object,
      required: false,
      default: () => {},
    },
  },

  data() {
    return {
      isLiked: false,
    };
  },

  computed: {
    ...mapState(["account"]),
  },

  methods: {
    changeLike() {
      this.isLiked = !this.isLiked;
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

::v-deep {
  .card-infor {
    .card-body {
      @include max-width(md) {
        padding-top: 0;
      }
    }
  }
}
</style>
