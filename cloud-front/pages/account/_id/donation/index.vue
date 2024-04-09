<template>
  <div class="changeinfo detail">
    <AuthRegisterInfo class="mb-4"></AuthRegisterInfo>
    <div class="mx-lg-5">
      <div
        v-if="user"
        id="register-setting-4"
        accordion="register-setting"
        class="purchase_details"
      >
        <b-card>
          <div class="details-title text-center">応援履歴</div>

          <hr />

          <div class="form">
            <DonationCard
              v-for="(item, index) in donations"
              :key="index"
              :donation="item"
              class="product-info item"
            ></DonationCard>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import AuthRegisterInfo from "@/components/auth/AuthRegisterInfo";
import DonationCard from "@/components/donation/DonationCard";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("campaign");
const authMapper = createNamespacedHelpers("auth");

export default {
  components: {
    AuthRegisterInfo,
    DonationCard,
  },

  layout: "auth",

  computed: {
    ...authMapper.mapState(["user"]),
    ...mapState(["donations"]),

    accountId() {
      return this.$route.params.id;
    },
  },

  mounted() {
    this.getDonations();
  },

  methods: {
    ...mapActions(["getDonations"]),

    toDonationDetail(id) {
      this.$router.push(`/account/${this.accountId}/donation/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  @include max-width(md) {
    width: 100%;
  }
}
</style>
