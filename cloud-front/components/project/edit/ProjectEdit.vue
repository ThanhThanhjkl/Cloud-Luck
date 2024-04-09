<template>
  <section class="edit-text-page edit-overview-page edit-intuitive-page">
    <b-card>
      <form class="form-note">
        <b-form-group>
          <form-validator class="mt-3" label="タイトル" text-required>
            <div class="input-title d-flex">
              <b-form-textarea
                id="textarea-small"
                v-model="title"
                size="lg"
                maxlength="40"
                placeholder="タイトルを設定してください"
              ></b-form-textarea>
              <MaxLengthIndicator class="quatily" :value="title" max="40">
              </MaxLengthIndicator>
            </div>
          </form-validator>
        </b-form-group>

        <b-form-group>
          <form-validator class="mt-3" label="メイン画像" text-required>
            <div class="upload-image">
              <FileUpload
                :image-id="image"
                @upload="onUploadImage($event)"
                @destroy="destroyImage"
              >
              </FileUpload>
            </div>
            <div class="sub-about">
              画像ファイルについて <br />
              ※推奨サイズは横1200×縦800pxです。<br />
              ※比率は3:2にすると綺麗に表示されます。<br />
              ※アップロードできるファイル形式はPNG/JPG/JPEG/GIFのみです。
            </div>
          </form-validator>
        </b-form-group>
        <b-form-group>
          <form-validator class="mt-3" label="本文" text-required>
            <div class="form-text">
              <div class="menu-text">
                <quill-editor v-model="body"></quill-editor>
              </div>
            </div>
          </form-validator>
        </b-form-group>
        <span class="edit-note"
          >※行間をあけずに改行するには【 Shift + Enter 】を押してください。
        </span>
      </form>
    </b-card>
    <div class="group-btn">
      <button class="btn-true col-5" @click="createReport">保存</button>
      <button class="btn btn-fall col-5" @click="previewReport">
        <SvgEyes />プレビュー
      </button>
    </div>
  </section>
</template>
<script>
import FormValidator from "@/components/common/FormValidator.vue";
import QuillEditor from "@/components/common/QuillEditor";
import SvgEyes from "@/components/common/svg/SvgEyes.vue";
import FileUpload from "@/components/common/FileUpload.vue";
import MaxLengthIndicator from "@/components/common/MaxLengthIndicator";
import { mapFields } from "vuex-map-fields";

import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("business/campaign");
const accountMapper = createNamespacedHelpers("account");

export default {
  components: {
    FileUpload,
    QuillEditor,
    FormValidator,
    SvgEyes,
    MaxLengthIndicator,
  },

  computed: {
    campaignId() {
      return this.$route.params.projectId;
    },
    ...mapFields("business/campaign", {
      report: "report",
      title: "report.title",
      body: "report.body",
      image: "report.image.id",
    }),

    ...accountMapper.mapState(["account"]),

    accountId() {
      return this.account.id;
    },
  },

  methods: {
    ...mapActions(["postReport", "resetReport"]),
    onUploadImage(id) {
      this.image = id;
    },

    destroyImage() {
      this.image = null;
    },

    async createReport() {
      const params = {
        id: this.campaignId,
        report: this.report,
      };
      await this.postReport(params);
      this.$toast.success("保存しました");
      this.resetReport();
      this.image = null;
    },

    previewReport() {
      this.$router.push({
        path: `/account/${this.accountId}/project/${this.campaignId}/preview/note`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.edit-intuitive-page {
  .card-body {
    margin-right: 0;
    margin-left: 0;
  }
  .form-note {
    padding: 36px 70px 0px 70px;
    @include max-width(md) {
      padding: 0px 15px 0px 15px;
    }
    .quatily {
      position: absolute;
      right: 10px;
      color: black;
      bottom: 15px !important;
      font-size: 13px;
      font-weight: 500;
    }
    .sub-about {
      padding: 30px;
    }
    ::v-deep {
      .upload-image {
        @include min-width(lg) {
          .card-upload {
            position: absolute;
            top: 30%;
            left: 20%;
            height: auto;
            background: transparent;
            border: none;
          }
        }
      }
    }
  }
}
</style>
