<template>
  <div v-if="buyLayout" class="pt-md-5">
    <nuxt-child></nuxt-child>
  </div>
  <div v-else class="pt-md-5">
    <DetailSkeleton v-if="loading" />
    <b-container
      v-else-if="product && product.id"
      class="page-detail"
      fluid="xl"
    >
      <div class="box alert-message">
        <div class="box-header">Nhận xét từ ban biên tập</div>
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
                    <h2 class="section-title">CHI TIẾT DỰ ÁN</h2>
                    <h4 class="section-subtitle">Thông tin chi tiết dự án</h4>
                  </div>
                  <div class="tabs">
                    <div>
                      <ul role="tablist" class="nav nav-tabs nav-fill">
                        <!---->
                        <li role="presentation" class="nav-item">
                          <a
                            role="tab"
                            class="nav-link text-center"
                            :class="{ active: url == 'project-id' }"
                            href="#"
                            @click.prevent="switchTab(`/project/${productId}`)"
                          >
                            <span class="title-tab"> GIỚI THIỆU </span>
                          </a>
                        </li>
                        <li role="presentation" class="nav-item">
                          <a
                            role="tab"
                            class="nav-link"
                            :class="{
                              active:
                                url == 'project-id-rating' ||
                                url == 'project-id-rating-ratingId',
                            }"
                            href="#"
                            @click.prevent="
                              switchTab(`/project/${productId}/rating`)
                            "
                          >
                            <span class="title-tab">ĐÁNH GIÁ</span>
                            <span class="alert-amount text-center">0</span>
                          </a>
                        </li>
                        <li role="presentation" class="nav-item">
                          <a
                            role="tab"
                            class="nav-link"
                            :class="{ active: url == 'project-id-recommend' }"
                            href="#"
                            @click.prevent="
                              switchTab(`/project/${productId}/recommend`)
                            "
                          >
                            <span class="title-tab"> GỢI Ý </span>
                            <span class="alert-amount text-center">{{
                              suports.length
                            }}</span>
                          </a>
                        </li>
                        <li role="presentation" class="nav-item">
                          <a
                            role="tab"
                            class="nav-link"
                            :class="{ active: url == 'project-id-comment' }"
                            href="#"
                            @click.prevent="
                              switchTab(`/project/${productId}/comment`)
                            "
                          >
                            <span class="title-tab">Bình luận</span>
                            <span class="alert-amount text-center">{{
                              comments.length
                            }}</span>
                          </a>
                        </li>
                        <!---->
                      </ul>
                    </div>
                  </div>

                  <keep-alive>
                    <nuxt-child></nuxt-child>
                  </keep-alive>
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
              <h2 class="section-title">Gói Hỗ Trợ</h2>
              <h4 class="section-subtitle">Chọn gói hỗ trợ</h4>
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
              Dự án này thuộc loại<a class="text-primary">
                {{ product.target.method }}
              </a>
            </span>
            <span>
              Bất kể số tiền mục tiêu,
              <a class="text-primary">
                {{ product.date | fullDateTime }}
              </a>
              số tiền đã quyên góp được sẽ được sử dụng để tài trợ.
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
import DetailSkeleton from "@/components/details/DetailSkeleton.vue";

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
    DetailSkeleton,
  },

  data() {
    return {
      loading: true,
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

  watch: {
    "$route.params.id": {
      handler() {
        this.fetchData();
      },
    },
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    ...mapActions([
      "getProductsDetail",
      "getReturnsByProductId",
      "getSuportsByProductId",
      "getCommentsByProductId",
      "setProductToCreate",
    ]),

    switchTab(path) {
      if (this.$route.path !== path) {
        this.$router.replace(path);
      }
    },

    async fetchData() {
      this.loading = true;
      this.setProductToCreate();
      await Promise.all([
        this.getProductsDetail(this.productId),
        this.getReturnsByProductId(this.productId),
        this.getSuportsByProductId(this.productId),
        this.getCommentsByProductId(this.productId),
      ]);
      this.loading = false;
    },
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
