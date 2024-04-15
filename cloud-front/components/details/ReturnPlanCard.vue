<template>
  <b-card class="return-plan-card position-relative">
    <template #header>
      <b-carousel controls>
        <b-carousel-slide>
          <template #img>
            <img class="w-100" src="imageSource(image.id)" />
          </template>
        </b-carousel-slide>
      </b-carousel>
    </template>
    <h4>ádfasdfasd</h4>
    <div class="row no-gutters align-items-center">
      <div class="price">
        {{ 222 }}
      </div>
      <div class="users">残り：{{ 111 }}人まで</div>
    </div>

    <div class="px-3 text-center">
      <a class="w-100 btn btn-crimson" @click="choseReturnPlan(returnPlan.id)">
        このリターンを選択する
      </a>
    </div>

    <div class="card-text">
      {{ 111 }}
    </div>

    <b-card-sub-title class="d-flex align-items-center">
      <div>
        <label>サポーター</label>
        <strong>{{ 0 }}人</strong>
      </div>

      <div>
        <label>お届け予定</label>
        <strong>{{ 2022 | japanDate }} </strong>
      </div>
    </b-card-sub-title>
  </b-card>
</template>
<script>
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

  methods: {
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
