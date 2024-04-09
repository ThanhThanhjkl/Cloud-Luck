<template>
  <PurchaseReturnPlan
    v-if="campaignReturnDetail"
    :loading="loading"
    :campaign-return-detail="campaignReturnDetail"
  ></PurchaseReturnPlan>
</template>
<script>
import { mapFields } from "vuex-map-fields";
import { scrollToTop } from "@/mixins/scrollToTop";

import PurchaseReturnPlan from "@/components/buy/PurchaseReturnPlan.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("campaign");
export default {
  layout: "default",

  components: {
    PurchaseReturnPlan,
  },

  mixins: [scrollToTop],

  data() {
    return {
      isActive: false,
      loading: true,
    };
  },

  computed: {
    ...mapState(["campaignReturnDetail"]),
    ...mapFields("campaign", {
      donation: "donation",
      selectedOptions: "donation.campaign.return.options",
      selectedReturnId: "donation.campaign.return.id",
    }),
    ...mapFields("global", {
      saveStep: "saveStep",
    }),

    checkCurrentBuy() {
      const storageDonation = JSON.parse(localStorage.getItem("donation"))
        .campaign.donation;

      const currentStorageProject = storageDonation.campaign.return.id;

      const currentProject = this.$route.query.returnId;

      return currentStorageProject === currentProject;
    },

    selectedOptionsValue() {
      return this.selectedOptions;
    },
  },

  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  },

  async mounted() {
    if (!this.checkCurrentBuy) {
      this.resetLocalDonation();
    }

    window.addEventListener("beforeunload", this.handleBeforeUnload);
    try {
      if (this.$route.query.returnId) {
        const params = {
          id: this.$route.params.id,
          returnId: this.$route.query.returnId,
        };

        this.selectedReturnId = this.$route.query.returnId;
        await this.getCampaignReturnDetail(params);

        if (this.campaignReturnDetail.options.length) {
          for (let i = 0; i < this.campaignReturnDetail.options.length; i++) {
            await this.handleSelectFirstOption(i);
          }
        }

        this.loading = false;
      }
    } catch (error) {}
  },

  methods: {
    ...mapActions([
      "getCampaignReturnDetail",
      "getCampaignReturn",
      "resetLocalDonation",
      "setDonationSelectedOptions",
    ]),
    changeSelect() {
      this.isActive = true;
    },
    handleBeforeUnload(event) {
      // Cancel the event
      event.preventDefault();

      this.resetLocalDonation();
    },

    handleSelectFirstOption(index) {
      this.selectedOptionsValue[index] = {
        id: this.campaignReturnDetail.options[index].id,
        item: {
          id: this.campaignReturnDetail.options[index].items[0].id,
        },
      };
      this.setDonationSelectedOptions(this.selectedOptionsValue);
    },
  },

  head() {
    return {
      bodyAttrs: {
        class: "bg_buy",
      },
    };
  },
};
</script>
