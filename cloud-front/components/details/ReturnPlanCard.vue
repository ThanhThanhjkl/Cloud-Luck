<template>
  <b-card class="return-plan-card position-relative">
    <template #header>
      <b-carousel controls>
        <b-carousel-slide>
          <template #img>
            <img class="w-100" :src="images" />
          </template>
        </b-carousel-slide>
      </b-carousel>
    </template>
    <h4>{{ product.title }}</h4>
    <div class="row no-gutters align-items-center">
      <div class="price">
        {{ product.sale_cost | japanMoney }}
      </div>
      <div class="users">Rest: {{ product.sold }} Even people</div>
    </div>

    <div class="px-3 text-center">
      <a class="w-100 btn btn-crimson" @click="choseReturnPlan(returnPlan.id)">
        BUY
      </a>
    </div>

    <div class="card-text">
      {{ product.name }}
    </div>

    <b-card-sub-title class="d-flex align-items-center">
      <div>
        <label>supporter</label>
        <strong>{{ product.sold }}人</strong>
      </div>

      <div>
        <label>Scheduled delivery</label>
        <strong>{{ product.date | japanDate }} </strong>
      </div>
    </b-card-sub-title>
  </b-card>
</template>
<script>
export default {
  props: {
    product: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      returnPlan: null,
      images: "data:image/jpeg;base64," + this.product.images,
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
