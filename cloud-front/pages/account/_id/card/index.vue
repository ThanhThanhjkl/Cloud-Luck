<template>
  <div class="changeinfo detail">
    <div class="mx-lg-5">
      <div
        id="register-setting-4"
        accordion="register-setting"
        class="purchase_details"
      >
        <b-card>
          <div class="details-title text-center">Funded List Your Project</div>

          <hr />

          <div class="form">
            <DonationCard
              v-for="item in myFunded"
              :id="item.id"
              :key="item.id"
              :funded="item"
              class="product-info item"
            ></DonationCard>
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import DonationCard from "@/components/donation/DonationCard";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");

export default {
  components: {
    DonationCard,
  },

  layout: "auth",

  computed: {
    ...mapState(["myFunded"]),

    accountId() {
      return this.$route.params.id;
    },
  },

  mounted() {
    this.getFundedByOwnerId(this.accountId);
  },

  methods: {
    ...mapActions(["getFundedByOwnerId"]),
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
