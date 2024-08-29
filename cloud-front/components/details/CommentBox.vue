<template>
  <div class="comment-box">
    <b-textarea
      v-model="contents"
      cols="45"
      rows="8"
      maxlength="65525"
      class="comment-input"
      type="text"
      placeholder="Post your thoughts and comment about the project"
    />
    <div class="btn-comment">
      <button type="button" @click="submitComment">To comment</button>
      <a class="about-comment-btn text-primary">※ About comments</a>
    </div>

    <CommentList
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
      :delete-comment="deleteComment"
      :account-id="accountId"
    ></CommentList>
  </div>
</template>

<script>
import CommentList from "@/components/details/CommentList";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");
export default {
  components: {
    CommentList,
  },
  data() {
    return {
      contents: "",
      firtsId: null,
    };
  },
  computed: {
    ...mapState(["comments"]),
    ...authMapper.mapState(["userId"]),
    projectId() {
      return this.$route.params.id;
    },
    accountId() {
      return this.userId;
    },
  },

  async mounted() {
    await this.getCommentsByProductId(this.projectId);
  },

  methods: {
    ...mapActions([
      "getCommentsByProductId",
      "createComment",
      "deleteCommentById",
    ]),
    async submitComment() {
      if (!this.accountId) {
        return this.$router.push("/auth/login");
      }
      if (this.contents && this.projectId) {
        const params = {
          contents: this.contents,
          productId: Number(this.projectId),
          accountId: Number(this.accountId),
        };
        await this.createComment(params);
        this.getCommentsByProductId(this.projectId);
        this.contents = "";
      }
    },

    async deleteComment(id) {
      await this.deleteCommentById(id);
      this.getCommentsByProductId(this.projectId);
    },
  },
};
</script>
