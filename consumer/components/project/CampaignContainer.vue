<template>
  <div class="container">
    <div v-if="availableCampaigns.length" class="list-project">
      <b-card v-if="getCampaignsList('draft').length" class="card">
        <div class="form-title text-center">編集中プロジェクト</div>
        <ListProject :campaigns="getCampaignsList('draft')" editable />
      </b-card>

      <b-card v-if="getCampaignsList('rejected').length" class="card">
        <div class="form-title text-center">編集中プロジェクト</div>
        <ListProject :campaigns="getCampaignsList('rejected')" editable />
      </b-card>

      <b-card v-if="getCampaignsList('offline').length" class="card">
        <div class="form-title text-center">掲載前プロジェクト</div>
        <ListProject :campaigns="getCampaignsList('offline')" editable />
      </b-card>

      <b-card v-if="getCampaignsList('updated').length" class="card">
        <div class="form-title text-center">掲載更新前プロジェクト</div>
        <ListProject :campaigns="getCampaignsList('updated')" editable />
      </b-card>

      <b-card v-if="getCampaignsList('update_rejected').length" class="card">
        <div class="form-title text-center">掲載更新前プロジェクト</div>
        <ListProject
          :campaigns="getCampaignsList('update_rejected')"
          editable
        />
      </b-card>

      <b-card v-if="getCampaignsList('published').length" class="card">
        <div class="form-title text-center">掲載中プロジェクト</div>
        <ListProject :campaigns="getCampaignsList('published')" editable />
      </b-card>

      <b-card v-if="getCampaignsList('finished').length" class="card">
        <div class="form-title text-center">終了したプロジェクト</div>
        <ListProject :campaigns="getCampaignsList('finished')" noteable />
      </b-card>
    </div>
    <div v-else>
      <h3 class="mt-2 text-primary text-center">
        まずは
        <nuxt-link to="/consultation" class="text-primary">
          プロジェクト掲載・相談フォーム
        </nuxt-link>
        からご相談ください
      </h3>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import CampaignStatus from "@/helpers/campaignStatus";
import ListProject from "./ListProject.vue";
const { mapState, mapActions } = createNamespacedHelpers("business/campaign");

export default {
  components: {
    ListProject,
  },
  computed: {
    ...mapState(["campaigns"]),

    availableCampaigns() {
      return this.campaigns.filter((item) => {
        return (
          item.status !== CampaignStatus.REVIEWING &&
          item.status !== CampaignStatus.UPDATE_REVIEWING
        );
      });
    },
  },

  mounted() {
    this.getCampaigns();
  },

  methods: {
    ...mapActions(["getCampaigns"]),

    getCampaignsList(type) {
      return this.availableCampaigns.filter((item) => {
        return item.status === type;
      });
    },
  },
};
</script>
