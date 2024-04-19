<template>
  <div class="changeinfo detail">
    <div class="mx-lg-5">
      <div id="register-setting-0" class="profile-setting">
        <b-card>
          <div class="form-title text-center">Edit profile</div>
          <form>
            <FormValidator label="Acount Name" required>
              <b-input
                v-model="name"
                type="text"
                placeholder="exampleexampleexample"
                required
              ></b-input>
            </FormValidator>
            <FormValidator label="Email" required>
              <b-input
                v-model="email"
                value="example@example.com"
                type="email"
                placeholder="example@example.com"
              >
              </b-input>
            </FormValidator>
            <FormValidator class="mb-0" label="Avatar">
              <div class="iframe-avatar text-center">
                <div class="d-flex justify-content-center uploading-image">
                  <b-img fluid :src="avatar" />
                </div>
                <div class="upload-image-box">
                  <label
                    for="files"
                    class="upload-img"
                    :class="{ dragging: isDragging }"
                  >
                    <div
                      @dragover="dragover"
                      @dragleave="dragleave"
                      @drop="drop"
                    >
                      <svg-avatar></svg-avatar>
                      Upload an image
                    </div>
                    <div>
                      Image with aspect ratio of 200px*200px or more recommended
                    </div>
                  </label>
                  <input
                    id="files"
                    ref="fileInput"
                    style="visibility: hidden"
                    type="file"
                    accept="image/png, image/jpeg, image/gif, image/jpg"
                    class="d-none"
                    @change="onUploadAvatar"
                  />
                  <div class="sub-note">
                    ※The only file formats that can be uploaded are
                    PNG/JPG/JPEG/GIF.
                  </div>
                </div>
              </div>
            </FormValidator>
          </form>
        </b-card>

        <b-card class="card-about-person">
          <div class="form-title text-center">About the author</div>
          <form class="mx-auto">
            <FormValidator class="mt-3" label="URL of homepage, blog, etc.">
              <b-input
                v-model="url"
                type="text"
                placeholder="（例）https://www.kobunsha.com/"
                class="form-control"
              ></b-input>
            </FormValidator>

            <FormValidator class="mt-3" label="Text">
              <textarea
                v-model="about"
                type="text"
                placeholder="Please enter your self-introduction etc."
                class="form-control"
              />
            </FormValidator>
          </form>
          <hr class="mt-4 mb-4" />
          <b-button
            type="submit"
            variant="primary"
            class="btn-changeinfo-profile"
            block
            @click="update"
            >Update</b-button
          >
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import SvgAvatar from "@/components/common/svg/SvgAvatar";
import FormValidator from "@/components/common/FormValidator";
const { mapActions, mapState } = createNamespacedHelpers("auth");

export default {
  components: {
    SvgAvatar,
    FormValidator,
  },

  layout: "auth",

  data() {
    return {
      name: null,
      email: null,
      avatar: null,
      url: null,
      about: null,
      role: null,
      error: false,
      isDragging: false,
    };
  },

  computed: {
    ...mapState(["userId", "account"]),
    accountId() {
      if (this.userId) {
        return this.userId;
      } else {
        return null;
      }
    },
  },

  async mounted() {
    await this.getAccount(this.accountId).then(() => {
      this.name = this.account.name;
      this.email = this.account.email;
      this.avatar = "data:image/jpeg;base64," + this.account.avatar;
      this.url = this.account.url;
      this.about = this.account.about;
      this.role = this.account.role;
    });
  },

  methods: {
    ...mapActions(["getAccount", "updateAccount"]),
    onUploadAvatar(e, isDrop) {
      const fileInput = this.$refs.fileInput;
      const files = isDrop ? e.dataTransfer.files : fileInput.files;
      if (files && files[0]) {
        this.avatar = URL.createObjectURL(files[0]);
      }
    },

    validateEmail(value) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        this.error = false;
        return true;
      } else {
        this.error = true;
        return false;
      }
    },

    update() {
      try {
        this.imageToBase64(this.avatar, (base64Image) => {
          const params = {
            id: this.accountId,
            name: this.name,
            email: this.email,
            avatar: base64Image,
            url: this.url,
            about: this.about,
            role: this.role,
          };
          this.updateAccount(params);
          this.$toast.success("updated successfully");
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

    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.onUploadAvatar(e, true);
      this.isDragging = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.error {
  background-color: #f9dddd !important;
  border: 2px solid #d84646 !important;
}

.validation {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}

.dragging {
  background-color: #f5fcff;
  opacity: 0.25;
  border: 2px dashed #1c8adb;
}

.upload-image-box {
  @include min-width(md) {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .sub-note {
    color: #989898;
    font-size: 13px;
  }
}
</style>
