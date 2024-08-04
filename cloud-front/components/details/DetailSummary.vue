<template>
  <div v-if="product">
    <b-card class="card-infor">
      <b-card-title class="d-block d-md-none">
        {{ product.title }}
      </b-card-title>

      <b-row class="price target">
        <b-col>
          <label class="d-block">Current support amount</label>
          <strong class="current-amount amount">{{
            (product.sale_cost || 0) | japanMoney
          }}</strong>
        </b-col>

        <b-col class="d-md-none">
          <label class="d-block">Target amount</label>
          <strong class="target-amount-sp">{{
            (product.cost || 0) | japanMoney
          }}</strong>
        </b-col>
      </b-row>

      <b-row class="percent-progress position-relative">
        <b-col>
          <label class="mb-2">Achievement rate</label>
          <div class="position-relative">
            <b-progress :value="70 || 0" :max="100"> </b-progress>
            <span class="progress-percent"> {{ 70 | formatNumber }}% </span>
          </div>
        </b-col>
      </b-row>

      <b-row class="price current">
        <b-col class="d-none d-md-flex align-items-center">
          <label>Target amount</label>
          <strong class="target-amount">{{
            (product.cost || 0) | japanMoney
          }}</strong>
        </b-col>
      </b-row>

      <b-row class="remain">
        <b-col class="sub-summary mb-0">
          <div class="d-flex align-items-center remain-date">
            <SvgClock></SvgClock>
            <label>Remaining until recruitment ends</label>
            <strong class="remain-detail-date"
              >{{ product.date | remainDate }}日</strong
            >
          </div>
          <div class="d-flex d-md-none align-items-center card-info sp">
            <label class="supporter">
              <svg-users></svg-users>
              <span>Number of supporters</span>
            </label>
            <strong class="supporters-sp"> {{ product.sold }}人 </strong>
          </div>
        </b-col>
      </b-row>

      <b-row class="py-10px d-none d-md-flex">
        <b-col class="card-info">
          <div class="d-flex align-items-center">
            <label class="supporter">
              <svg-users></svg-users>
              <span>Number of supporters</span>
            </label>
            <strong class="supporters"> {{ product.sold }}人 </strong>
          </div>
        </b-col>
      </b-row>

      <b-row v-if="product" class="mt-3 mt-md-0">
        <b-col class="author d-flex align-items-center">
          <svg-user-solid></svg-user-solid>
          <span>
            {{ product.name }}
          </span>
        </b-col>
      </b-row>
    </b-card>

    <b-card-text class="d-block d-lg-none col-12 col-lg-8">
      {{ product.title }}
    </b-card-text>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

import SvgClock from "@/components/common/svg/SvgClock";
import SvgUsers from "@/components/common/svg/SvgUsers";
import SvgUserSolid from "@/components/common/svg/SvgUserSolid";
const { mapState } = createNamespacedHelpers("home");

export default {
  components: {
    SvgClock,
    SvgUsers,
    SvgUserSolid,
  },

  data() {
    return {
      isLiked: false,
      author: "",
    };
  },

  computed: {
    ...mapState(["product"]),

    productId() {
      return this.$route.params.id;
    },
  },

  methods: {},
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
