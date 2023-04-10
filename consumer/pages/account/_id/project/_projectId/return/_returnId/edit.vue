<template>
  <section class="edit-back-page">
    <div class="head-colapse text-center">サポーターへ魅力的なお返しを</div>
    <div>
      <b-card v-if="returnMapper && validator">
        <form>
          <FormValidator
            class="mt-3"
            label="リターン品目"
            text-required
            :validator="$v.returnMapper.title"
          >
            <b-form-textarea
              id="textarea-small"
              v-model.trim="returnMapper.title"
              size="md"
              placeholder="タイトルを設定してください"
              rows="3"
            ></b-form-textarea>
          </FormValidator>
          <hr />
          <FormValidator
            class="mt-3"
            label="金額"
            text-required
            :validator="$v.returnMapper.amount"
          >
            <div class="input-money d-flex">
              <b-input
                v-model.trim="returnMapper.amount"
                type="number"
                placeholder="（例）3,000"
                required
              ></b-input>
              <span>円</span>
            </div>
            <span
              >※500円〜2,900,000円で入力しましょう。
              ※送料・消費税込みの価格設定になっている必要があります。</span
            >
          </FormValidator>
          <hr />
          <FormValidator
            class="mt-3"
            label="内容"
            text-required
            :validator="$v.returnMapper.bio"
          >
            <b-form-textarea
              id="textarea-small"
              v-model.trim="returnMapper.bio"
              size="md"
              placeholder="（例）Tシャツ、スマホケース、お礼のメッセージなど。履行するリターンの内容を入力してください。"
              rows="7"
            ></b-form-textarea>
          </FormValidator>
          <hr />
          <FormValidator
            label="お届け予定"
            text-required
            :validator="$v.returnMapper.arrivalDate"
          >
            <div class="select_main">
              <div
                v-for="(item, choseIndex) in chosse"
                :key="choseIndex"
                class="input-title"
              >
                <div class="d-flex">
                  <div class="chose pick-date">
                    <date-picker
                      v-model="returnMapper.arrivalDate"
                      :type="item.type"
                      :format="item.format"
                      :disabled-date="disabledRange"
                      lang="ja-JA"
                    />
                  </div>
                  <span>{{ item.descrip }}</span>
                </div>
              </div>
            </div>
          </FormValidator>
          <hr />
          <FormValidator
            class="mt-3"
            label="画像"
            text-required
            :validator="$v.returnMapper.images"
          >
            <div class="group-img">
              <FileUpload
                v-for="(item, index) in returnMapper.images"
                :key="index"
                :image-id="item.id"
                accept-file="image/png, image/jpeg, image/gif, image/jpg"
                @upload="addReturnImageId($event, index)"
                @destroy="removeReturnImageId(index)"
              ></FileUpload>
            </div>
            <span>{{ imageTitle }}</span>
          </FormValidator>
          <hr />
          <FormValidator
            class="mt-3"
            label="限定"
            text-required
            :validator="$v.returnMapper.stockQuantity"
          >
            <div class="row">
              <div class="col-6 d-flex align-items-center">
                <b-form-checkbox v-model="setLimit"></b-form-checkbox>
                限定数を設定する
              </div>

              <div v-if="setLimit" class="d-flex align-items-center col-5">
                選択
                <input
                  v-model="returnMapper.stockQuantity"
                  class="form-control col-6 mx-2"
                  type="number"
                />
                個
              </div>
            </div>
            <span>※ プロジェクト公開後に、限定数の変更はできません。</span>
          </FormValidator>
          <hr />
          <FormValidator class="mt-3" label="オプション">
            <div id="colapp-chose" class="mt-2">
              <FormValidator>
                <ReturnOptions
                  :options="returnMapper.options"
                  @input="onAddOption"
                ></ReturnOptions>
              </FormValidator>
            </div>
          </FormValidator>
          <hr />
          <FormValidator class="mt-3" label="酒類に関する同意">
            <div class="d-flex">
              <b-form-checkbox
                v-model="returnMapper.hasIncludingAlcohol"
              ></b-form-checkbox>
              <p>リターンの内容に酒類を含む</p>
            </div>
            <span
              >※酒類を含む場合は必ずチェックを入れてください。20歳以上の方のみが応援できるようになります。</span
            >
          </FormValidator>
          <div>
            <FormValidator
              class="mt-3"
              label="メールアドレス取得"
              text-required
            >
              <div class="input-title col-5">
                <div class="chose">
                  <b-form-select
                    v-model="returnMapper.doWantToGetEmail"
                    :options="options"
                  >
                  </b-form-select>
                </div>
              </div>
              <span
                >※ リターンの発送（履行）にメールアドレスが必要な場合は、
                「必要」とすることでサポーターのメールアドレスが取得可能です。</span
              >
            </FormValidator>

            <FormValidator class="mt-3" label="お届け先取得" text-required>
              <div class="input-title col-5">
                <div class="chose">
                  <b-form-select
                    v-model="returnMapper.doWantToGetAddress"
                    :options="options"
                  >
                  </b-form-select>
                </div>
              </div>
              <span>
                ※リターンの発送（履行）にお届け先が必要な場合は、「必要」とすることで「名前・住所・電話番号」を含むサポーターのお届け先情報が取得可能です。
              </span>
            </FormValidator>

            <FormValidator class="mt-3" label="備考欄" text-required>
              <div class="input-title col-5">
                <div class="chose">
                  <b-form-select
                    v-model="returnMapper.doWantToGetRemarks"
                    :options="options"
                  >
                  </b-form-select>
                </div>
              </div>
              <span>
                ※メールアドレスとお届け先住所以外に必要な情報がある場合は、「必須」を選択し「備考欄」での情報入力を必須にしてください。「必須」の場合はサポーターが情報を入力しないと応援できなくなります
                ※備考欄を「必須」にする場合、備考欄に記載して欲しい内容をリターンの「内容」に記載してください。
                ※ 追加情報が不要な場合は「任意」を選択してください。
              </span>
            </FormValidator>
          </div>
        </form>
      </b-card>
      <b-button
        type="button"
        variant="primary"
        block
        class="btn-update"
        @click="update"
        >追加</b-button
      >
    </div>
  </section>
