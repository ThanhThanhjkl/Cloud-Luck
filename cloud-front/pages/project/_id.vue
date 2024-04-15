<template>
  <div v-if="buyLayout" class="pt-md-5">
    <nuxt-child></nuxt-child>
  </div>
  <div v-else class="pt-md-5">
    <b-container v-if="product && product.id" class="page-detail" fluid="xl">
      <div class="box alert-message">
        <div class="box-header">VERY編集部コメント</div>
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
          <b-card-title class="d-none mb-0 d-lg-block text-center">
            {{ product.name }}
          </b-card-title>

          <section class="d-grid g-32">
            <DetailCarousel />

            <div class="right-content d-md-none">
              <DetailSummary></DetailSummary>
            </div>

            <div class="right-section">
              <section class="section-tabs">
                <div class="product-body col-12 p-0">
                  <div class="d-none d-lg-block section-header">
                    <h2 class="section-title">PROJECT DETAIL</h2>
                    <h4 class="section-subtitle">プロジェクト詳細</h4>
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
                            <span class="title-main"> ホーム </span>
                          </nuxt-link>
                        </li>
                        <li role="presentation" class="nav-item">
                          <nuxt-link
                            :to="`/project/${productId}/note`"
                            class="nav-link"
                            :class="{
                              active:
                                url == 'project-id-note' ||
                                url == 'project-id-note-noteId',
                            }"
                          >
                            <span class="title-tab">活動報告</span>
                            <span class="alert-amount text-center">0</span>
                          </nuxt-link>
                        </li>
                        <li role="presentation" class="nav-item">
                          <nuxt-link
                            :to="`/project/${productId}/sponsor`"
                            class="nav-link"
                            :class="{ active: url == 'project-id-sponsor' }"
                          >
                            <span class="title-tab">
                              <span v-html="`応援\nメッセージ`"></span>
                            </span>
                            <span class="alert-amount text-center">0</span>
                          </nuxt-link>
                        </li>
                        <li role="presentation" class="nav-item">
                          <nuxt-link
                            :to="`/project/${productId}/comment`"
                            class="nav-link"
                            :class="{ active: url == 'project-id-comment' }"
                          >
                            <span class="title-tab">コメント</span>
                            <span class="alert-amount text-center">0</span>
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
              <h4 class="section-subtitle">リターンを選択する</h4>
            </div>
            <div class="d-grid g-16">
              <div>
                <ReturnPlanCard v-if="product" :plan="product"></ReturnPlanCard>
              </div>
            </div>
          </section>

          <b-card v-if="product.target" class="card-notice">
            <span>
              このプロジェクトは、<a class="text-primary">
                {{ product.target.method }}
              </a>
              です。
            </span>
            <span>
              目標金額に関わらず、
              <a class="text-primary">
                {{ product.date | fullDateTime }}
              </a>
              までに集まった金額がファンディングされます。
            </span>
          </b-card>
        </section>
      </div>

      <div class="d-flex d-lg-none box likes floating">
        <div class="cursor-pointer" @click="changeLike()">
          <SvgHeart
            class="icon"
            opacity="0.7"
            :class="{
              liked: false,
            }"
          ></SvgHeart>
        </div>

        <span>{{ 100 }}</span>
        <nuxt-link class="btn btn-primary" :to="`/project/${productId}/buy`">
          このプロジェクトを応援する
        </nuxt-link>
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
import SvgHeart from "@/components/common/svg/SvgHeart";

const { mapState, mapActions } = createNamespacedHelpers("home");

export default {
  components: {
    DetailCarousel,
    DetailProjectOwner,
    SvgMessage,
    SvgHeart,
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
    ...mapState(["product"]),

    url() {
      return this.$route.name;
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
  },

  methods: {
    ...mapActions(["getProductsDetail"]),
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