<template>
  <b-container class="page-detail mb-5 pb-5" fluid="xl">
    <section>
      <div class="box alert-message">
        <div class="box-header">VERY editorial department comment</div>
        <div class="box-body">
          <div class="icon">
            <SvgMessage></SvgMessage>
          </div>
          <div class="box-title">
            {{ account.email }}
          </div>
        </div>
      </div>

      <div class="section-header">
        <h2 class="section-title">USER PROFILE</h2>
        <h4 class="section-subtitle">User profile</h4>
      </div>

      <section>
        <detail-profile-page :account="account"></detail-profile-page>
      </section>
    </section>
  </b-container>
</template>

<script>
import DetailProfilePage from "@/components/profile/DetailProfilePage.vue";
import SvgMessage from "@/components/common/svg/SvgMessage";

export default {
  components: {
    DetailProfilePage,
    SvgMessage,
  },
  props: {
    account: {
      type: Object,
      default: () => {},
    },
  },

  computed: {},
};
</script>