</template>
<script>
import FormValidator from "@/components/common/FormValidator.vue";
import ReturnOptions from "@/components/profile/return/ReturnOptions";
import FileUpload from "@/components/common/FileUpload.vue";
import DatePicker from "vue2-datepicker";

import { required } from "vuelidate/lib/validators";

import "vue2-datepicker/locale/ja";
import { createNamespacedHelpers } from "vuex";
import { cloneDeep } from "lodash";
const { mapState, mapActions } = createNamespacedHelpers("business/campaign");
const accountMapper = createNamespacedHelpers("account");
export default {
  components: {
    FormValidator,
    ReturnOptions,
    FileUpload,
    DatePicker,
  },

  data() {
    return {
      options: [
        { value: false, text: "不要" },
        { value: true, text: "必要" },
      ],
      chosse: [
        { id: 1, descrip: "年", type: "year", format: "YYYY" },
        { id: 2, descrip: "月", type: "month", format: "MM" },
      ],
      setLimit: false,
      imageTitle:
        "画像ファイルについて ※推奨サイズは横1200×縦800pxです。\n ※比率は3:2にすると綺麗に表示されます。\n ※最大5枚まで登録でき、1枚目に設定した画像がメインの画像になります。",
      returnMapper: {
        status: "draft",
        images: [{ id: "" }, { id: "" }, { id: "" }, { id: "" }, { id: "" }],
        title: "",
        amount: "",
        bio: "",
        arrivalDate: "",
        stockQuantity: null,
        hasIncludingAlcohol: false,
        doWantToGetEmail: false,
        doWantToGetAddress: false,
        doWantToGetRemarks: false,
        options: [
          {
            items: [
              {
                title: "",
              },
            ],
            title: "",
          },
        ],
      },
    };
  },

  validations: {
    returnMapper: {
      title: {
        required,
      },
      amount: {
        required,
      },
      bio: {
        required,
      },
      arrivalDate: {
        required,
      },
      // TODO be able cant required
      stockQuantity: {
        required,
      },
      images: {
        0: {
          id: { required },
        },
      },
    },
  },

  computed: {
    ...mapState(["campaign"]),

    ...accountMapper.mapState(["account"]),

    campaignId() {
      return this.$route.params.projectId;
    },

    accountId() {
      return this.account.id;
    },

    returnId() {
      return this.$route.params.returnId;
    },

    validator() {
      return this.$v;
    },
  },

  mounted() {
    this.returnMapper = cloneDeep(this.campaign.returns[this.returnId]);
  },
  methods: {
    ...mapActions(["updateReturnPlan"]),

    disabledRange(date) {
      if (date <= new Date()) {
        return true;
      }
    },

    removeOption() {
      this.options.pop();
    },

    onAddOption($event) {
      this.returnMapper.options = $event;
    },

    async update() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.updateReturnPlan({
          idx: this.$route.params.returnId,
          return: this.returnMapper,
        });
        this.$toast.success("成功");
        this.$router.push(
          `/account/${this.accountId}/project/${this.campaignId}/return`
        );
      }
    },

    addReturnImageId(id, index) {
      this.returnMapper.images[index].id = id;
    },

    removeReturnImageId(index) {
      this.returnMapper.images[index].id = null;
    },
  },
};
</script>
