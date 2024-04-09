<template>
  <b-card class="h-100 p2-top-card" :class="{ large }" @click="$emit('click')">
    <template #header>
      <span class="recommend-label" :class="item.type">
        <span>{{ item.label }}</span>
        編集部 おすすめ
      </span>
      <div class="card-photo">
        <img class="w-100" :src="item.img" />
        <svg-heart :class="item.isLiked" class="svg-heart"></svg-heart>
      </div>
      <div v-if="item.percent == 120" class="position-relative">
        <b-progress
          class="funded"
          :value="item.percent"
          :max="max"
          variant="info"
        ></b-progress>
        <span class="percent-label">
          <span>FUNDED!</span>
          {{ item.percent }}%
        </span>
      </div>
      <div v-else class="position-relative">
        <b-progress :value="item.percent" :max="max"></b-progress>
        <span class="percent-label">{{ item.percent }}%</span>
      </div>
    </template>

    <b-card-title> {{ item.title }} </b-card-title>

    <b-card-sub-title>
      <b-row class="py-5px">
        <b-col>
          <label class="current-amount">現在額</label>
          <strong class="price">{{ item.price }}</strong>
        </b-col>
      </b-row>
      <b-row class="pt-20px">
        <b-col class="card-info">
          <label>
            <svg-clock></svg-clock>
            <span v-if="item.id == 1">達成率</span>
          </label>
          <strong>{{ item.timeRemaining }}%</strong>
          <span class="divider">/</span>
          <label class="supporter">
            <svg-users></svg-users>
            <span v-if="item.id == 1">サポーター</span>
          </label>
          <strong>{{ item.supporter }}</strong>
          <b-col v-if="item.id != 1" class="author d-none d-md-block">
            <label>
              <svg-user-solid></svg-user-solid>
            </label>
            <span>{{ item.author }}</span>
          </b-col>
        </b-col>
      </b-row>
      <b-row v-if="item.id == 1" class="pt-10px">
        <b-col class="author">
          <svg-user-solid></svg-user-solid>
          <span>{{ item.author }}</span>
        </b-col>
      </b-row>
      <b-row v-if="item.id != 1" class="pt-10px d-block d-md-none">
        <b-col class="author">
          <svg-user-solid></svg-user-solid>
          <span>{{ item.author }}</span>
        </b-col>
      </b-row>
    </b-card-sub-title>
    <div v-if="item.id == 1" class="box alert-message d-block d-md-none">
      <div class="box-header">VERY編集部コメント</div>
      <div class="box-body">
        <div class="icon">
          <SvgMessage></SvgMessage>
        </div>
        <div class="box-title">
          水を考える時代。欠かせないものですね。応援してください！
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import SvgHeart from "@/components/common/svg/SvgHeart.vue";
import SvgClock from "@/components/common/svg/SvgClock.vue";
import SvgUsers from "@/components/common/svg/SvgUsers.vue";
import SvgUserSolid from "@/components/common/svg/SvgUserSolid.vue";
import SvgMessage from "@/components/common/svg/SvgMessage";
export default {
  components: {
    SvgHeart,
    SvgClock,
    SvgUsers,
    SvgUserSolid,
    SvgMessage,
  },
  props: {
    large: Boolean,
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      max: 100,
    };
  },
};
</script>
