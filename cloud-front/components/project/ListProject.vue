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
              <b-img fluid src="imageSource(campaign.id)" />
            </div>
            <div class="product-info-right">
              <div class="product-title">{{ ádfasdfas }}</div>
              <div class="list-btn list-btn-pc">
                <nuxt-link
                  v-if="editable"
                  :to="`/account/${1}/project/${1}/`"
                  class="btn btn-primary campaigns-btn"
                  >編集する</nuxt-link
                >
                <nuxt-link
                  :to="`/account/${1}/project/${1}/preview`"
                  class="btn btn-secondary view-project campaigns-btn"
                  >プロジェクトページを見る</nuxt-link
                >
                <nuxt-link
                  v-if="noteable"
                  :to="`/account/${1}/project/${1}/note`"
                  class="btn btn-secondary view-project campaigns-btn"
                  >活動報告を投稿する
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="list-btn-sp">
            <nuxt-link
              v-if="editable"
              :to="`/account/${1}/project/${1}/`"
              class="btn btn-primary campaigns-btn"
              >編集する</nuxt-link
            >
            <nuxt-link
              :to="`/account/${1}/project/${1}/preview`"
              class="btn btn-secondary view-project campaigns-btn"
              >プロジェクトページを見る</nuxt-link
            >
            <nuxt-link
              v-if="noteable"
              :to="`/account/${1}/project/${1}/note`"
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
  data() {
    return {
      campaigns: [
        {
          id: 1,
          title:
            "フェーズフリーというコンセプトから生まれた本当に使える浄水器「SESERA」",
          imageId: 1,
        },
        {
          id: 2,
          title:
            "フェーズフリーというコンセプトから生まれた本当に使える浄水器「SESERA」",
          imageId: 2,
        },
      ],
    };
  },

  methods: {
    imageSource(id) {
      return `${process.env.consumerApiUrl}/file/${id}`;
    },
  },
};
</script>
