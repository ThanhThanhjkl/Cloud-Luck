<template>
  <div v-if="buyLayout" class="pt-md-5">
    <nuxt-child></nuxt-child>
  </div>
  <div v-else class="pt-md-5">
    <b-container v-if="product && product.id" class="page-detail" fluid="xl">
      <div class="box alert-message">
        <div class="box-header">VERY editorial department comment</div>
        <div class="box-body">
          <div class="icon">
            <SvgMessage></SvgMessage>
          </div>
          <div class="box-title">
            {{ product.name }}
          </div>
        </div>
      </div>

      <div class="page-detail-content">
        <section class="left-content">
          <b-card-title class="d-none mb-3 d-lg-block text-center">
            {{ product.title }}
          </b-card-title>

          <section class="d-grid g-32">
            <DetailCarousel
              :images="product.images"
              :name="product.name"
              :main-image="product.main_image"
            />

            <div class="right-content d-md-none">
              <DetailSummary></DetailSummary>
            </div>

            <div class="right-section">
              <section class="section-tabs">
                <div class="product-body col-12 p-0">
                  <div class="d-none d-lg-block section-header">
                    <h2 class="section-title">PROJECT DETAIL</h2>
                    <h4 class="section-subtitle">Project details</h4>
                  </div>
                  <div class="tabs">
                    <div>
                      <ul role="tablist" class="nav nav-tabs nav-fill">
                        <!---->
                        <li role="presentation" class="nav-item">
                          <nuxt-link
                            :to="`/project/${productId}`"
                            role="tab"
                            class="nav-link text-center"
                            :class="{ active: url == 'project-id' }"
                          >
                            <span class="title-main"> ABOUT </span>
                          </nuxt-link>
                        </li>
                        <li role="presentation" class="nav-item">
                          <nuxt-link
                            :to="`/project/${productId}/rating`"
                            class="nav-link"
                            :class="{
                              active:
                                url == 'project-id-rating' ||
                                url == 'project-id-rating-ratingId',
                            }"
                          >
                            <span class="title-tab">RATING</span>
                            <span class="alert-amount text-center">0</span>
                          </nuxt-link>
                        </li>
                        <li role="presentation" class="nav-item">
                          <nuxt-link
                            :to="`/project/${productId}/recommend`"
                            class="nav-link"
                            :class="{ active: url == 'project-id-recommend' }"
                          >
                            <span class="title-tab"> RECOMMEND </span>
                            <span class="alert-amount text-center">{{
                              suports.length
                            }}</span>
                          </nuxt-link>
                        </li>
                        <li role="presentation" class="nav-item">
                          <nuxt-link
                            :to="`/project/${productId}/comment`"
                            class="nav-link"
                            :class="{ active: url == 'project-id-comment' }"
                          >
                            <span class="title-tab">comment</span>
                            <span class="alert-amount text-center">{{
                              comments.length
                            }}</span>
                          </nuxt-link>
                        </li>
                        <!---->
                      </ul>
                    </div>
                  </div>

                  <nuxt-child></nuxt-child>
                  <DetailProject
                    v-if="url == 'project-id'"
                    :product="product"
                  ></DetailProject>
                </div>
              </section>
            </div>
          </section>
        </section>

        <section class="right-content">
          <DetailSummary class="d-none d-md-block"></DetailSummary>

          <DetailProjectOwner></DetailProjectOwner>

          <section class="return-plan">
            <div class="section-header">
              <h2 class="section-title">Return Plan</h2>
              <h4 class="section-subtitle">Select return</h4>
            </div>
            <div class="d-grid g-16">
              <div>
                <ReturnPlanCard
                  :account-id="accountId"
                  :owner-id="ownerId"
                  :my-returns="myReturns"
                ></ReturnPlanCard>
              </div>
            </div>
          </section>

          <b-card v-if="product.target" class="card-notice">
            <span>
              This project is<a class="text-primary">
                {{ product.target.method }}
              </a>
              です。
            </span>
            <span>
              Regardless of the target amount,
              <a class="text-primary">
                {{ product.date | fullDateTime }}
              </a>
              The amount collected up to this point will be used for funding.
            </span>
          </b-card>
        </section>
      </div>
    </b-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import DetailProject from "@/components/details/DetailProject";
import DetailSummary from "@/components/details/DetailSummary";
import DetailCarousel from "@/components/details/DetailCarousel.vue";
import DetailProjectOwner from "@/components/details/DetailProjectOwner";
import ReturnPlanCard from "@/components/details/ReturnPlanCard.vue";
import SvgMessage from "@/components/common/svg/SvgMessage";

const { mapState, mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");

export default {
  components: {
    DetailCarousel,
    DetailProjectOwner,
    SvgMessage,
    DetailSummary,
    DetailProject,
    ReturnPlanCard,
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState(["product", "myReturns", "suports", "comments"]),
    ...authMapper.mapState(["userId"]),

    url() {
      return this.$route.name;
    },

    accountId() {
      return this.userId;
    },

    ownerId() {
      return this.product.account_id;
    },

    productId() {
      return this.$route.params.id;
    },

    buyLayout() {
      return (
        this.url === "project-id-buy" ||
        this.url === "project-id-buy-complete" ||
        this.url === "project-id-buy-confirm" ||
        this.url === "project-id-profile"
      );
    },
  },
  async mounted() {
    await this.getProductsDetail(this.productId);
    await this.getReturnsByProductId(this.productId);
    await this.getSuportsByProductId(this.productId);
    await this.getCommentsByProductId(this.productId);
  },

  methods: {
    ...mapActions([
      "getProductsDetail",
      "getReturnsByProductId",
      "getSuportsByProductId",
      "getCommentsByProductId",
    ]),
  },
};
</script>

<style lang="scss" scoped>
.title-main {
  @include max-width(lg) {
    display: flex;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
  }
}
</style>
