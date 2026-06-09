<template>
  <div>
    <b-card :class="{ 'last-article': index == 2 }" class="detail-article">
      <template #header>
        <b-card-title>
          {{ name || "Người dùng" }}
        </b-card-title>
        <div class="date">{{ rating.date | fullDateTime }}</div>
        <button
          v-if="Number(accountId) === rating.accountId"
          type="button"
          class="btn-delete-rating mt-2"
          @click="deleteComment(rating.id)"
        >
          Delete
        </button>
      </template>

      <figure>
        <b-img fluid :src="rating.image" />
        <figcaption>Hình ảnh minh họa thực tế từ người dùng</figcaption>
      </figure>

      <b-card-text>
        {{ rating.contents }}
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");
export default {
  props: {
    rating: {
      type: Object,
      default: () => {},
    },

    accountId: {
      type: String,
      default: "",
    },

    accountInfo: {
      type: Object,
      default: null,
    },
  },

  computed: {
    ...mapState(["CampaignNote"]),
    name() {
      return this.accountInfo ? this.accountInfo.name : "Người dùng";
    },
    campaignId() {
      return this.$route.params.id;
    },
  },

  methods: {
    ...mapActions(["getRatingByProductId", "deleteRatingById"]),

    deleteComment(id) {
      this.deleteRatingById(id).then(() => {
        this.getRatingByProductId(this.campaignId);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-delete-rating {
  border: medium none currentcolor;
  border: initial;
  background: #d84646 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  padding: 5px 10px;
  color: white;
}
</style>
