<template>
  <section class="edit-intuitive-page">
    <div class="head-colapse text-center">キャッチーな画像を設定しましょう</div>
    <b-card v-if="campaignMapper && validator">
      <form>
        <b-form-group>
          <FormValidator
            class="mt-3"
            label="メイン画像"
            text-required
            :name="`${prefix}.visual.mainImage`"
            :validator="$v.campaignMapper.visual.mainImage.id"
          >
            <FileUpload
              class="card-upload-big"
              :readonly="readOnly"
              :image-id="campaignMapper.visual.mainImage.id"
              @upload="onUploadMainImage"
              @destroy="onDestroyMainImage"
            ></FileUpload>
            <span class="sub-about"
              >画像ファイルについて <br />
              ※推奨サイズは横1200×縦800pxです。<br />
              ※比率は3:2にすると綺麗に表示されます。<br />
              ※アップロードできるファイル形式はPNG/JPG/JPEG/GIFのみです。
            </span>
          </FormValidator>
        </b-form-group>

        <hr />

        <b-form-group>
          <FormValidator
            class="mt-3"
            label="サブ画像"
            text-required
            :name="`${prefix}.visual.mainImage`"
            :validator="$v.subImage"
          >
            <div class="group-img">
              <FileUpload
                v-for="index in 4"
                :id="index"
                :key="index"
                :readonly="readOnly"
                :image-id="getImageId(index - 1)"
                @destroy="onRemoveSubImageId(index - 1)"
                @upload="onAddSubImageId($event, index - 1)"
              ></FileUpload>
            </div>
            <span class="sub-about"
              >画像ファイルについて <br />
              ※推奨サイズは横1200×縦800pxです。<br />
              ※比率は3:2にすると綺麗に表示されます。<br />
              ※アップロードできるファイル形式はPNG/JPG/JPEG/GIFのみです。
            </span>
          </FormValidator>
        </b-form-group>
        <hr />

        <b-form-group>
          <FormValidator
            v-if="campaign"
            class="mt-3"
            label="動画"
            :name="`${prefix}.visual.videoUrl`"
            text-required
            :validator="$v.campaignMapper.visual.videoUrl"
          >
            <b-textarea
              v-model.trim="campaignMapper.visual.videoUrl"
              type="text"
              :placeholder="placeholder"
              rows="2"
              required
              :disabled="readOnly"
              :class="{ disabled: readOnly }"
            ></b-textarea>
            <span class="sub-about"
              >※プロジェクトページのメイン画像に再生マークが表示され、クリックすると動画が再生されるようになります。<br />
              ※YouTube、Vimeoのみ対応しています。</span
            >
          </FormValidator>
        </b-form-group>
      </form>
    </b-card>

    <div class="group-btn">
      <button
        :disabled="readOnly"
        class="btn-true col-5"
        :class="{ disabled: readOnly }"
        @click="onSaveStep"
      >
        保存
      </button>
      <nuxt-link
        class="btn btn-fall col-5"
        :to="`/account/${accountId}/project/${campaignId}/preview`"
        ><SvgEyes />
        プレビュー
      </nuxt-link>
    </div>
  </section>
</template>
<script>
import { required, requiredIf } from "vuelidate/lib/validators";
import _ from "lodash";

import FileUpload from "@/components/common/FileUpload.vue";
import FormValidator from "@/components/common/FormValidator.vue";
import SvgEyes from "@/components/common/svg/SvgEyes.vue";
// import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("business/campaign");
const accountMapper = createNamespacedHelpers("account");

export default {
  inject: ["prefix"],

  components: {
    FileUpload,
    SvgEyes,
    FormValidator,
  },
  data() {
    return {
      filePreview: null,
      placeholder: "https://www.youtube.com/watch?v=XXXXXXXXX or vimeo",
      campaignMapper: null,
      tempSubImage: [{ id: null }, { id: null }, { id: null }, { id: null }],
    };
  },

  validations: {
    campaignMapper: {
      visual: {
        videoUrl: {
          required,
        },
        mainImage: {
          id: {
            required,
          },
        },
      },
    },
    subImage: {
      required: requiredIf(function () {
        return this.subImageValidate;
      }),
    },
  },

  computed: {
    ...mapState(["campaign"]),
    ...accountMapper.mapState(["account"]),

    readOnly() {
      const status = ["reviewing", "update_reviewing"];
      return status.includes(this.campaignStatus);
    },

    campaignStatus() {
      return _.get(this.campaign, "status");
    },

    accountId() {
      return this.account.id;
    },

    campaignId() {
      return this.$route.params.projectId;
    },

    validator() {
      return this.$v;
    },

    subImageValidate() {
      return !this.campaignMapper?.visual?.subImage.some((e) => e.id) ?? false;
    },
  },

  mounted() {
    if (this.campaign) {
      this.campaignMapper = _.cloneDeep(this.campaign);
      if (
        this.campaignMapper.visual.subImage.length < this.tempSubImage.length
      ) {
        this.campaignMapper.visual.subImage = this.tempSubImage.map(
          (item, index) => {
            if (
              index < this.campaignMapper.visual.subImage.length &&
              this.campaignMapper.visual.subImage[index].id !== null
            ) {
              return { id: this.campaignMapper.visual.subImage[index].id };
            } else {
              return item;
            }
          }
        );
      }
    }
  },

  methods: {
    ...mapActions([
      "deleteImage",
      "removeSubImageId",
      "addSubImageId",
      "setLocalCampaign",
    ]),

    onSaveStep() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.setLocalCampaign(this.campaignMapper);
        this.$toasted.success("更新しました");
        this.$router.push(`body`);
      }
    },

    onRemoveSubImageId(index) {
      this.campaignMapper.visual.subImage[index].id = null;
    },

    onUploadMainImage($event) {
      this.campaignMapper.visual.mainImage.id = $event;
    },

    onDestroyMainImage() {
      this.campaignMapper.visual.mainImage.id = null;
    },

    onAddSubImageId($event, idx) {
      this.campaignMapper.visual.subImage[idx].id = $event;
    },

    getImageId(index) {
      return this.campaignMapper.visual.subImage[index]
        ? this.campaignMapper.visual.subImage[index].id
        : "";
    },

    imageSource(id) {
      return `${process.env.businessApiUrl}/file/${id}`;
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
