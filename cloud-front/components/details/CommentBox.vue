<template>
  <div class="comment-box">
    <b-textarea
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
      <a class="about-comment-btn text-primary">※コメントについて</a>
    </div>

    <div v-if="comments.length" class="comment-list">
      <div class="replier comment-thread">
        <b-img fluid src="@/assets/img/avatar-iframe.png" />
        <div>
          <div class="comment-body">
            太陽光パネルの接続コードに関して質問です。普通、パネル側の接続は二股になっていると思いますが、写真で見るとそう見えません。どうなっていますか？
            できれば画像で見えるといいんですが！
          </div>
          <div>
            <div class="profile-name"><a href="#">abcd1234</a></div>
            <div class="profile-date text-secondary">
              2023-02-22T18:05:17.250Z
            </div>
          </div>
        </div>
      </div>
    </div>

    <Pagination
      v-if="comments.length > 12"
      :total="total"
      :page="page"
      @change="onChange"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/common/Pagination";

export default {
  components: {
    Pagination,
  },

  data() {
    return {
      message: "",
      page: 1,
      total: 40,

      comments: [
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
      ],
    };
  },
  computed: {
    campaignId() {
      return this.$route.params.id;
    },
  },

  methods: {
    async submitComment() {
      if (!this.user) {
        return this.$router.push("/auth/login");
      }

      if (this.message && this.campaignId) {
        const params = {
          id: this.campaignId,
          message: this.message,
        };
        await this.postComment(params);

        this.getComments({ id: this.campaignId });
        this.message = "";
      }
    },

    onChange(page) {
      this.page = page;
      this.getComments({ id: this.campaignId, page: this.page - 1 });
    },
  },
};
</script>
