<template>
  <section class="edit-verification-page">
    <div class="head-colapse text-center">最後にあなたの情報を</div>
    <PublishItidentification></PublishItidentification>

    <div class="group-btn">
      <b-button
        type="button"
        class="btn-true col-5"
        :class="{ disabled: readOnly }"
        :disabled="readOnly"
        @click.prevent="submitProject"
      >
        保存
      </b-button>
      <nuxt-link
        class="btn btn-fall col-5"
        :to="`/account/${accountId}/project/${campaignId}/preview`"
        ><SvgEyes />プレビュー</nuxt-link
      >
    </div>
  </section>
</template>
<script>
import SvgEyes from "@/components/common/svg/SvgEyes.vue";
import PublishItidentification from "@/components/project/edit/PublishItidentification.vue";

import _ from "lodash";
import { createNamespacedHelpers } from "vuex";
const accountMapper = createNamespacedHelpers("account");

export default {
  inject: ["prefix"],

  components: {
    SvgEyes,
    PublishItidentification,
  },

  computed: {
    ...accountMapper.mapState(["account"]),

    readOnly() {
      const status = ["reviewing", "update_reviewing", "published", "finished"];
      return status.includes(this.campaignStatus);
    },

    campaignStatus() {
      return _.get(this.campaign, "status");
    },

    accountId() {
      return this.account.id;
    },

    campaignId() {
      return this.$route.params.id;
    },
  },

  methods: {
    submitProject() {
      this.setLocalCampaign();
    },
  },
};
</script>
