<template>
  <div class="list-form">
    <form>
      <div
        v-for="(campaign, index) in campaigns"
        :key="index"
        class="product-list"
      >
        <div class="campaign-content">
          <div class="product-info">
            <div class="product-img">
              <b-img
                v-if="campaign.imageId"
                fluid
                :src="imageSource(campaign.imageId)"
              />
            </div>
            <div class="product-info-right">
              <div class="product-title">{{ campaign.title }}</div>
              <div class="list-btn list-btn-pc">
                <nuxt-link
                  v-if="editable"
                  :to="`/account/${accountId}/project/${campaign.id}/`"
                  class="btn btn-primary campaigns-btn"
                  >編集する</nuxt-link
                >
                <nuxt-link
                  :to="`/account/${accountId}/project/${campaign.id}/preview`"
                  class="btn btn-secondary view-project campaigns-btn"
                  >プロジェクトページを見る</nuxt-link
                >
                <nuxt-link
                  v-if="noteable"
                  :to="`/account/${accountId}/project/${campaign.id}/note`"
                  class="btn btn-secondary view-project campaigns-btn"
                  >活動報告を投稿する
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="list-btn-sp">
            <nuxt-link
              v-if="editable"
              :to="`/account/${accountId}/project/${campaign.id}/`"
              class="btn btn-primary campaigns-btn"
              >編集する</nuxt-link
            >
            <nuxt-link
              :to="`/account/${accountId}/project/${campaign.id}/preview`"
              class="btn btn-secondary view-project campaigns-btn"
              >プロジェクトページを見る</nuxt-link
            >
            <nuxt-link
              v-if="noteable"
              :to="`/account/${accountId}/project/${campaign.id}/note`"
              class="btn btn-secondary view-project campaigns-btn"
              >活動報告を投稿する
            </nuxt-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const accountMapper = createNamespacedHelpers("account");

export default {
  props: {
    campaigns: {
      type: Array,
      default: () => [],
    },
    editable: {
      type: Boolean,
      default: false,
    },
    noteable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...accountMapper.mapState(["account"]),

    accountId() {
      return this.account.id;
    },
  },

  methods: {
    imageSource(id) {
      return `${process.env.businessApiUrl}/file/${id}`;
    },
  },
};
</script>
