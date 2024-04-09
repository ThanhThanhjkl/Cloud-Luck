<template>
  <div class="comment-box">
    <textarea
      v-model="message"
      cols="45"
      rows="8"
      maxlength="65525"
      class="comment-input"
      type="text"
      placeholder="プロジェクトに対する意見や質問を投稿しましょう"
    />
    <div class="btn-comment">
      <button type="button" @click="submitComment">コメントする</button>
    </div>
    <hr class="line" />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("campaign");
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    ...mapActions(["postComment", "getComments"]),
    submitComment() {
      const params = {
        id: this.$route.params.id,
        message: this.message,
      };
      this.postComment(params).then(this.getComments);
    },
  },
};
</script>
