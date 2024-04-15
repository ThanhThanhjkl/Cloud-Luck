<template>
  <b-card
    class="h-100 p2-top-card"
    :class="{ large }"
    @click="$emit('click')"
    v-if="item"
  >
    <template #header>
      <div class="card-photo">
        <img class="w-100" :src="item.images" />
        <svg-heart :class="item" class="svg-heart"></svg-heart>
      </div>
      <div class="position-relative">
        <b-progress :value="70" :max="100"></b-progress>
        <span class="percent-label"> <span>FUNDED!</span> 20% </span>
      </div>
    </template>

    <b-card-title> {{ item.name }} </b-card-title>

    <b-card-sub-title>
      <b-row class="py-5px">
        <b-col>
          <label class="current-amount">現在の応援金額</label>
          <strong class="price">{{ item.cost | japanMoney }} </strong>
        </b-col>
      </b-row>
      <b-row class="pt-20px">
        <b-col class="card-info">
          <label>
            <svg-clock></svg-clock>
            <span>募集終了まで残り</span>
          </label>
          <strong> {{ item.date }}日 </strong>
          <span class="divider">/</span>
          <label class="supporter">
            <svg-users></svg-users>
            <span>サポーター数</span>
          </label>
          <strong>{{ item.sold }}</strong>
          <b-col class="author d-none d-lg-block">
            <label>
              <svg-user-solid></svg-user-solid>
            </label>
            <span>{{ item.sale_cost }}</span>
          </b-col>
        </b-col>
      </b-row>
      <b-row class="pt-10px d-block d-lg-none">
        <b-col class="author">
          <svg-user-solid></svg-user-solid>
          <span>{{ item.descriptions }}</span>
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

// import moment from "moment";

// import { createNamespacedHelpers } from "vuex";
// const accountMapper = createNamespacedHelpers("account");

export default {
  components: {
    SvgHeart,
    SvgClock,
    SvgUsers,
    SvgUserSolid,
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

  computed: {
    // percent() {
    //   return (
    //     parseInt(this.item.totalAmountOfDonation * 100) /
    //     parseInt(this.item.targetAmount)
    //   ).toFixed(0);
    // },
  },

  methods: {
    // ...accountMapper.mapActions(["getAccountDetail"]),
    // imageSource(id) {
    //   return `${process.env.consumerApiUrl}/file/${id}`;
    // },
    // timeRemaining(date) {
    //   const currentDate = moment(new Date());
    //   const endDate = moment(date);
    //   if (endDate.diff(currentDate, "days") < 0) {
    //     return 0;
    //   } else return endDate.diff(currentDate, "days");
    // },
  },
};
</script>
