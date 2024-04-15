<template>
  <section class="edit-establish-page">
    <div class="head-colapse text-center">必要な目標金額を設定しましょう</div>
    <b-card v-if="campaignMapper && validator">
      <form v-if="campaignMapper.target">
        <b-form-group>
          <FormValidator
            class="col-md-6 col-12 mt-3 p-0"
            label="目標金額"
            text-required
            :validator="$v.campaignMapper.target.amount"
            :name="`${prefix}.target.amount`"
          >
            <div class="input-money d-flex">
              <b-input
                v-model.trim="campaignMapper.target.amount"
                type="text"
                placeholder="（例）100,000"
                required
                :readonly="readOnly"
                :class="{ disabled: readOnly }"
              ></b-input>
              <span>円</span>
            </div>

            <span>※目標金額は100,000円以上の金額で入力してください。</span>
          </FormValidator>
        </b-form-group>
        <hr />
        <b-form-group>
          <FormValidator
            class="mt-3"
            label="募集方式"
            :name="`${prefix}.target.method`"
            :validator="$v.campaignMapper.target.method"
            text-required
          >
            <b-form-radio
              v-model="campaignMapper.target.method"
              value="all_in"
              class="recruit"
              :class="{
                isSelected: campaignMapper.target.method == 'all_in',
                disabled: readOnly,
              }"
              :disabled="readOnly"
              ><div class="right-content">
                <div class="head-box">All-In 方式</div>
                <div class="description">
                  目標金額を達成しなかったとしても、
                  終了日までの応援金を受け取れます。
                </div>
                <span class="p-0">
                  <SvgWaringAlert class="mr-2" />
                  1人の応援からリターン履行義務が発生します
                </span>
              </div></b-form-radio
            >
            <b-form-radio
              v-model="campaignMapper.target.method"
              value="all_or_nothing"
              class="recruit"
              :class="{
                isSelected: campaignMapper.target.method == 'all_or_nothing',
                disabled: readOnly,
              }"
              :disabled="readOnly"
              ><div class="right-content">
                <div class="head-box">All-or-Nothing 方式</div>
                <div class="description">
                  期間内に目標金額を達成した場合に、応援金を受け取れます。
                </div>
                <span class="p-0">
                  <SvgWaringAlert class="mr-2" />
                  目標金額の達成後リターン履行義務が発生します
                </span>
              </div>
            </b-form-radio>
          </FormValidator>
        </b-form-group>
        <hr />
        <b-form-group>
          <FormValidator
            class="col-md-5 col-8 mt-3 p-0"
            label="募集終了日"
            text-required
            :validator="$v.campaignMapper.target.endedAt"
            :name="`${prefix}.target.endAt`"
          >
            <date-picker
              v-model.trim="endedAtTime"
              class="date-picker"
              type="date"
              format="YYYY-MM-DD"
              placeholder="----年 --月 --日"
              :disabled="readOnly"
            >
            </date-picker>
          </FormValidator>
          <div>
            <span
              >※プロジェクトの公開可能期間は、1日〜79日間となります。（All-or-Nothing方式の場合は1日〜59日間）
              <br />
              ※募集終了時刻は募集終了日の23:59です。
              例）2022年12月31日を指定した場合、2022年12月31日
              23:59に募集終了します。
            </span>
          </div>
        </b-form-group>
      </form>
    </b-card>
    <div class="group-btn">
      <button
        :disabled="readOnly"
        :class="{ disabled: readOnly }"
        class="btn-true col-5"
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
import FormValidator from "@/components/common/FormValidator.vue";
import SvgEyes from "@/components/common/svg/SvgEyes.vue";
import SvgWaringAlert from "@/components/common/svg/SvgWaringAlert.vue";
import DatePicker from "vue2-datepicker";

import _ from "lodash";
import { required } from "vuelidate/lib/validators";
// import { mapFields } from "vuex-map-fields";
import { createNamespacedHelpers } from "vuex";
const accountMapper = createNamespacedHelpers("account");
export default {
  inject: ["prefix"],

  components: { SvgEyes, SvgWaringAlert, FormValidator, DatePicker },

  data() {
    return {
      campaignMapper: null,
    };
  },

  computed: {
    ...accountMapper.mapState(["account"]),

    readOnly() {
      const status = [
        "reviewing",
        "update_reviewing",
        "offline",
        "updated",
        "update_rejected",
        "published",
        "finished",
      ];
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

    endedAtTime: {
      get() {
        if (this.campaignMapper.target.endedAt) {
          return new Date(this.campaignMapper.target.endedAt);
        } else return new Date();
      },
      set(value) {
        this.campaignMapper.target.endedAt = value ?? "";
      },
    },
    validator() {
      return this.$v;
    },
  },

  validations: {
    campaignMapper: {
      target: {
        amount: {
          required,
        },
        method: {
          required,
        },
        endedAt: {
          required,
        },
      },
    },
  },

  mounted() {
    // fix cloneDeep campaign
    if (this.campaign.id) {
      this.campaignMapper = _.cloneDeep(this.campaign);
    }
  },

  methods: {
    onSaveStep() {
      this.$v.$touch();
      if (!this.$v.$error) {
        // Fix payload to setlocalCampaign
        this.setLocalCampaign(this.campaignMapper);
        this.$router.push("overview");
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
