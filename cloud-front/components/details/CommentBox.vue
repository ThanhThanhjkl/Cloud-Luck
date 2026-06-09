<template>
  <div class="comment-box">
    <!-- Skeleton loading -->
    <div v-if="loading" class="skeleton-wrapper">
      <SkeletonBox width="100%" height="120px" />
      <SkeletonBox width="120px" height="38px" class="mt-3" />
      <div v-for="i in 3" :key="i" class="mt-4">
        <div class="d-flex align-items-center">
          <SkeletonBox width="48px" height="48px" :rounded="true" />
          <div class="ml-3" style="flex: 1">
            <SkeletonBox width="25%" height="16px" />
            <SkeletonBox width="15%" height="12px" class="mt-1" />
          </div>
        </div>
        <SkeletonBox width="100%" height="14px" class="mt-2" />
        <SkeletonBox width="60%" height="14px" class="mt-1" />
      </div>
    </div>

    <!-- Content -->
    <template v-else>
      <b-textarea
        v-model="contents"
        cols="45"
        rows="8"
        maxlength="65525"
        class="comment-input"
        type="text"
        placeholder="Chia sẻ suy nghĩ và bình luận về dự án"
      />
      <div class="btn-comment">
        <button type="button" @click="submitComment">Gửi bình luận</button>
        <a class="about-comment-btn text-primary">※ Về bình luận</a>
      </div>

      <CommentList
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :delete-comment="deleteComment"
        :account-id="accountId"
        :account-info="accountsMap[comment.accountId]"
      ></CommentList>
    </template>
  </div>
</template>

<script>
import CommentList from "@/components/details/CommentList";
import SkeletonBox from "@/components/common/SkeletonBox";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");
export default {
  components: {
    CommentList,
    SkeletonBox,
  },
  data() {
    return {
      contents: "",
      firtsId: null,
      loading: true,
      accountsMap: {},
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
    this.loading = true;
    await this.getCommentsByProductId(this.projectId);
    // Fetch tất cả account info cho các comment
    if (this.comments && this.comments.length) {
      const results = await Promise.all(
        this.comments.map((c) => this.getAccount(c.accountId).catch(() => null))
      );
      const map = {};
      this.comments.forEach((c, i) => {
        if (results[i]) {
          map[c.accountId] = results[i];
        }
      });
      this.accountsMap = map;
    }
    this.loading = false;
  },

  methods: {
    ...mapActions([
      "getCommentsByProductId",
      "createComment",
      "deleteCommentById",
    ]),
    ...authMapper.mapActions(["getAccount"]),
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
      await this.deleteCommentById(id).then((res) => {
        this.getCommentsByProductId(this.projectId);
        this.$toast.success(res);
      });
    },
  },
};
</script>
