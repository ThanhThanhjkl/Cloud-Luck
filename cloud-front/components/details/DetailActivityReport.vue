<template>
  <div style="background-color: #ffffff">
    <!-- Skeleton loading -->
    <div v-if="loading" class="skeleton-wrapper">
      <SkeletonBox width="150px" height="38px" />
      <div v-for="i in 2" :key="i" class="skeleton-card mt-3">
        <SkeletonBox width="40%" height="20px" />
        <SkeletonBox width="30%" height="14px" class="mt-2" />
        <SkeletonBox width="100%" height="200px" class="mt-3" />
        <SkeletonBox width="100%" height="16px" class="mt-2" />
        <SkeletonBox width="80%" height="16px" class="mt-1" />
      </div>
    </div>

    <!-- Content -->
    <template v-else>
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
        :account-info="accountsMap[rating.accountId]"
      />
    </template>
  </div>
</template>

<script>
import FileUpload from "@/components/common/FileUpload.vue";
import DetailActivityReportDetail from "@/components/details/DetailActivityReportDetail";
import SkeletonBox from "@/components/common/SkeletonBox";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");
export default {
  components: {
    FileUpload,
    DetailActivityReportDetail,
    SkeletonBox,
  },
  data() {
    return {
      ratingContents: "",
      ratingImage: null,
      loading: true,
      accountsMap: {},
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
    this.loading = true;
    await this.getRatingByProductId(this.productId);
    // Fetch tất cả account info cho các rating
    if (this.ratings && this.ratings.length) {
      const results = await Promise.all(
        this.ratings.map((r) => this.getAccount(r.accountId).catch(() => null))
      );
      const map = {};
      this.ratings.forEach((r, i) => {
        if (results[i]) {
          map[r.accountId] = results[i];
        }
      });
      this.accountsMap = map;
    }
    this.loading = false;
  },

  methods: {
    ...mapActions(["createRating", "getRatingByProductId"]),
    ...authMapper.mapActions(["getAccount"]),
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
