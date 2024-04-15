<template>
  <div class="owner-card owner-card-list">
    <div
      v-for="(item, yellIndex) in campaignYells"
      :key="yellIndex"
      :item="item"
      class="card"
    >
      <div class="card-header">
        <b-avatar>
          <b-img fluid src="@/assets/img/author_avatar.png" />
        </b-avatar>
        <div>
          <div>
            <div class="profile-name">
              <a href="#">{{ item.id }}</a>
            </div>
            <div class="profile-date text-secondary">
              {{ item.createdAt | fullDateTime }}
            </div>
          </div>
          <div class="mt-3">
            {{ item.message }}
          </div>
        </div>
      </div>
    </div>

    <Pagination
      v-if="campaignYells.length > 12"
      :total="total"
      :page="page"
      @change="onPageChange"
    >
    </Pagination>
  </div>
</template>
<script>
import Pagination from "@/components/common/Pagination";

// import { createNamespacedHelpers } from "vuex";
// const { mapState, mapActions } = createNamespacedHelpers("campaign");
export default {
  components: {
    Pagination,
  },

  data() {
    return {
      page: 1,
      total: 40,
      campaignYells: [
        {
          id: "1",
          message: "キャンペションキャンペション",
          summary: "キャンペションキャンペション",
          image: {
            id: "1",
          },
        },
        {
          id: "2",
          message: "キャンペションキャンペション",
          summary: "キャンペションキャンペション",
          image: {
            id: "1",
          },
        },
        {
          id: "3",
          message: "キャンペションキャンペション",
          summary: "キャンペションキャンペション",
          image: {
            id: "1",
          },
        },
      ],
    };
  },

  // computed: {
  //   ...mapState(["campaign", "campaignYells", "page"]),
  // },

  // async mounted() {
  //   await this.getCampaignYell({
  //     id: this.$route.params.id,
  //     page: this.page - 1,
  //   });
  // },

  methods: {
    // ...mapActions(["getCampaignYell"]),

    imageSource(id) {
      return `${process.env.consumerApiUrl}/file/${id}`;
    },

    onPageChange(page) {
      this.page = page;
      this.getCampaignYell({
        id: this.$route.params.id,
        page: this.page - 1,
      });
    },
  },
};
</script>
