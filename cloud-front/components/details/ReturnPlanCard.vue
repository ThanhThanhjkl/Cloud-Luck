<template>
  <div>
    <div v-for="returnPlan in myReturns" :key="returnPlan.id">
      <b-card class="return-plan-card position-relative">
        <template #header>
          <b-carousel controls>
            <b-carousel-slide>
              <template #img>
                <img class="w-100" :src="returnPlan.image" />
              </template>
            </b-carousel-slide>
          </b-carousel>
        </template>
        <h4>{{ returnPlan.title }}</h4>
        <div class="row no-gutters align-items-center">
          <div class="price">
            {{ returnPlan.cost | japanMoney }}
          </div>
        </div>

        <div class="px-3 text-center">
          <a
            class="w-100 btn btn-crimson"
            @click="choseReturnPlan(returnPlan.id)"
          >
            BUY
          </a>
        </div>

        <div class="card-text">
          {{ returnPlan.name }}
        </div>
      </b-card>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("home");
export default {
  props: {
    myReturns: {
      type: Array,
      default: () => [],
    },
    accountId: {
      type: String,
      default: "",
    },
  },

  computed: {
    campaignId() {
      return this.$route.params.id;
    },
  },

  methods: {
    ...mapActions(["createFunded"]),
    choseReturnPlan(id) {
      const params = {
        id: 0,
        account_id: this.accountId,
        return_id: id,
      };
      this.createFunded(params).then(() => {
        this.$router.push({
          path: `/account/${this.accountId}/donation`,
          query: { returnId: id },
        });
      });
    },
  },
};
</script>
