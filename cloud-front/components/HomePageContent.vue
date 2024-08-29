<template>
  <div class="page-home">
    <section class="section-top">
      <div class="section-banner">
        <div class="banner-header">
          <div class="section-header">
            <img class="w-100" src="@/assets/img/new_banner.png" />
          </div>
          <div class="banner-button">
            <nuxt-link class="btn-banner" :to="`/account/${accountId}/project`">
              Create Projects
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <b-container fluid="xl">
      <section>
        <div class="section-header">
          <h2 class="section-title">LINE UP</h2>
          <h4 class="section-subtitle">Funding lineup</h4>
          <b-form-select
            v-model="sortCampaign"
            :options="options"
            class="sort-campaign d-block mx-auto"
          ></b-form-select>
        </div>
      </section>

      <section class="section-recommend">
        <div v-if="products.length > 0" class="top-list-card">
          <div class="top-1">
            <TopCard
              v-for="(item, index) in products.slice(0, 1)"
              :key="index"
              :item="item"
              large
              @click="$router.push(`/project/${item.id}`)"
            />
          </div>
          <div class="top-5">
            <div v-for="(item, index) in products.slice(1, 5)" :key="index">
              <TopCard
                :item="item"
                @click="$router.push(`/project/${item.id}`)"
              />
            </div>
          </div>
          <div
            v-for="(start, index) in starts"
            :key="index"
            :class="showMore ? `top-5` : `d-none`"
          >
            <div
              v-for="(item, innerIndex) in products.slice(start, start + 4)"
              :key="innerIndex"
            >
              <TopCard
                :item="item"
                @click="$router.push(`/project/${item.id}`)"
              />
            </div>
          </div>
        </div>
      </section>

      <div class="view-all">
        <b-button variant="primary" @click="seeAllProjects"
          >See all projects</b-button
        >
      </div>
    </b-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import TopCard from "@/components/common/TopCard.vue";

const { mapState, mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");
export default {
  components: {
    TopCard,
  },

  data() {
    return {
      options: [{ value: 1, text: "New arrival" }],
      sortCampaign: 1,
      showMore: false,
    };
  },

  computed: {
    ...mapState(["products"]),
    ...authMapper.mapState(["userId"]),

    accountId() {
      return this.userId;
    },

    starts() {
      const starts = [];
      for (let i = 5; i < this.products.length; i += 4) {
        starts.push(i);
      }
      return starts;
    },
  },

  mounted() {
    this.getProducts({ keyword: null });
  },

  methods: {
    ...mapActions(["getProducts"]),
    seeAllProjects() {
      this.showMore = !this.showMore;
    },
  },
};
</script>
<style lang="scss" scoped>
.section-header {
  padding-top: 20px;
}
</style>
