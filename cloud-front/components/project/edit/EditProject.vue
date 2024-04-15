<template>
  <div>
    <b-card class="edit-info">
      <div class="head-edit form-title text-center">プロジェクト編集</div>
      <div class="edit-info-form">
        <div class="group-btn-1 d-flex flex-wrap justify-content-between">
          <nuxt-link
            v-for="(item, index) in button"
            :key="index"
            :to="`/account/${accountId}/project/${campaignId}/${item.url}`"
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
              >提出</b-button
            >
          </div>
          <div class="item-eyes">
            <nuxt-link
              class="btn btn-secondary"
              :to="`/account/${accountId}/project/${campaignId}/preview`"
            >
              <SvgEyes />
              プレビュー
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
const accountMapper = createNamespacedHelpers("account");

export default {
  inject: ["prefix"],

  components: {
    SvgEyes,
  },

  data() {
    return {
      submission: true,
      button: [
        { id: 1, title: "目標設定", url: "", key: null },
        {
          id: 2,
          title: "概要",
          url: `overview`,
          key: "overview",
        },
        { id: 3, title: "ビジュアル", url: "visual", key: "visual" },
        { id: 4, title: "本文", url: "body", key: "body" },
        { id: 5, title: "リターン", url: "return", key: "return" },
        {
          id: 6,
          title: "本人確認",
          url: "identifications",
          key: "identifications",
        },
      ],
    };
  },

  computed: {
    ...accountMapper.mapState(["account"]),

    path() {
      return this.$route.path;
    },

    campaignId() {
      return this.$route.params.projectId;
    },

    accountId() {
      return this.account.id;
    },

    isIndexPage() {
      if (this.$route.name === "account-id-project-projectId") {
        return true;
      } else return false;
    },
  },
  methods: {
    async submitProject() {
      try {
        await this.postCampaignDetail(this.campaign);
        this.submitted = true;
        this.setLocalCampaign();
      } catch (error) {}
    },
  },
};
</script>
