<template>
  <div class="comment-list">
    <div v-if="comment" class="replier comment-thread">
      <b-img fluid :src="avatar" />
      <div>
        <div>
          <div class="profile-name">
            <nuxt-link :to="`profile?id=${comment.accountId}`">{{
              name
            }}</nuxt-link>
            <!-- <a href="#">{{ name }}</a> -->
          </div>
          <div class="profile-date text-secondary">
            {{ comment.date | fullDateTime }}
          </div>
        </div>
        <div class="comment-body mt-2">
          {{ comment.contents }}
        </div>
        <button
          v-if="Number(accountId) === comment.accountId"
          type="button"
          class="btn-delete-comment mt-2"
          @click="deleteComment(comment.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const authMapper = createNamespacedHelpers("auth");
export default {
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
    deleteComment: {
      type: Function,
      default: () => {},
    },
    accountId: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      name: null,
      avatar: null,
    };
  },

  async mounted() {
    const res = await this.getAccount(this.comment.accountId);
    this.name = res.name;
    this.avatar = "data:image/jpeg;base64," + res.avatar;
  },

  methods: {
    ...authMapper.mapActions(["getAccount"]),
  },
};
</script>
<style lang="scss" scoped>
.btn-delete-comment {
  border: medium none currentcolor;
  border: initial;
  background: #466cb0 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  padding: 5px 10px;
  color: white;
}
</style>
