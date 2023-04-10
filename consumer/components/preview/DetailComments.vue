<template>
  <div class="comment-card">
    <b-card>
      <div
        v-for="(item, index) in comments"
        :key="index"
        :item="item"
        class="comment-section"
      >
        <b-avatar>
          <b-img fluid src="@/assets/img/author_avatar.png" />
        </b-avatar>
        <div>
          <div class="comment-content">
            {{ item.message }}
          </div>
          <nuxt-link to="#" class="comment-name">{{ item.id }}</nuxt-link>
          <div class="comment-time text-secondary">
            {{ moment(item.createdAt).format("YYYY/MM/DD HH:mm") }}
          </div>
          <!-- <button
            type="button"
            class="mt-3 btn btn-danger"
            @click="deleteComment(item.id)"
          >
            Delete
          </button> -->
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import moment from "moment";
const { mapState, mapActions } = createNamespacedHelpers("campaign");
export default {
  computed: {
    ...mapState(["comments"]),
  },
  async mounted() {
    await this.getComments({ id: this.$route.params.id });
  },
  methods: {
    ...mapActions(["getComments", "deleteComment"]),
    moment,
    performDeleteComment(id) {
      const params = {
        id: this.$route.params.id,
        commentId: id,
      };
      this.deleteComment(params);
    },
  },
};
</script>
