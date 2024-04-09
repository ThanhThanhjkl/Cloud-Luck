<template>
  <b-card class="h-100 feature-card" :class="{ large }" @click="$emit('click')">
    <template #header>
      <div class="card-photo">
        <img class="w-100" :src="data.img" />
        <svg-heart :class="data.isLiked" class="svg-heart"></svg-heart>
      </div>
      <div v-if="data.percent == 120" class="position-relative">
        <b-progress
          class="funded"
          :value="data.percent"
          :max="max"
          variant="info"
        ></b-progress>
        <span class="percent-label">
          <span>FUNDED!</span>
          {{ data.percent }}%
        </span>
      </div>
      <div v-else class="position-relative">
        <b-progress :value="data.percent" :max="max"></b-progress>
        <span class="percent-label">{{ data.percent }}%</span>
      </div>
    </template>

    <b-card-title>
      {{ data.title }}
    </b-card-title>

    <b-card-sub-title>
      <b-row class="py-5px py-md-10px">
        <b-col>
          <label class="current-amount">現在額</label>
          <strong class="price">{{ data.price }}</strong>
        </b-col>
      </b-row>
      <b-row class="pt-5px">
        <b-col class="card-info">
          <label>
            <svg-clock></svg-clock>
            <span v-if="data.id == 1">達成率</span>
          </label>
          <strong>{{ data.timeRemaining }}%</strong>
          <span class="divider">/</span>
          <label class="supporter">
            <svg-users></svg-users>
            <span v-if="data.id == 1">サポーター</span>
          </label>
          <strong>{{ data.supporter }}</strong>
          <b-col v-if="data.id != 1" class="author d-none d-md-block">
            <label>
              <svg-user-solid></svg-user-solid>
            </label>
            <span>{{ data.author }}</span>
          </b-col>
        </b-col>
      </b-row>
      <b-row v-if="data.id == 1" class="pt-10px">
        <b-col class="author">
          <svg-user-solid></svg-user-solid>
          <span>{{ data.author }}</span>
        </b-col>
      </b-row>
      <b-row v-if="data.id != 1" class="pt-10px d-block d-md-none">
        <b-col class="author">
          <svg-user-solid></svg-user-solid>
          <span>{{ data.author }}</span>
        </b-col>
      </b-row>
    </b-card-sub-title>
  </b-card>
</template>

<script>
import SvgHeart from "@/components/common/svg/SvgHeart.vue";
import SvgClock from "@/components/common/svg/SvgClock.vue";
import SvgUsers from "@/components/common/svg/SvgUsers.vue";
import SvgUserSolid from "@/components/common/svg/SvgUserSolid.vue";
export default {
  components: {
    SvgHeart,
    SvgClock,
    SvgUsers,
    SvgUserSolid,
  },
  props: {
    large: Boolean,
    data: {
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
