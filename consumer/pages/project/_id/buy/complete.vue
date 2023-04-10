<template>
  <PurchaseComplete
    :campaign-return-detail="campaignReturnDetail"
  ></PurchaseComplete>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { scrollToTop } from "@/mixins/scrollToTop";

import PurchaseComplete from "~/components/buy/PurchaseComplete.vue";
const { mapState, mapActions } = createNamespacedHelpers("campaign");
export default {
  components: {
    PurchaseComplete,
  },

  mixins: [scrollToTop],

  computed: {
    ...mapState(["donation", "campaignReturnDetail"]),
  },

  mounted() {
    if (!this.$route.params.donation) {
      this.$router.push("/");
    }
  },

  methods: {
    ...mapActions(["getLocalDonation", "getCampaignReturnDetail"]),
  },
};
</script>
