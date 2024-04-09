<template>
  <PurchaseConfirm
    v-if="donation && donation.campaign.id"
    :donation="donation"
    :campaign-return-detail="campaignReturnDetail"
  ></PurchaseConfirm>
</template>
<script>
import { get } from "lodash";
import { createNamespacedHelpers } from "vuex";
import { scrollToTop } from "@/mixins/scrollToTop";

import PurchaseConfirm from "@/components/buy/PurchaseConfirm.vue";
const { mapState, mapActions } = createNamespacedHelpers("campaign");

export default {
  components: {
    PurchaseConfirm,
  },

  mixins: [scrollToTop],

  computed: {
    ...mapState(["donation", "campaignReturnDetail"]),

    returnId() {
      return this.$route.query.returnId;
    },

    projectId() {
      return this.$route.query.id;
    },
  },

  mounted() {
    const campaignId = get(this.donation, "campaign.id");

    if (this.donation && !campaignId) {
      this.$router.push({
        path: `/project/${this.$route.params.id}/buy`,
        query: this.returnId,
      });
    }
  },

  methods: {
    ...mapActions(["getLocalDonation"]),
  },
};
</script>
