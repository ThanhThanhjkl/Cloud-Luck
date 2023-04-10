<template>
  <b-card v-if="returnPlan" class="return-plan-card position-relative">
    <div v-if="!buyAble" class="card-disabled"></div>
    <template #header>
      <b-carousel v-if="returnPlan.images" controls>
        <b-carousel-slide
          v-for="image in returnPlan.images"
          :key="image.id"
          class=""
        >
          <template #img>
            <img class="w-100" :src="imageSource(image.id)" />
          </template>
        </b-carousel-slide>
      </b-carousel>
    </template>
    <h4 v-if="returnPlan.title">{{ returnPlan.title }}</h4>
    <div class="row no-gutters align-items-center">
      <div class="price">
        {{ returnPlan.amount | japanMoney }}
      </div>
      <div class="users">残り：{{ returnPlan.stockQuantity }}人まで</div>
    </div>

    <div class="px-3 text-center">
      <a class="w-100 btn btn-crimson" @click="choseReturnPlan(returnPlan.id)">
        このリターンを選択する
      </a>
    </div>

    <div v-if="returnPlan.bio" class="card-text">
      {{ returnPlan.bio }}
    </div>

    <b-card-sub-title class="d-flex align-items-center">
      <div>
        <label>サポーター</label>
        <strong>{{ returnPlan.sponsorCount || 0 }}人</strong>
      </div>

      <div v-if="returnPlan.scheduledDeliveryDate">
        <label>お届け予定</label>
        <strong>{{ returnPlan.scheduledDeliveryDate | japanDate }} </strong>
      </div>
    </b-card-sub-title>
  </b-card>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("campaign");

export default {
  props: {
    plan: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      returnPlan: null,
    };
  },

  computed: {
    campaignId() {
      return this.$route.params.id;
    },

    buyAble() {
      if (!this.returnPlan) return false;
      return this.returnPlan.stockQuantity > 0;
    },
  },

  async mounted() {
    const params = {
      id: this.$route.params.id,
      returnId: this.plan.id,
    };

    const res = await this.getCampaignReturnDetail(params);
    this.returnPlan = res;
  },

  methods: {
    ...mapActions(["getCampaignReturnDetail"]),

    choseReturnPlan(id) {
      if (!this.buyAble) {
        return false;
      }

      this.$router.push({
        path: `/project/${this.campaignId}/buy`,
        query: { returnId: id },
      });
    },

    imageSource(id) {
      return `${process.env.consumerApiUrl}/file/${id}`;
    },
  },
};
</script>
