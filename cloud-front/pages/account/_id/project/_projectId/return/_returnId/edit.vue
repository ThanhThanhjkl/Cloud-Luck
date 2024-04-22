<template>
  <section class="edit-back-page">
    <div class="head-colapse text-center">
      Give back to your supporters in an attractive way
    </div>
    <div>
      <b-card>
        <form>
          <FormValidator class="mt-3" label="return name" text-required>
            <b-form-textarea
              id="textarea-small"
              v-model="name"
              size="md"
              placeholder="Please set a name"
              rows="3"
            ></b-form-textarea>
          </FormValidator>
          <FormValidator class="mt-3" label="return title" text-required>
            <b-form-textarea
              id="textarea-small"
              v-model="title"
              size="md"
              placeholder="Please set a title"
              rows="3"
            ></b-form-textarea>
          </FormValidator>
          <hr />
          <FormValidator class="mt-3" label="Amount of money" text-required>
            <div class="input-money d-flex">
              <b-input
                v-model="cost"
                type="number"
                placeholder="（例）3,000"
                required
              ></b-input>
              <span>円</span>
            </div>
            <span
              >※Please enter between 500 yen and 2,900,000 yen. ※The price must
              include shipping and consumption tax.</span
            >
          </FormValidator>
          <hr />
          <FormValidator class="mt-3" label="Content" text-required>
            <b-form-textarea
              id="textarea-small"
              v-model="descriptions"
              size="md"
              placeholder="(Example) T-shirts, smartphone cases, thank you messages, etc. Please enter the details of the return to be fulfilled."
              rows="7"
            ></b-form-textarea>
          </FormValidator>
          <hr />

          <hr />
          <b-form-group>
            <FormValidator class="mt-3" label="image" text-required>
              <FileUpload
                class="card-upload-big"
                :image-id="image"
                accept-file="image/png, image/jpeg, image/gif, image/jpg"
                @upload="uploadImage"
                @destroy="RemoveImage"
              ></FileUpload>
              <span>{{ imageTitle }}</span>
            </FormValidator>
          </b-form-group>
          <hr />
        </form>
      </b-card>
      <b-button
        type="button"
        variant="primary"
        block
        class="btn-update"
        @click="update"
        >Update</b-button
      >
    </div>
  </section>
</template>
<script>
import FormValidator from "@/components/common/FormValidator.vue";
import FileUpload from "@/components/common/FileUpload.vue";

import "vue2-datepicker/locale/ja";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
const projectMapper = createNamespacedHelpers("home");
export default {
  components: {
    FormValidator,
    FileUpload,
  },

  data() {
    return {
      name: "",
      title: "",
      cost: "",
      descriptions: "",
      image: null,
      imageTitle:
        "画像ファイルについて ※推奨サイズは横1200×縦800pxです。\n ※比率は3:2にすると綺麗に表示されます。\n ※最大5枚まで登録でき、1枚目に設定した画像がメインの画像になります。",
    };
  },

  computed: {
    ...projectMapper.mapState(["return"]),
    ...mapState(["userId"]),

    productId() {
      return this.$route.params.projectId;
    },

    accountId() {
      return this.userId;
    },

    returnId() {
      return this.$route.params.returnId;
    },
  },

  async mounted() {
    await this.getReturnById(this.returnId).then(() => {
      this.name = this.return.name;
      this.title = this.return.title;
      this.cost = this.return.cost;
      this.descriptions = this.return.descriptions;
      this.image = this.return.image;
    });
  },

  methods: {
    ...projectMapper.mapActions(["getReturnById", "updateReturn"]),

    uploadImage($event) {
      this.image = $event;
    },

    RemoveImage() {
      this.image = null;
    },

    update() {
      try {
        this.imageToBase64(this.image, (base64Image) => {
          const params = {
            id: this.returnId,
            productId: this.productId,
            name: this.name,
            title: this.title,
            cost: this.cost,
            descriptions: this.descriptions,
            image: base64Image,
          };
          this.updateReturn(params);
          this.$toast.success("updated successfully");
          this.$router.push(
            `/account/${this.accountId}/project/${this.productId}/return`
          );
        });
      } catch (error) {
        this.$toast.error(error);
      }
    },

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
