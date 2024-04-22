<template>
  <div>
    <div class="head-edit form-title text-center">Edit project</div>
    <b-card class="edit-info">
      <div class="edit-info-form">
        <div class="group-btn-1 d-flex flex-wrap justify-content-between">
          <nuxt-link
            v-for="(item, index) in button"
            :key="index"
            :to="`/account/${accountId}/project/${productId}/${item.url}`"
            :class="{
              active: item.key ? path.includes(item.key) : isIndexPage,
            }"
            class="item-info"
          >
            {{ item.title }}
          </nuxt-link>
        </div>
        <div class="group-btn-2 d-flex flex-wrap justify-content-center">
          <div class="item-submit mr-2">
            <b-button
              type="button"
              :disabled="!path.includes('identifications') || submitted"
              :class="{
                active: path.includes('identifications') && !submitted,
              }"
              class="btn-submission"
              @click.prevent="submitProject"
              >submission</b-button
            >
          </div>
          <div class="item-eyes">
            <nuxt-link
              class="btn btn-secondary"
              :to="`/account/${accountId}/project/${1}/preview`"
            >
              <SvgEyes />
              preview
            </nuxt-link>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import SvgEyes from "@/components/common/svg/SvgEyes.vue";

import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
const projectMapper = createNamespacedHelpers("home");

export default {
  inject: ["prefix"],

  components: {
    SvgEyes,
  },

  data() {
    return {
      submission: true,
      button: [
        { id: 1, title: "goal setting", url: "", key: null },
        {
          id: 2,
          title: "overview",
          url: `overview`,
          key: "overview",
        },
        { id: 3, title: "visual", url: "visual", key: "visual" },
        { id: 4, title: "body", url: "body", key: "body" },
        { id: 5, title: "return", url: "return", key: "return" },
        {
          id: 6,
          title: "identifications",
          url: "identifications",
          key: "identifications",
        },
      ],
    };
  },

  computed: {
    ...mapState(["userId"]),

    path() {
      return this.$route.path;
    },

    accountId() {
      return this.userId;
    },

    productId() {
      return this.$route.params.projectId;
    },
    isIndexPage() {
      if (this.$route.name === "account-id-project-projectId") {
        return true;
      } else return false;
    },
  },
  methods: {
    ...projectMapper.mapActions(["updateProduct"]),
    async submitProject() {
      const productUpdateAvailable = localStorage.getItem(
        `productUpdate${this.productId}`
      );
      if (productUpdateAvailable) {
        const productUpdate = JSON.parse(productUpdateAvailable);
        const params = {
          id: this.productId,
          name: productUpdate.name,
          descriptions: productUpdate.descriptions,
          date: productUpdate.date,
          cost: productUpdate.cost,
          sale_cost: 100,
          sold: productUpdate.sold,
          images: productUpdate.images,
          title: productUpdate.title,
          account_id: this.accountId,
          main_image: productUpdate.mainImage,
          methods: productUpdate.methods,
          video_url: productUpdate.videoUrl,
        };
        await this.updateProduct(params).then(() => {
          this.$toast.success("updated successfully");
          localStorage.removeItem(`productUpdate${this.productId}`);
          this.$router.push(
            `/account/${this.accountId}/project/${this.productId}`
          );
        });
      }
    },
  },
};
</script>
