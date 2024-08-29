<template>
  <div class="comment-list">
    <div v-if="comment" class="replier comment-thread">
      <b-img fluid :src="avatar" />
      <div>
        <div class="comment-body">
          {{ comment.contents }}
        </div>
        <div>
          <div class="profile-name">
            <a href="#">{{ name }}</a>
          </div>
          <div class="profile-date text-secondary">
            {{ comment.date | fullDateTime }}
          </div>
        </div>
        <div
          v-if="Number(accountId) === comment.accountId"
          class="btn-comment"
          style="text-align: left"
        >
          <button type="button" @click="deleteComment(comment.id)">
            Delete
          </button>
        </div>
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
