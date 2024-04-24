<template>
  <b-card
    v-if="item"
    class="h-100 p2-top-card"
    :class="{ large }"
    @click="$emit('click')"
  >
    <template #header>
      <div class="card-photo">
        <img class="w-100" :src="images" />
        <svg-heart :class="item" class="svg-heart"></svg-heart>
      </div>
      <div class="position-relative">
        <b-progress :value="salePersent" :max="100"></b-progress>
        <span class="percent-label text-dark">
          <span class="text-dark">SALE!</span> {{ salePersent }}%
        </span>
      </div>
    </template>

    <b-card-title> {{ item.name }} </b-card-title>

    <b-card-sub-title>
      <b-row class="py-5px">
        <b-col class="d-flex justify-content-between">
          <div class="align-items-center d-flex">
            <label class="current-amount">Amount</label>
            <strong class="price">{{ item.sale_cost | japanMoney }} </strong>
          </div>
          <strong style="text-decoration-line: line-through" class="price"
            >{{ item.cost | japanMoney }}
          </strong>
        </b-col>
      </b-row>
      <b-row class="pt-20px">
        <b-col class="card-info">
          <label class="d-flex align-items-center">
            <svg-clock></svg-clock>
            <span>10</span>
          </label>
          <strong class="d-flex align-items-center">{{ item.date }}日 </strong>
          <span class="divider">/</span>
          <label class="supporter">
            <svg-users></svg-users>
            <span>supporters</span>
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
      images: null,
    };
  },

  computed: {
    salePersent() {
      return Math.floor((this.item.sale_cost / this.item.cost) * 100);
    },
  },

  mounted() {
    this.images = this.item.main_image;
  },

  methods: {},
};
</script>
