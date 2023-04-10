<template>
  <div v-if="campaign" class="mb-3 edit-story-page">
    <h4 class="text-center mt-2 mb-3 edit-story-title">
      あなたの想いを語りましょう
    </h4>
    <b-card v-if="campaignMapper && validator">
      <FormValidator
        class="mt-3"
        label="本文"
        text-required
        :validator="$v.campaignMapper.body.body"
        :name="`${prefix}.body.body`"
      >
        <quill-editor
          v-if="campaign && campaign.id"
          v-model.trim="campaignMapper.body.body"
          :readonly="readOnly"
        ></quill-editor>
        <span class="pass-note"
          >※行間をあけずに改行するには【 Shift + Enter 】を押してください。
        </span>
      </FormValidator>
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
      <nuxt-link
        class="btn btn-fall col-5"
        :to="`/account/${accountId}/project/${campaignId}/preview`"
        ><SvgEyes />
        プレビュー
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import _ from "lodash";

import FormValidator from "@/components/common/FormValidator.vue";
import QuillEditor from "@/components/common/QuillEditor";
import SvgEyes from "@/components/common/svg/SvgEyes.vue";
// import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("business/campaign");

const accountMapper = createNamespacedHelpers("account");

export default {
  inject: ["prefix"],
  components: {
    QuillEditor,
    SvgEyes,
    FormValidator,
  },

  data() {
    return {
      campaignMapper: null,
    };
  },

  validations: {
    campaignMapper: {
      body: {
        body: {
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
      return this.$route.params.id;
    },

    campaignId() {
      return this.$route.params.projectId;
    },

    validator() {
      return this.$v;
    },
  },

  mounted() {
    // fix cloneDeep campaign
    if (this.campaign.id) {
      this.campaignMapper = _.cloneDeep(this.campaign);
    }
  },

  methods: {
    ...mapActions(["setLocalCampaign"]),

    onSaveStep() {
      this.$v.$touch();

      if (!this.$v.$error) {
        this.setLocalCampaign(this.campaignMapper);
        this.$router.push("return");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.edit-story-title {
  color: #466cb0;
  font-size: 24px;
  font-weight: bold;
}

.pass-note {
  font-size: 11px;
  color: #999999;
  padding: 7px 0 12px 0;
}

.group-btn {
  width: 70%;
  margin: auto;
  margin-top: 24px;
}
</style>
