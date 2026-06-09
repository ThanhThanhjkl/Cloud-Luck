<template>
  <section class="edit-overview-page">
    <div class="head-colapse text-center">Giới thiệu về dự án của bạn</div>
    <b-card>
      <form>
        <b-form-group>
          <FormValidator class="mt-3" label="Tiêu đề" text-required>
            <div class="input-title d-flex">
              <b-form-textarea
                id="textarea-small"
                v-model="title"
                maxlength="40"
                size="lg"
                placeholder="Vui lòng đặt tiêu đề"
              ></b-form-textarea>
              <MaxLengthIndicator
                class="quatily"
                :value="title"
                max="40"
              ></MaxLengthIndicator>
            </div>
            <span class="sub-title"
              >※Tiêu đề sẽ được hiển thị trên trang dự án.</span
            >
          </FormValidator>
        </b-form-group>
        <hr />
        <b-form-group>
          <FormValidator class="mt-3" label="Tên dự án" text-required>
            <div class="input-title d-flex">
              <b-form-textarea
                id="textarea-small"
                v-model="name"
                maxlength="150"
                size="lg"
                placeholder="Vui lòng nhập tên dự án"
                rows="5"
              ></b-form-textarea>
              <MaxLengthIndicator
                class="quatily"
                :value="name"
                max="150"
              ></MaxLengthIndicator>
            </div>
            <span class="sub-title"
              >※Tên dự án sẽ được hiển thị trên trang dự án.</span
            >
          </FormValidator>
        </b-form-group>
        <hr />
      </form>
    </b-card>
    <div class="group-btn">
      <button class="btn-true col-5" @click="onSaveStep">keep</button>
      <button class="btn btn-fall col-5" @click="onPreview">
        <SvgEyes />
        preview
      </button>
    </div>
  </section>
</template>
<script>
import SvgEyes from "@/components/common/svg/SvgEyes.vue";
import FormValidator from "@/components/common/FormValidator.vue";
import MaxLengthIndicator from "@/components/common/MaxLengthIndicator.vue";

import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
const projectMapper = createNamespacedHelpers("home");

export default {
  components: { SvgEyes, FormValidator, MaxLengthIndicator },

  data() {
    return {
      title: "",
      name: "",
      productDraft: "",
    };
  },

  computed: {
    ...mapState(["userId"]),
    ...projectMapper.mapState(["product"]),

    accountId() {
      return this.userId;
    },

    productId() {
      return this.$route.params.projectId;
    },
  },

  mounted() {
    const productUpdate = localStorage.getItem(
      `productUpdate${this.productId}`
    );
    this.productDraft = JSON.parse(productUpdate);
    if (productUpdate && this.productDraft.title) {
      this.title = this.productDraft.title;
    }
    if (productUpdate && this.productDraft.name) {
      this.name = this.productDraft.name;
    } else {
      this.title = this.product.title;
      this.name = this.product.name;
    }
  },

  methods: {
    onSaveStep() {
      const productUpdateAvailable = localStorage.getItem(
        `productUpdate${this.productId}`
      );

      if (productUpdateAvailable) {
        const productUpdate = JSON.parse(productUpdateAvailable);
        productUpdate.name = this.name;
        productUpdate.title = this.title;
        localStorage.setItem(
          `productUpdate${this.productId}`,
          JSON.stringify(productUpdate)
        );
      } else {
        localStorage.setItem(
          `productUpdate${this.productId}`,
          JSON.stringify({
            name: this.name,
            title: this.title,
          })
        );
      }
      this.$router.push("visual");
    },

    onPreview() {
      this.setLocalCampaign(this.campaignMapper);
      this.$router.push(
        `/account/${this.accountId}/project/${this.campaignId}/preview`
      );
    },
  },
};
</script>
