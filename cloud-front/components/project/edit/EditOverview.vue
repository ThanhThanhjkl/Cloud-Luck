<template>
  <section class="edit-overview-page">
    <div class="head-colapse text-center">
      あなたのプロジェクトを伝えましょう
    </div>
    <b-card v-if="campaignMapper && validator">
      <form>
        <b-form-group>
          <FormValidator
            class="mt-3"
            label="タイトル"
            :name="`${prefix}.detail.title`"
            :validator="$v.campaignMapper.detail.title"
            text-required
          >
            <div class="input-title d-flex">
              <b-form-textarea
                id="textarea-small"
                v-model.trim="campaignMapper.detail.title"
                maxlength="40"
                size="lg"
                placeholder="タイトルを設定してください"
                :readonly="readOnly"
                :class="{ disabled: readOnly }"
              ></b-form-textarea>
              <MaxLengthIndicator
                class="quatily"
                :value="campaignMapper.detail.title"
                max="40"
              ></MaxLengthIndicator>
            </div>
          </FormValidator>
        </b-form-group>
        <hr />
        <b-form-group>
          <FormValidator
            class="mt-3"
            label="概要文"
            :name="`${prefix}.detail.summary`"
            :validator="$v.campaignMapper.detail.summary"
            text-required
          >
            <div class="input-title d-flex">
              <b-form-textarea
                id="textarea-small"
                v-model.trim="campaignMapper.detail.summary"
                maxlength="150"
                size="lg"
                placeholder="概要を記入してください"
                rows="5"
                :readonly="readOnly"
                :class="{ disabled: readOnly }"
              ></b-form-textarea>
              <MaxLengthIndicator
                class="quatily"
                :value="campaignMapper.detail.summary"
                max="150"
              ></MaxLengthIndicator>
            </div>
          </FormValidator>
        </b-form-group>
        <hr />
        <b-form-group>
          <FormValidator
            class="mt-3"
            label="カテゴリ"
            :name="`${prefix}.detail.categoryId`"
            :validator="$v.campaignMapper.detail.categoryId"
          >
            <div class="input-title col-8">
              <b-form-select
                v-model="campaignMapper.detail.categoryId"
                class="chose lengthen"
                :options="categories"
                :disabled="readOnly"
              >
              </b-form-select>
            </div>
            <span class="sub-title"
              >※カテゴリーの決定に関しましては、弊社の基準が適用されることがあります。</span
            >
          </FormValidator>
        </b-form-group>
        <hr />
        <b-form-group>
          <FormValidator
            class="mt-3"
            label="関連する地域"
            :name="`${prefix}.detail.areaId`"
            text-required
            :validator="$v.campaignMapper.detail.areaId"
          >
            <div class="input-title col-5">
              <b-form-select
                v-model="campaignMapper.detail.areaId"
                class="chose"
                :options="prefOptions"
                :disabled="readOnly"
              >
              </b-form-select>
            </div>
            <span class="sub-title"
              >※地域で検索された際に、設定した都道府県のプロジェクトとして表示されます。
              ※プロジェクトのページに、設定した都道府県が表示されます。</span
            >
          </FormValidator>
        </b-form-group>
        <hr />
        <b-form-group>
          <FormValidator
            class="mt-3"
            label="掲載希望ブランド"
            :name="`${prefix}.detail.brandId`"
            text-required
            :validator="$v.campaignMapper.detail.brandId"
          >
            <div class="input-title col-5">
              <b-form-select
                v-model="campaignMapper.detail.brandId"
                class="chose"
                :options="brands"
                :disabled="readOnly"
              >
              </b-form-select>
            </div>
            <span class="sub-title"
              >※掲載をお約束するものではありませんのであらかじめご了承ください。<br
            /></span>
          </FormValidator>
        </b-form-group>
      </form>
    </b-card>
    <div class="group-btn">
      <button
        class="btn-true col-5"
        :class="{ disabled: readOnly }"
        :disabled="readOnly"
        @click="onSaveStep"
      >
        保存
      </button>
      <button class="btn btn-fall col-5" @click="onPreview">
        <SvgEyes />
        プレビュー
      </button>
    </div>
  </section>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import _ from "lodash";

import SvgEyes from "@/components/common/svg/SvgEyes.vue";
import FormValidator from "@/components/common/FormValidator.vue";
import MaxLengthIndicator from "@/components/common/MaxLengthIndicator.vue";

import { createNamespacedHelpers } from "vuex";
const accountMapper = createNamespacedHelpers("account");
const { mapActions, mapState } = createNamespacedHelpers("business/campaign");

export default {
  inject: ["prefix"],

  components: { SvgEyes, FormValidator, MaxLengthIndicator },

  data() {
    return {
      prefOptions: [
        {
          value: null,
          text: "選択してください",
        },
        {
          value: "CwoNCg8ODQICAAkCBAQKAQ",
          text: "dummy",
        },
      ],
      categories: [
        {
          value: null,
          text: "選択してください",
        },
        {
          value: "DwYJBwsFAwAKAAUJBA4ADg",
          text: "アート・写真",
        },
      ],
      brands: [
        {
          value: null,
          text: "選択してください",
        },
        {
          value: "AwEFCwMMBw0NCQcBBAMABw",
          text: "アート・写真",
        },
      ],

      campaignMapper: null,
    };
  },

  validations: {
    campaignMapper: {
      detail: {
        title: {
          required,
        },
        summary: {
          required,
        },
        categoryId: {
          required,
        },
        areaId: {
          required,
        },
        brandId: {
          required,
        },
      },
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
  },

  watch: {
    "campaign.id"(value) {
      if (value) {
        this.campaignMapper = _.cloneDeep(this.campaign);
      }
    },
  },

  mounted() {
    this.campaignMapper = _.cloneDeep(this.campaign);
  },

  methods: {
    ...mapActions(["setLocalCampaign"]),

    onSaveStep() {
      this.$v.$touch();
      if (!this.$v.$error) {
        this.setLocalCampaign(this.campaignMapper);
        this.$toasted.success("更新しました");
        this.$router.push("visual");
      }
    },

    onPreview() {
      this.setLocalCampaign(this.campaignMapper);
      this.$router.push(
        `/account/${this.accountId}/project/${this.campaignId}/preview`
      );
    },
  },
};
</script>
