<template>
  <b-card class="detail-card">
    <b-card-title class="d-block d-md-none">
      フェーズフリーというコンセプトから生まれた本当に使える浄水器「SESERA」
    </b-card-title>
    <b-card-sub-title>
      <b-row>
        <b-col class="target-price">
          <label>目標額</label>
          <strong>¥10,293,000</strong>
        </b-col>
        <b-col class="d-flex flex-column d-md-none">
          <label>目標額</label>
          <strong>¥1,400,000</strong>
        </b-col>
      </b-row>
      <div class="percent-progress">
        <label>目標額</label>
        <b-progress value="70"></b-progress>
      </div>
      <b-row class="d-none d-md-block">
        <b-col>
          <label>目標額</label>
          <strong>¥1,400,000</strong>
        </b-col>
      </b-row>
      <div class="info-more d-none d-md-block">
        <div class="d-flex align-items-center pb-3">
          <SvgClock></SvgClock>
          <label>残時間</label>
          <strong>120日</strong>
        </div>
        <div class="d-flex align-items-center pb-3">
          <SvgUsers></SvgUsers>
          <label>サポーター</label>
          <strong>20,849人</strong>
        </div>
        <div class="author d-flex align-items-center">
          <SvgUserSolid></SvgUserSolid>
          <span>プロジェクト・オーナー名が入ります</span>
        </div>
      </div>
    </b-card-sub-title>
  </b-card>
</template>
<script>
import SvgClock from "@/components/common/svg/SvgClock.vue";
import SvgUsers from "@/components/common/svg/SvgUsers.vue";
import SvgUserSolid from "@/components/common/svg/SvgUserSolid.vue";
export default {
  components: {
    SvgClock,
    SvgUsers,
    SvgUserSolid,
  },
};
</script>
