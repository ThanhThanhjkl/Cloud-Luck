<template>
  <section class="edit-intuitive-page">
    <div class="head-colapse text-center">Set a catchy image</div>
    <b-card>
      <form>
        <b-form-group>
          <FormValidator class="mt-3" label="Main image" text-required>
            <FileUpload
              class="card-upload-big"
              :image-id="mainImage"
              @upload="onUploadMainImage"
              @destroy="onDestroyMainImage"
            ></FileUpload>
            <span class="sub-about"
              >About image files <br />
              ※The recommended size is 1200 pixels wide x 800 pixels tall.<br />
              ※Setting the ratio to 3:2 will display it beautifully.<br />
              ※The only file formats that can be uploaded are PNG/JPG/JPEG/GIF.
            </span>
          </FormValidator>
        </b-form-group>

        <hr />

        <b-form-group>
          <FormValidator class="mt-3" label="sub image" text-required>
            <div class="group-img">
              <FileUpload
                v-for="index in 4"
                :id="index"
                :key="index"
                :image-id="getImageId(index - 1)"
                @destroy="onRemoveSubImageId(index - 1)"
                @upload="onAddSubImageId($event, index - 1)"
              ></FileUpload>
            </div>
            <span class="sub-about"
              >About image files <br />
              ※The recommended size is 1200 pixels wide x 800 pixels tall.<br />
              ※Setting the ratio to 3:2 will display it beautifully.<br />
              ※The only file formats that can be uploaded are PNG/JPG/JPEG/GIF.
            </span>
          </FormValidator>
        </b-form-group>
        <hr />

        <b-form-group>
          <FormValidator class="mt-3" label="movie" text-required>
            <b-textarea
              v-model="videoUrl"
              type="text"
              :placeholder="placeholder"
              rows="2"
              required
            ></b-textarea>
            <span class="sub-about"
              >※A play mark will be displayed on the main image of the project
              page, and clicking on it will start playing the video.<br />
              ※Only YouTube and Vimeo are supported.</span
            >
          </FormValidator>
        </b-form-group>
      </form>
    </b-card>

    <div class="group-btn">
      <button class="btn-true col-5" @click="onSaveStep">keep</button>
      <nuxt-link
        class="btn btn-fall col-5"
        :to="`/account/${accountId}/project/${productId}/preview`"
        ><SvgEyes />
        preview
      </nuxt-link>
    </div>
  </section>
</template>
<script>
import FileUpload from "@/components/common/FileUpload.vue";
import FormValidator from "@/components/common/FormValidator.vue";
import SvgEyes from "@/components/common/svg/SvgEyes.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
const projectMapper = createNamespacedHelpers("home");

export default {
  inject: ["prefix"],

  components: {
    FileUpload,
    SvgEyes,
    FormValidator,
  },
  data() {
    return {
      mainImage: null,
      images: [],
      videoUrl: null,
      placeholder: "https://www.youtube.com/watch?v=XXXXXXXXX or vimeo",
    };
  },

  computed: {
    ...projectMapper.mapState(["product"]),
    ...mapState(["userId"]),
    accountId() {
      return this.userId;
    },
    productId() {
      return this.$route.params.projectId;
    },
  },

  mounted() {
    const productUpdate = localStorage.getItem(
      `productUpdate${this.productId}`
    );
    this.productDraft = JSON.parse(productUpdate);
    if (productUpdate && this.productDraft.mainImage) {
      this.mainImage = this.productDraft.mainImage;
    }
    if (productUpdate && this.productDraft.images) {
      this.images = this.productDraft.images;
    }
    if (productUpdate && this.productDraft.videoUrl) {
      this.videoUrl = this.productDraft.videoUrl;
    } else {
      if (this.product.mainImage) {
        this.mainImage = "data:image/jpeg;base64," + this.product.mainImage;
      } else {
        this.mainImage = null;
      }
      this.images = this.product.images
        ? this.product.images.map((image) => "data:image/jpeg;base64," + image)
        : [];
      this.videoUrl = this.product.videoUrl;
    }
  },

  methods: {
    onRemoveSubImageId(index) {
      this.images[index] = null;
    },

    onAddSubImageId($event, index) {
      this.imageToBase64($event, (base64) => {
        this.images[index] = base64;
      });
    },

    getImageId(index) {
      return this.images[index];
    },
    onUploadMainImage($event) {
      const mainImageDefault = $event;
      this.imageToBase64(mainImageDefault, (base64) => {
        this.mainImage = base64;
      });
    },
    onDestroyMainImage() {
      this.mainImage = null;
    },

    onSaveStep() {
      const productUpdateAvailable = localStorage.getItem(
        `productUpdate${this.productId}`
      );
      const productUpdate = JSON.parse(productUpdateAvailable);
      if (productUpdateAvailable) {
        productUpdate.mainImage = this.mainImage;
        productUpdate.images = this.images;
        productUpdate.videoUrl = this.videoUrl;
        localStorage.setItem(
          `productUpdate${this.productId}`,
          JSON.stringify(productUpdate)
        );
      } else {
        const productUpdate = {
          mainImage: this.mainImage,
          images: this.images,
          videoUrl: this.videoUrl,
        };
        localStorage.setItem(
          `productUpdate${this.productId}`,
          JSON.stringify(productUpdate)
        );
      }
      this.$router.push("body");
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
.main-image {
  position: relative;
  padding-top: 66.5625%;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
.sub-image {
  position: relative;
  padding-top: 26.6666667%;
  > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
