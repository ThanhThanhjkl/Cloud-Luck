<template>
  <b-container class="page-detail mb-5 pb-5" fluid="xl">
    <section>
      <h3 class="text-center mb-5 d-none d-lg-block">
        {{ campaign.detail.summary }}
      </h3>
      <div class="box alert-message">
        <div class="box-header">VERY編集部コメント</div>
        <div class="box-body">
          <div class="icon">
            <SvgMessage></SvgMessage>
          </div>
          <div class="box-title">
            {{ campaign.detail.title }}
          </div>
        </div>
      </div>

      <div class="section-header">
        <h2 class="section-title">USER PROFILE</h2>
        <h4 class="section-subtitle">ユーザープロフィール</h4>
      </div>

      <section>
        <detail-profile-page
          :campaign="campaign"
          :account-id="accountId"
        ></detail-profile-page>
      </section>
    </section>
  </b-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import DetailProfilePage from "@/components/profile/DetailProfilePage.vue";
import SvgMessage from "@/components/common/svg/SvgMessage";

const { mapState } = createNamespacedHelpers("campaign");
export default {
  components: {
    DetailProfilePage,
    SvgMessage,
  },

  computed: {
    ...mapState(["campaign"]),
    accountId() {
      return this.$route.query.id;
    },
  },
};
</script>
