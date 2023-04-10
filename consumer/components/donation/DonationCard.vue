<template>
  <div v-if="donation">
    <div
      class="d-flex col-12 col-md-5 p-0 cursor-pointer"
      @click="toCampaign(donation.campaign.id)"
    >
      <div class="product-img">
        <b-img fluid :src="imageSource" />
      </div>
      <div class="product-title">
        {{ title }}
      </div>
    </div>
    <div class="product-item">
      <div>
        応援ID：<span>{{ donation.id }}</span>
      </div>
      <div>
        注文日：<span>{{ donation.createdAt | japanDate }}</span>
      </div>
      <div>
        金額：<span>{{ donation.amount | japanMoney }}</span>
      </div>
      <nuxt-link :to="`/account/${accountId}/donation/${donation.id}`">
        応援詳細を確認する
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("campaign");

export default {
  props: {
    donation: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      title: "",
      imageSource: "",
    };
  },

  computed: {
    accountId() {
      return this.$route.params.id;
    },
  },

  async mounted() {
    try {
      if (this.donation && this.donation.id) {
        const res = await this.getCampaignDetail(this.donation.campaign.id);
        this.title = res.detail.title;
        this.imageSource = `${process.env.consumerApiUrl}/file/${res.visual?.mainImage?.id}`;
      }
    } catch (error) {}
  },

  methods: {
    ...mapActions(["getCampaignDetail"]),

    toCampaign(id) {
      this.$router.push(`/project/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.product-img {
  width: 100% !important;
  min-height: 100px;
}
</style>
