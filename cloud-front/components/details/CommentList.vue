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
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
    accountInfo: {
      type: Object,
      default: null,
    },
  },

  computed: {
    name() {
      return this.accountInfo ? this.accountInfo.name : null;
    },
    avatar() {
      return this.accountInfo && this.accountInfo.avatar
        ? "data:image/jpeg;base64," + this.accountInfo.avatar
        : null;
    },
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
