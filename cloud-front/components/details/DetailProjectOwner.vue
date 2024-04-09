<template>
  <section class="project-owner">
    <div class="section-header">
      <h2 class="section-title">PROJECT OWNER</h2>
      <h4 class="section-subtitle">プロジェクトオーナー</h4>
    </div>

    <b-card class="owner-section">
      <template #header>
        <b-avatar class="cursor-pointer" @click="seeProfile">
          <b-img
            v-if="
              currentCampaignAccount.image && currentCampaignAccount.image.id
            "
            class="h-100"
            fluid
            :src="imageSource(currentCampaignAccount.image.id)"
          />
        </b-avatar>

        <div class="profile">
          <div
            class="profile-name cursor-pointer text-break"
            @click="seeProfile"
          >
            {{ currentCampaignAccount.name }}
          </div>
        </div>
      </template>
      <div>
        {{ currentCampaignAccount.bio }}
        <div v-if="currentCampaignAccount.url" class="mt-2">
          URL:
          <a :href="currentCampaignAccount.url"
            >{{ currentCampaignAccount.url }}
          </a>
        </div>
      </div>
    </b-card>
  </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const campaignMapper = createNamespacedHelpers("campaign");

export default {
  data() {
    return {
      showPopUp: false,
    };
  },

  computed: {
    ...campaignMapper.mapGetters(["currentCampaignAccount"]),

    accountId() {
      return this.currentCampaignAccount.id;
    },
  },

  methods: {
    imageSource(id) {
      return `${process.env.consumerApiUrl}/file/${id}`;
    },
    seeProfile() {
      const params = this.$route.params.id;
      this.$router.push({
        path: `/project/${params}/profile`,
        query: { id: this.accountId },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.profile {
  max-width: calc(100% - 56px);
}
</style>
