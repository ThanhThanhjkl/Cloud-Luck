<template>
  <div class="owner-card">
    <b-card v-for="(item, index) in campaignYells" :key="index" :item="item">
      <template #header>
        <b-avatar>
          <b-img fluid src="@/assets/img/author_avatar.png" />
        </b-avatar>
        <div>
          <div>
            <div class="profile-name">
              <a href="#">{{ item.id }}</a>
            </div>
            <div class="profile-date text-secondary">
              {{ item.createdAt }}
            </div>
          </div>
          <div class="mt-3">
            {{ item.message }}
          </div>
        </div>
      </template>
    </b-card>
    <nav class="paginations">
      <ul class="pagination">
        <div>
          <li class="page-item btn-prev"></li>
          <div class="arrowLine"><a href="">前</a></div>
        </div>
        <li v-for="count in page" :key="count" class="page-item active">
          <span class="page-link">
            {{ count }}
          </span>
        </li>
        <li class="page-item disable">
          <span class="page-link"> 2 </span>
        </li>
        <li class="page-item disable">
          <span class="page-link"> 3 </span>
        </li>
        <div>
          <div class="arrowLine"><a href="">次</a></div>
          <li class="page-item btn-next"></li>
        </div>
      </ul>
    </nav>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("campaign");
export default {
  computed: {
    ...mapState(["campaign", "campaignYells", "page"]),
  },

  async mounted() {
    await this.getCampaignYell(this.$route.params.id);
  },

  methods: {
    ...mapActions(["getCampaignYell"]),
  },
};
</script>
