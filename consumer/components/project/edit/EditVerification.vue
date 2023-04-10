<template>
  <section
    v-if="campaignDataMapper && validator"
    class="edit-verification-page"
  >
    <div class="head-colapse text-center">最後にあなたの情報を</div>
    <b-card v-if="campaignDataMapper.identification">
      <div class="details-title text-center">本人確認情報</div>
      <hr />
      <div class="identification-notice">
        <ul class="identification-list">
          <li v-for="(item, noticeIndex) in notice" :key="noticeIndex">
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="precautions-section">
        <div class="precautions-title">本人確認情報入力に関するご注意</div>
        <ul class="identification-list">
          <li>
            ・本人確認情報は、<span class="text-danger font-weight-bold">
              本人確認書類画像に記載されているものと同じ情報 </span
            >を入力してください。
          </li>
          <li>
            ・入力される情報と本人確認書類画像の情報が一致しない場合、<span
              class="text-danger font-weight-bold"
              >プロジェクトの審査において再提出</span
            >となることがあります。
          </li>
        </ul>
      </div>
      <FormValidator
        class="mt-3"
        label="氏名"
        text-required
        :name="`${prefix}.identification.name`"
        :validator="$v.campaignDataMapper.identification.name"
      >
        <div class="input-money">
          <b-input
            v-model.trim="campaignDataMapper.identification.name"
            type="text"
            placeholder="（例）光文花子"
            required
            :readonly="readOnly"
            :class="{ disabled: readOnly }"
          ></b-input>
        </div>
      </FormValidator>
      <FormValidator
        class="mt-3"
        label="郵便番号"
        text-required
        :name="`${prefix}.identification.zipcode`"
        :validator="$v.campaignDataMapper.identification.zipCode"
      >
        <div class="input-money input-quatity">
          <b-input
            v-model="campaignDataMapper.identification.zipCode"
            type="text"
            placeholder="（例）000000"
            required
            :readonly="readOnly"
            :class="{ disabled: readOnly }"
            @input="readyWatchZipcode = true"
          ></b-input>
          <span>※「-」は入力不要です。半角英数字で入力してください。</span>
        </div>
      </FormValidator>
      <FormValidator
        class="mt-3"
        label="都道府県"
        text-required
        :name="`${prefix}.identification.prefecture`"
        :validator="$v.campaignDataMapper.identification.prefecture"
      >
        <div class="input-title col-5">
          <div class="chose">
            <b-form-select
              v-model="campaignDataMapper.identification.prefecture"
              :options="prefOptions"
              :disabled="readOnly"
            >
            </b-form-select>
          </div>
        </div>
      </FormValidator>

      <FormValidator
        class="mt-3"
        label="市区町村"
        text-required
        :name="`${prefix}.identification.city`"
        :validator="$v.campaignDataMapper.identification.city"
      >
        <div class="input-money">
          <b-input
            v-model="campaignDataMapper.identification.city"
            type="text"
            placeholder="（例）文京区音羽"
            required
            :readonly="readOnly"
            :class="{ disabled: readOnly }"
          ></b-input>
        </div>
      </FormValidator>
      <FormValidator
        class="mt-3"
        label="番地 建物名"
        text-required
        :name="`${prefix}.identification.street`"
        :validator="$v.campaignDataMapper.identification.street"
      >
        <div class="input-money">
          <b-input
            v-model="campaignDataMapper.identification.street"
            type="text"
            placeholder="（例）1-16-6 光文社ビル9F"
            required
            :readonly="readOnly"
            :class="{ disabled: readOnly }"
          ></b-input>
        </div>
      </FormValidator>
      <FormValidator
        class="mt-3"
        label="電話番号"
        text-required
        :name="`${prefix}.identification.phoneNumber`"
        :validator="$v.campaignDataMapper.identification.phoneNumber"
      >
        <div class="input-money input-quatity">
          <b-input
            v-model="campaignDataMapper.identification.phoneNumber"
            type="text"
            placeholder="（例）0312345678"
            required
            :readonly="readOnly"
            :class="{ disabled: readOnly }"
          ></b-input>
          <span>※「-」は入力不要です。半角英数字で入力してください。</span>
        </div>
      </FormValidator>

      <FormValidator
        class="mt-3"
        label="生年月日"
        text-required
        :name="`${prefix}.identification.birthdate`"
        :validator="$v.campaignDataMapper.identification.birthdate"
      >
        <div class="group-chose">
          <div class="input-title year">
            <div class="chose">
              <b-input
                v-model="year"
                type="number"
                min="1"
                maxlength="4"
                required
              ></b-input>
            </div>
            <span>年</span>
          </div>

          <div class="input-title month">
            <div class="chose">
              <b-input
                v-model="month"
                type="number"
                min="1"
                maxlength="2"
                required
              ></b-input>
            </div>
            <span>月</span>
          </div>
          <div class="input-title day">
            <div class="chose">
              <b-input
                v-model="day"
                type="number"
                min="1"
                maxlength="2"
                required
              ></b-input>
            </div>
            <span>日</span>
          </div>
        </div>
      </FormValidator>

      <FormValidator
        class="mt-3 mb-0"
        label="本人確認書類画像"
        text-required
        :name="`${prefix}.identification.images`"
        :validator="$v.campaignDataMapper.identification.images"
      >
        <div class="input-title col-md-5 col-12">
          <div class="chose">
            <b-form-select
              v-model="kindIdentification"
              :options="identityVerificationOptions"
              :disabled="readOnly"
            >
              <template #first>
                <b-form-select-option :value="null" disabled
                  >選択
                </b-form-select-option>
              </template>
            </b-form-select>
          </div>
        </div>

        <div class="group-img">
          <FileUpload
            name="images.$0.id"
            :image-id="
              campaignDataMapper.identification.images[0]
                ? campaignDataMapper.identification.images[0].id
                : null
            "
            :readonly="readOnly"
            @upload="uploadIdentificationImage(0, $event)"
            @destroy="deleteImage(0, $event)"
          ></FileUpload>
          <FileUpload
            v-if="!singleImage"
            name="images.$1.id"
            :image-id="
              campaignDataMapper.identification.images[1]
                ? campaignDataMapper.identification.images[1].id
                : null
            "
            :readonly="readOnly"
            @upload="uploadIdentificationImage(1, $event)"
            @destroy="deleteImage(1, $event)"
          >
          </FileUpload>
        </div>

        <span>
          ※ 推奨ブラウザ以外ではうまく画像の設定ができない場合がございます。<br />
          ※ 推奨ブラウザ：Google
          Chrome(最新版)・FireFox(最新版)・Safari(最新版)<br />
          ※ サポート対象外： Internet Explorer・モバイルアプリ<br />
          ※ アップロードできるファイル形式はPNG/JPG/JPEG/GIFのみです。
        </span>
      </FormValidator>
    </b-card>
    <b-card>
      <div class="details-title text-center">特定商取引法に基づく表記</div>
      <hr />
      <div class="identification-notice bg-blue">
        <ul class="identification-list">
          <li v-for="(item, index) in notatiton" :key="index">
            <span v-html="item"></span>
          </li>
        </ul>
      </div>
      <div class="precautions-section bg-blue">
        <div class="precautions-title">本人確認情報入力に関するご注意</div>
        <ul class="identification-list">
          <li>
            ・特商法の表記方法はお選びいただけます。service
            nameの情報を表示する場合、別途確認・同意項目があります。
          </li>
        </ul>
      </div>

      <!-- Law -->
      <b-tabs>
        <b-tab
          class="tab"
          :active="lawType == 'template'"
          :disabled="readOnly"
          @click="changeLawType('template')"
          ><template #title>
            <b-form-radio v-model="lawType" value="template"></b-form-radio>
            <p>テンプレートを 使用する</p> </template
          ><b-form-group>
            <div v-for="item in texts" :key="item.id" class="group-text">
              <h3>{{ item.head }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </b-form-group>
        </b-tab>
        <b-tab
          class="tab"
          :active="lawType == 'input'"
          :disabled="readOnly"
          @click="changeLawType('input')"
        >
          <template #title>
            <b-form-radio v-model="lawType" value="input"></b-form-radio>
            <p>入力した内容を 表示する</p>
          </template>
          <FormValidator
            label="販売事業者名"
            text-required
            :name="`${prefix}.law.input.sellerName`"
            :validator="$v.inputMapper.sellerName"
          >
            <div class="input-money">
              <b-input
                v-model="inputMapper.sellerName"
                type="text"
                placeholder="（例）株式会社光文社"
                required
                :readonly="readOnly"
                :class="{ disabled: readOnly }"
              ></b-input>
            </div>
          </FormValidator>

          <FormValidator
            label="代表者または通信販売に関する業務責任者の氏名"
            :name="`${prefix}.law.input.responsiblePersonName`"
            :validator="$v.inputMapper.responsiblePersonName"
          >
            <div class="input-money">
              <b-input
                v-model="inputMapper.responsiblePersonName"
                type="text"
                placeholder="例）光文花子"
                required
                :readonly="readOnly"
                :class="{ disabled: readOnly }"
              ></b-input>
              <span>※ 個人の方は記載不要です。</span>
            </div>
          </FormValidator>

          <div class="last-about">
            <h3>事業者の住所/所在地</h3>
          </div>

          <FormValidator
            label="郵便番号"
            text-required
            :name="`${prefix}.law.input.zipCode`"
            :validator="$v.inputMapper.zipCode"
          >
            <div class="input-money input-quatity">
              <b-input
                v-model.trim="inputMapper.zipCode"
                type="text"
                placeholder="（例）000000"
                required
                :readonly="readOnly"
                :class="{ disabled: readOnly }"
                @input="readyWatchLawZipcode = true"
              ></b-input>
              <span>※「-」は入力不要です。半角英数字で入力してください。</span>
            </div>
          </FormValidator>

          <FormValidator
            label="都道府県"
            text-required
            :name="`${prefix}.law.input.prefecture`"
            :validator="$v.inputMapper.prefecture"
          >
            <div class="input-title col-6">
              <div class="chose">
                <b-form-select
                  v-model="inputMapper.prefecture"
                  :options="prefOptions"
                  :disabled="readOnly"
                >
                </b-form-select>
              </div>
            </div>
          </FormValidator>

          <FormValidator
            label="市区町村"
            text-required
            :name="`${prefix}.law.input.city`"
            :validator="$v.inputMapper.city"
          >
            <div class="input-money">
              <b-input
                v-model.trim="inputMapper.city"
                type="text"
                placeholder="文京区音羽"
                required
                :readonly="readOnly"
                :class="{ disabled: readOnly }"
              ></b-input>
              <span>※「-」は入力不要です。半角英数字で入力してください。</span>
            </div>
          </FormValidator>

          <FormValidator
            label="番地建物名"
            text-required
            :name="`${prefix}.law.input.street`"
            :validator="$v.inputMapper.street"
          >
            <div class="input-money">
              <b-input
                v-model.trim="inputMapper.street"
                type="text"
                placeholder="1-16-6"
                required
                :readonly="readOnly"
                :class="{ disabled: readOnly }"
              ></b-input>
              <span>※「-」は入力不要です。半角英数字で入力してください。</span>
            </div>
          </FormValidator>

          <FormValidator
            label="電話番号"
            text-required
            :name="`${prefix}.law.input.phoneNumber`"
            :validator="$v.inputMapper.phoneNumber"
          >
            <div class="input-money input-md-full">
              <b-input
                v-model.trim="inputMapper.phoneNumber"
                type="text"
                placeholder="0312345678"
                required
                :readonly="readOnly"
                :class="{ disabled: readOnly }"
              ></b-input>
              <span>※「-」は入力不要です。半角英数字で入力してください。</span>
            </div>
          </FormValidator>

          <div class="last-about">
            <h3>対価以外に必要な費用</h3>
            <p>無し</p>
          </div>
          <div class="last-about">
            <h3>その他記載事項</h3>
            <p>
              プロジェクトページ、リターン記載欄、共通記載欄（https://）をご確認ください。
            </p>
          </div>
        </b-tab>
        <b-tab
          class="tab"
          :active="lawType == 'service'"
          :disabled="readOnly"
          @click="changeLawType('service')"
          ><template #title>
            <b-form-radio v-model="lawType" value="service"></b-form-radio>
            <p>kokodeTUKURUの 情報を表示する</p>
          </template>
          <b-form-group>
            <div
              v-for="item in texts_service"
              :key="item.id"
              class="group-text"
            >
              <h3>{{ item.head }}</h3>
              <p>{{ item.text }}</p>
            </div>
            <div class="precautions-section bg-blue">
              <div v-for="item in notives" :key="item.id" class="mb-3">
                <div class="precautions-title">
                  {{ item.head }}
                </div>
                <ul class="identification-list">
                  {{
                    item.title
                  }}
                </ul>
              </div>
              <div
                class="box-radio"
                :class="{ active: agree }"
                @click="agree = !agree"
              >
                <FormValidator class="mb-0" :validator="$v.agree">
                  <b-input-group class="d-flex align-items-center ml-3">
                    <input
                      v-model="agree"
                      type="checkbox"
                      :value="true"
                      class="mr-2 checkbox-agree"
                      :readonly="readOnly"
                      :class="{ disabled: readOnly }"
                    />
                    <p>同意してkokode TUKURUの情報を表示する</p>
                  </b-input-group>
                </FormValidator>
              </div>
            </div>
          </b-form-group></b-tab
        >
      </b-tabs>
      <div class="precautions-section bg-blue mb-0">
        <div class="precautions-title">「請求があり次第提供します」とは</div>
        <ul class="identification-list">
          ・特定商取引法に基づいて、情報開示を求められた場合には、情報の提供が必要となります。
        </ul>
      </div>
    </b-card>

    <!-- Bank Account -->
    <b-card>
      <div class="details-title text-center">振込先口座情報</div>
      <hr />
      <div class="identification-notice bg-blue">
        <ul class="identification-list">
          <li
            v-for="(item, infoIndex) in tranferAccountInformation"
            :key="infoIndex"
          >
            <span v-html="item"></span>
          </li>
        </ul>
      </div>
      <hr />

      <div>
        新しい口座情報を入力する

        <FormValidator
          class="mt-3"
          label="銀行名"
          text-required
          :name="`${prefix}.bank.bankName`"
          :validator="$v.campaignDataMapper.bankAccount.bankName"
        >
          <div class="input-money input-quatity">
            <b-input
              v-model="campaignDataMapper.bankAccount.bankName"
              type="text"
              placeholder="（例）みずほ銀行"
              required
              :readonly="readOnly"
              :class="{ disabled: readOnly }"
            ></b-input>
          </div>
          <span
            >※
            銀行名の一部を入力すると、銀行名の一覧が表示されますのでその中から正しい銀行名を選択してください。</span
          >
        </FormValidator>
        <hr />

        <FormValidator
          class="mt-3"
          label="支店番号"
          text-required
          :name="`${prefix}.bank.bankCode`"
          :validator="$v.campaignDataMapper.bankAccount.bankCode"
        >
          <div class="input-money input-lg-4">
            <b-input
              v-model="campaignDataMapper.bankAccount.bankCode"
              type="text"
              placeholder="（例）123"
              required
              :readonly="readOnly"
              :class="{ disabled: readOnly }"
            ></b-input>
          </div>
        </FormValidator>
        <hr />
        <FormValidator
          class="mt-3"
          label="支店コード"
          text-required
          :name="`${prefix}.bank.branchCode`"
          :validator="$v.campaignDataMapper.bankAccount.branchCode"
        >
          <div class="input-money input-lg-4">
            <b-input
              v-model="campaignDataMapper.bankAccount.branchCode"
              type="text"
              placeholder="（例）123"
              required
              :readonly="readOnly"
              :class="{ disabled: readOnly }"
            ></b-input>
          </div>
        </FormValidator>
        <hr />
        <FormValidator
          class="mt-3"
          label="口座種別"
          text-required
          :name="`${prefix}.bank.accountType`"
        >
          <div class="input-title col-5">
            <div class="chose">
              <b-form-select
                v-model="campaignDataMapper.bankAccount.accountType"
                :options="accountTypeOptions"
                :disabled="readOnly"
              >
              </b-form-select>
            </div>
          </div>
        </FormValidator>
        <hr />
        <FormValidator
          class="mt-3"
          label="口座番号"
          text-required
          :name="`${prefix}.bank.accountNumber`"
          :validator="$v.campaignDataMapper.bankAccount.accountNumber"
        >
          <div class="input-money input-quatity">
            <b-input
              v-model="campaignDataMapper.bankAccount.accountNumber"
              type="text"
              placeholder="（例）1234567"
              required
              :readonly="readOnly"
              :class="{ disabled: readOnly }"
            ></b-input>
          </div>
          <span>※ 7桁未満の場合は頭に「0」を付けて7桁にしてください。</span>
        </FormValidator>
        <hr />
        <FormValidator
          class="mt-3"
          label="口座名義"
          text-required
          :name="`${prefix}.bank.accountName`"
          :validator="$v.campaignDataMapper.bankAccount.accountName"
        >
          <div class="input-money input-quatity">
            <b-input
              v-model="campaignDataMapper.bankAccount.accountName"
              type="text"
              placeholder="（例）コウブンハナコ"
              required
              class="mb-2"
              :readonly="readOnly"
              :class="{ disabled: readOnly }"
            ></b-input>
            <span> ※ 口座名義の文字数は全角カタカナ30文字以内です。 </span>
          </div>
        </FormValidator>
      </div>
    </b-card>
    <b-button
      type="submit"
      variant="primary"
      block
      class="btn-update col-md-5 mx-auto"
      :disabled="readOnly"
      @click="onSaveStep"
      >追加</b-button
    >
  </section>
</template>
<script>
import FileUpload from "@/components/common/FileUpload.vue";
import FormValidator from "@/components/common/FormValidator.vue";
import { required, requiredIf, sameAs } from "vuelidate/lib/validators";
import { prefectureNames } from "jp-prefectures";
import {
  notivesData,
  servicesData,
  textData,
  noticeData,
  notationData,
  tranferAccountInformationData,
} from "@/utils/identificationsInfo";
import _ from "lodash";

import { createNamespacedHelpers } from "vuex";
import moment from "moment";
const campaignMapper = createNamespacedHelpers("business/campaign");
const { mapState } = createNamespacedHelpers("account");

export default {
  inject: ["prefix"],

  components: { FormValidator, FileUpload },

  data() {
    return {
      readyWatchZipcode: false,
      readyWatchLawZipcode: false,
      accountSelected: {},
      defaultOptionBank: true,
      year: null,
      month: null,
      day: null,
      isActive: true,
      agree: false,
      kindIdentification: null,
      notives: notivesData,
      texts_service: servicesData,
      texts: textData,
      notice: noticeData,
      notatiton: notationData,
      tranferAccountInformation: tranferAccountInformationData,
      identityVerificationOptions: [
        { value: "driver-license", text: "運転免許証" },
        { value: "health-insurance-card", text: "健康保険被保険者証" },
        { value: "passport", text: "パスポート" },
        { value: "my-number-card", text: "個人番号カード/マイナンバーカード" },
        { value: "residence-card", text: "在留カード" },
        { value: "copy-of-resident-card", text: "住民票の写し" },
      ],
      accountTypeOptions: [
        { value: "saving", text: "総合口座" },
        { value: "checking", text: "当座預金" },
        { value: "time_deposit", text: "普通預金" },
      ],
      inputMapper: {
        sellerName: "",
        responsiblePersonName: "",
        zipCode: "",
        prefecture: "",
        city: "",
        street: "",
        phoneNumber: "",
      },
      campaignDataMapper: null,
    };
  },

  validations: {
    campaignDataMapper: {
      identification: {
        name: {
          required,
        },
        birthdate: {
          required,
        },
        zipCode: {
          required,
        },
        prefecture: {
          required,
        },
        city: {
          required,
        },
        street: {
          required,
        },
        phoneNumber: {
          required,
        },
        images: {
          0: {
            id: { required },
          },
        },
      },
      bankAccount: {
        bankName: {
          required,
        },
        bankCode: {
          required,
        },
        branchCode: {
          required,
        },
        accountType: {
          required,
        },
        accountNumber: {
          required,
        },
        accountName: {
          required,
        },
      },
    },

    inputMapper: {
      sellerName: {
        required: requiredIf(function () {
          return this.lawType === "input";
        }),
      },
      responsiblePersonName: {
        required: requiredIf(function () {
          return this.lawType === "input";
        }),
      },
      zipCode: {
        required: requiredIf(function () {
          return this.lawType === "input";
        }),
      },
      prefecture: {
        required: requiredIf(function () {
          return this.lawType === "input";
        }),
      },
      city: {
        required: requiredIf(function () {
          return this.lawType === "input";
        }),
      },
      street: {
        required: requiredIf(function () {
          return this.lawType === "input";
        }),
      },
      phoneNumber: {
        required: requiredIf(function () {
          return this.lawType === "input";
        }),
      },
    },

    agree: {
      checked: sameAs((model) => {
        if (model.campaignDataMapper.law.type === "service") {
          return true;
        } else {
          return false;
        }
      }),
    },
  },

  computed: {
    ...mapState(["accountCards"]),
    ...campaignMapper.mapState(["campaign"]),

    singleImage() {
      if (
        this.kindIdentification === "my-number-card" ||
        this.kindIdentification === "copy-of-resident-card"
      ) {
        return true;
      } else return false;
    },

    lawInputAvailable() {
      return this.lawType === "input";
    },

    accountId() {
      return _.get(this.campaign, "accountId");
    },

    lawType: {
      get() {
        return _.get(this.campaignDataMapper, "law.type", "template");
      },
      set(value) {
        _.set(this.campaignDataMapper.law.type, value);
      },
    },

    readOnly() {
      const status = [
        "reviewing",
        "update_reviewing",
        "update_rejected",
        "offline",
        "updated",
        "published",
        "finished",
      ];
      return status.includes(this.campaignStatus);
    },

    publishable() {
      const status = ["offline", "updated"];
      return status.includes(this.campaignStatus);
    },

    campaignStatus() {
      return _.get(this.campaign, "status");
    },

    yearOptions() {
      const currentYear = new Date().getFullYear();
      let startYear = 1970;
      const years = [];
      while (startYear <= currentYear) {
        years.push(startYear++);
      }
      return years;
    },

    validator() {
      return this.$v;
    },
  },

  watch: {
    "campaignDataMapper.identification.zipCode"(value) {
      if (!this.readyWatchZipcode) return;
      if (value.length !== 7) return;

      this.$yubinbango(value).then((results) => {
        if (results) {
          this.campaignDataMapper.identification.prefecture = results.region;
          this.campaignDataMapper.identification.city = results.locality;
          this.campaignDataMapper.identification.street = results.street;
        }
      });
    },

    "inputMapper.zipCode"(value) {
      if (!this.readyWatchLawZipcode) return;
      if (value.length !== 7) return;

      this.$yubinbango(value).then((results) => {
        if (results) {
          this.inputMapper.prefecture = results.region;
          this.inputMapper.city = results.locality;
          this.inputMapper.street = results.street;
        }
      });
    },

    "campaignDataMapper.identification.birthdate"(newVal, oldVal) {
      this.convertDate(newVal);
    },
  },

  async mounted() {
    this.prefOptions = await prefectureNames();
    if (this.birthdate) {
      this.convertDate(this.birthdate);
    } else {
      this.year = new Date().getFullYear();
      this.month = (new Date().getMonth() + 1).toString().replace(/^0/, "");
      this.day = new Date().getDate().toString().replace(/^0/, "");
    }

    if (this.lawType === "input") {
      const campaignLawInput = _.get(this.campaign, "law.input");
      this.inputMapper = _.cloneDeep(campaignLawInput);
    }

    if (this.campaign) {
      this.campaignDataMapper = _.cloneDeep(this.campaign);
    }
  },

  methods: {
    ...campaignMapper.mapActions(["setLawInput", "setLocalCampaign"]),

    convertDate(value) {
      if (value) {
        this.year = new Date(value).getFullYear();
        this.month = (new Date(value).getMonth() + 1)
          .toString()
          .replace(/^0/, "");
        this.day = new Date(value).getDate().toString().replace(/^0/, "");
      }
    },

    changeLawType(type) {
      if (this.readOnly) {
        return false;
      } else {
        this.campaignDataMapper.law.type = type;
      }
    },

    dayOptions(number) {
      return Array.from({ length: number }, (_, i) => i + 1);
    },

    uploadIdentificationImage(index, $event) {
      const images = this.campaignDataMapper.identification.images;
      images[index] = { id: $event };
      this.campaignDataMapper.identification.images = [...images];
      this.$nextTick();
    },

    deleteImage(index, $event) {
      this.campaignDataMapper.identification.images[index] = null;
    },

    onSaveStep() {
      if (this.singleImage) {
        this.campaignDataMapper.identification.images[1] = null;
      }

      const birthdate = moment(`${this.month}/${this.day}/${this.year}`).format(
        "YYYY-MM-DD[T]HH:mm:ss"
      );

      this.campaignDataMapper.identification.birthdate =
        birthdate.toLowerCase() !== "invalid date" ? birthdate : null;

      this.campaignDataMapper.law.input = _.cloneDeep(this.inputMapper);

      this.$v.$touch();

      if (!this.$v.$error) {
        this.setLocalCampaign(this.campaignDataMapper);
        this.$toast.success("保存しました");
      } else {
        this.$toast.error("必須項目をすべて入力してください。");
      }
    },
  },
};
</script>
