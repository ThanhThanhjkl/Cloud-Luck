<template>
  <section class="edit-back-page">
    <div class="head-colapse text-center">サポーターへ魅力的なお返しを</div>
    <div>
      <b-card v-if="validator">
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
              placeholder="リターン品目を設定してください"
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
                class="mx-200"
                type="number"
                min="1"
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
              placeholder="リターン品目を設定してください"
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
                  min="1"
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
          <hr />
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
        @click="create"
        >追加</b-button
      >
    </div>
  </section>
</template>
<script>
import { required } from "vuelidate/lib/validators";

import FormValidator from "@/components/common/FormValidator.vue";
import ReturnOptions from "@/components/profile/return/ReturnOptions";
import FileUpload from "@/components/common/FileUpload.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/ja";
import { createNamespacedHelpers } from "vuex";

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
      arrivalDate: null,
      options: [
        { value: false, text: "不要" },
        { value: true, text: "必要" },
      ],
      optionsDelivery: [
        { value: null, text: "選択" },
        { value: 1, text: "東京都" },
      ],
      chosse: [
        { id: 1, descrip: "年", type: "year", format: "YYYY" },
        { id: 2, descrip: "月", type: "month", format: "MM" },
      ],
      setLimit: true,
      imageTitle:
        "画像について\n※ 推奨サイズは横400×縦200pxです。\n ※ 比率は2:1にすると綺麗に表示されます。\n ※ 最大5枚まで登録でき、1枚目に設定した画像がメインの画像になります。\n ※ アップロードできるファイル形式はPNG/JPG/JPEG/GIFのみです。",
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
    ...accountMapper.mapState(["account"]),

    campaignId() {
      return this.$route.params.projectId;
    },
    accountId() {
      return this.account.id;
    },

    validator() {
      return this.$v;
    },
  },
  methods: {
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

    async create() {
      this.$v.$touch();
      if (!this.$v.$error) {
        await this.createReturnPlan(this.returnMapper);
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
<style lang="scss" scoped>
hr {
  margin: 32px 0;
}

.select_main {
  // grid-template-columns: repeat(10, 1fr);
  .input-title {
    margin-right: 17px;
    select {
      width: 120px;
      height: auto;
      font-size: 14px;
      border: none;
      background-color: $gray-01;
      padding: 19px 15px 17px 15px;
    }
  }
}
</style>
