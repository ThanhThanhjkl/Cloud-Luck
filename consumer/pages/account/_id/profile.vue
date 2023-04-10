<template>
  <div class="changeinfo detail">
    <AuthRegisterInfo class="mb-4"></AuthRegisterInfo>
    <div class="mx-lg-5">
      <div v-if="account" id="register-setting-0" class="profile-setting">
        <b-card>
          <div class="form-title text-center">プロフィール編集</div>
          <form>
            <FormValidator
              label="ユーザー名"
              name="editAccountRequest.name"
              required
            >
              <b-input
                v-model="name"
                type="text"
                placeholder="exampleexampleexample"
                required
              ></b-input>
            </FormValidator>
            <FormValidator
              label="メールアドレス"
              name="editAccountRequest.email"
              required
            >
              <b-input
                v-model="mail"
                :class="{ error: error }"
                value="example@example.com"
                type="email"
                placeholder="example@example.com"
              >
              </b-input>
              <span v-if="error" class="validation">
                正しいメールアドレスを入力してください
              </span>
            </FormValidator>
            <FormValidator
              class="mb-0"
              label="プロフィール画像"
              name="editAccountRequest.image.id"
            >
              <div class="iframe-avatar text-center">
                <div class="d-flex justify-content-center uploading-image">
                  <b-img v-if="srcAvatar" fluid :src="srcAvatar" />
                  <b-img v-else fluid src="@/assets/img/avatar-iframe.png" />
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
                      画像をアップロードする
                    </div>
                    <div>縦横比200px*200px以上の画像推奨</div>
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
                    ※アップロードできるファイル形式はPNG/JPG/JPEG/GIFのみです。
                  </div>
                </div>
              </div>
            </FormValidator>
          </form>
        </b-card>

        <b-card class="card-about-person">
          <div class="form-title text-center">記載者について</div>
          <form class="mx-auto">
            <FormValidator
              name="editAccountRequest.website"
              class="mt-3"
              label="HPやブログなどのURL"
            >
              <input
                v-model="url"
                type="text"
                placeholder="（例）https://www.kobunsha.com/"
                class="form-control"
              />
            </FormValidator>

            <FormValidator
              name="editAccountRequest.bio"
              class="mt-3"
              label="本文"
            >
              <textarea
                v-model="bio"
                type="text"
                placeholder="自己紹介などを記入してください"
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
            >更新する</b-button
          >
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
import AuthRegisterInfo from "@/components/auth/AuthRegisterInfo";
import SvgAvatar from "@/components/common/svg/SvgAvatar";
import FormValidator from "@/components/common/FormValidator";
import { get, omit } from "lodash";
const { mapActions, mapState } = createNamespacedHelpers("account");
const globalMapper = createNamespacedHelpers("global");
const authMapper = createNamespacedHelpers("auth");

export default {
  components: {
    AuthRegisterInfo,
    SvgAvatar,
    FormValidator,
  },

  layout: "auth",

  data() {
    return {
      mail: null,
      error: false,
      isDragging: false,
    };
  },

  computed: {
    ...authMapper.mapState(["user"]),
    ...mapState(["account"]),
    ...mapFields("account", {
      name: "account.name",
      url: "account.url",
      bio: "account.bio",
    }),

    srcAvatar() {
      if (this.account.image && this.account.image.id) {
        return this.$businessRepositories.businessCampaigns.getImage(
          this.account.image.id
        );
      } else return "";
    },
  },

  watch: {
    user: {
      immediate: true,
      deep: true,
      handler(val) {
        if (get(val, "email")) {
          this.mail = val.email;
        }
      },
    },
  },

  methods: {
    ...mapActions(["updateProfile", "uploadAvatar"]),
    ...globalMapper.mapActions(["getImage"]),

    async onUploadAvatar(e, isDrop) {
      const fileInput = this.$refs.fileInput;
      const files = isDrop ? e.dataTransfer.files : fileInput.files;
      if (files && files[0]) {
        await this.uploadAvatar(files[0]);
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
      this.error = false;

      let params = {
        username: this.account.name,
        image: {
          id: this.account.image ? this.account.image.id : null,
        },
        bio: this.account.bio || "",
        website: this.account.url || "",
      };

      if (this.mail && this.mail !== this.user.email) {
        params = { ...params, email: this.mail };
        if (!this.validateEmail(this.mail)) return false;
      }

      if (!this.account.image) {
        params = omit(params, "image");
      }

      this.updateProfile(params).then(() => {
        this.$toasted.success("更新しました");
      });
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
