<template>
  <div style="background-color: #ffffff">
    <b-button
      v-b-toggle.collapse-1
      class="button-create-rating"
      variant="primary"
      >Create A Rating</b-button
    >
    <b-collapse id="collapse-1" class="mt-2">
      <div class="comment-box">
        <b-textarea
          v-model="ratingContents"
          cols="45"
          rows="8"
          maxlength="65525"
          class="comment-input"
          type="text"
          placeholder="Post your rating and images about the project"
        />
        <div class="btn-comment d-flex justify-content-between">
          <FileUpload
            :image-id="ratingImage"
            @upload="onUploadMainImage"
            @destroy="onDestroyMainImage"
          ></FileUpload>

          <div class="mt-auto mb-auto">
            <button type="button" @click="submitRating">To Rating</button>
            <a class="about-comment-btn text-primary">※ About Rating</a>
          </div>
        </div>
      </div>
    </b-collapse>
    <DetailActivityReportDetail
      v-for="rating in ratings"
      :key="rating.id"
      :rating="rating"
      :account-id="accountId"
    />
  </div>
</template>

<script>
import FileUpload from "@/components/common/FileUpload.vue";
import DetailActivityReportDetail from "@/components/details/DetailActivityReportDetail";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");
export default {
  components: {
    FileUpload,
    DetailActivityReportDetail,
  },
  data() {
    return {
      ratingContents: "",
      ratingImage: null,
    };
  },
  computed: {
    ...mapState(["ratings"]),
    ...authMapper.mapState(["userId"]),
    productId() {
      return this.$route.params.id;
    },

    accountId() {
      return this.userId;
    },
  },

  async mounted() {
    await this.getRatingByProductId(this.productId);
  },

  methods: {
    ...mapActions(["createRating", "getRatingByProductId"]),
    submitRating() {
      const parmas = {
        productId: Number(this.productId),
        accountId: Number(this.accountId),
        contents: this.ratingContents,
        image: this.ratingImage,
      };
      this.createRating(parmas).then(() => {
        this.getRatingByProductId(this.productId);
      });
    },
    onUploadMainImage($event) {
      const ratingImageDefault = $event;
      this.imageToBase64(ratingImageDefault, (base64) => {
        this.ratingImage = base64;
      });
    },

    onDestroyMainImage() {
      this.ratingImage = null;
    },

    // x64 images
    imageToBase64(url, callback) {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    },
  },
};
</script>
<style lang="scss" scoped>
.button-create-rating {
  font-size: 14px;
  padding: 10px 20px;
  margin-top: 20px;
  margin-left: auto;
}
</style>
