<template>
  <b-card class="card-corporate">
    <div class="form-title text-center">法人情報</div>
    <form class="form-des">
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.name`"
        label="企業名"
        :text-required="!confirm"
        ><b-input
          v-model="name"
          type="text"
          placeholder="（例）株式会社光文社"
          required
          :readonly="confirm"
        ></b-input
      ></FormValidator>
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.nameKana`"
        label="企業名カナ"
        :text-required="!confirm"
      >
        <b-input
          v-model="nameKana"
          type="text"
          placeholder="（例）カブシキガイシャコウブンシャ"
          required
          :readonly="confirm"
        ></b-input>
        <span v-if="!confirm" class="input-note"> ※全角カナ </span>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.companyNumber`"
        label="法人番号"
        :text-required="!confirm"
      >
        <div class="corporate-number">
          <b-input
            v-model="companyNumber"
            type="text"
            placeholder="（例）123456789123"
            required
            :readonly="confirm"
            @keypress="isNumber($event)"
          ></b-input>
          <!-- temporally remove corporate -->
          <!-- <b-button variant="primary" class="corporate-number-search"
            >法人番号検索 <SvgExpand></SvgExpand
          ></b-button> -->
        </div>
        <span v-if="!confirm" class="input-note"> ※半角数 </span>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.established`"
        label="設立年月日"
        :text-required="!confirm"
      >
        <div
          type="text"
          class="d-flex justify-content-between coporate-datetime"
        >
          <div class="select-item d-flex align-items-center">
            <b-form-input
              v-model.number="establishYear"
              maxlength="4"
              :readonly="confirm"
              @change="convertDate('established')"
            >
            </b-form-input>
            <span class="ml-2">年</span>
          </div>
          <div class="select-item d-flex align-items-center">
            <b-form-select
              v-model="establishMonth"
              :options="monthOptions"
              :class="{ confirm: confirm }"
              :disabled="confirm"
              @change="convertDate('established')"
            ></b-form-select>
            <span class="ml-2">月</span>
          </div>
          <div class="select-item d-flex align-items-center">
            <b-form-select
              v-model="establishDay"
              :options="dayOptions"
              :disabled="confirm"
              :class="{ confirm: confirm }"
              @change="convertDate('established')"
            ></b-form-select>
            <span class="ml-2">日</span>
          </div>
        </div>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.zipCode`"
        label="郵便番号"
        :text-required="!confirm"
      >
        <b-input
          v-model="zipCode"
          type="text"
          placeholder="（例）000000"
          required
          class="post-code"
          :readonly="confirm"
          @keypress="isNumber($event)"
        ></b-input>
        <span v-if="!confirm" class="input-note"
          >※「-」は入力不要です。半角英数字で入力してください。</span
        >
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.prefecture`"
        label="都道府県"
        :text-required="!confirm"
      >
        <b-form-select
          v-model="prefecture"
          :options="prefOptions"
          :disabled="confirm"
          class="select-pref"
          :class="{ confirm: confirm }"
        ></b-form-select>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.city`"
        label="市区町村"
        :text-required="!confirm"
        ><b-input
          v-model="city"
          type="text"
          placeholder="（例）文京区音羽"
          required
          :readonly="confirm"
        ></b-input
      ></FormValidator>
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.street`"
        label="番地 建物名"
        :text-required="!confirm"
        ><b-input
          v-model="street"
          type="text"
          placeholder="（例）文京区音羽"
          required
          :readonly="confirm"
        ></b-input
      ></FormValidator>
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.phoneNumber`"
        label="電話番号"
        :text-required="!confirm"
        ><b-input
          v-model="phoneNumber"
          type="text"
          placeholder="（例）0312345678"
          :readonly="confirm"
          @keypress="isNumber($event)"
        ></b-input>
        <span v-if="!confirm" class="input-note"
          >※ハイフンなし半角数</span
        ></FormValidator
      >
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.website1`"
        label="HPやブログなどのURL"
        :text-required="!confirm"
      >
        <b-input
          v-model="website1"
          :readonly="confirm"
          type="text"
          placeholder="（例）https://www.kobunsha.com/"
        ></b-input>
        <span class="input-note"> ※ 半角英数 </span>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        class="mt-0"
        :name="`${prefix}.website2`"
      >
        <b-input
          v-model="website2"
          :readonly="confirm"
          type="text"
          placeholder="（例）https://www.kobunsha.com/"
          class="mt-2"
        ></b-input>
        <span v-if="!confirm" class="input-note"> ※ 半角英数 </span>
      </FormValidator>

      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.ceoName`"
        label="代表者名"
        :text-required="!confirm"
      >
        <b-input
          v-model="ceoName"
          :readonly="confirm"
          type="text"
          placeholder="（例）光文花子"
          required
        ></b-input>
      </FormValidator>
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.ceoNameKana`"
        label="代表者名カナ"
        :text-required="!confirm"
        ><b-input
          v-model="ceoNameKana"
          :readonly="confirm"
          type="text"
          placeholder="（例）コウブンハナコ"
          required
        ></b-input>
        <span v-if="!confirm" class="input-note"
          >※ 全角カナ</span
        ></FormValidator
      >
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.ceoBirthdate`"
        label="代表者生年月日"
        :text-required="!confirm"
      >
        <div class="d-flex justify-content-between coporate-datetime">
          <div class="select-item d-flex align-items-center">
            <b-form-input
              v-model.number="ceoYear"
              maxlength="4"
              :readonly="confirm"
              @change="convertDate('ceoBirthday')"
            >
            </b-form-input>
            <span class="ml-2">年</span>
          </div>
          <div class="select-item d-flex align-items-center">
            <b-form-select
              v-model="ceoMonth"
              :options="monthOptions"
              :class="{ confirm: confirm }"
              :disabled="confirm"
              @change="convertDate('ceoBirthday')"
            ></b-form-select>
            <span class="ml-2">月</span>
          </div>
          <div class="select-item d-flex align-items-center">
            <b-form-select
              v-model="ceoDay"
              :options="dayOptions"
              :class="{ confirm: confirm }"
              :disabled="confirm"
              @change="convertDate('ceoBirthday')"
            ></b-form-select>
            <span class="ml-2">日</span>
          </div>
        </div></FormValidator
      >
      <FormValidator
        :confirm="confirm"
        :name="`${prefix}.industrial`"
        label="業種"
        :text-required="!confirm"
        ><b-input
          v-model="industrial"
          type="text"
          placeholder="（例）サービス業"
          :readonly="confirm"
          required
        ></b-input
      ></FormValidator>
      <b-form-group class="certificates">
        <label class="d-flex mb-0 font-weight-bold" for="certificates">
          証明書類
          <span v-if="!confirm" class="ic-required">＊</span>
          <span v-if="!confirm" class="required">必須</span>
        </label>
        <div class="certificate-content pb-2">
          <FormValidator :confirm="confirm" class="mt-0" label="登記事項証明書">
            <div v-if="confirm" class="images-content">
              <div
                class="result-image"
                :style="{
                  backgroundImage: `url(${imageSource(
                    certificateOfRegisteredMatters1
                  )})`,
                }"
              ></div>
              <div
                class="result-image"
                :style="{
                  backgroundImage: `url(${imageSource(
                    certificateOfRegisteredMatters2
                  )})`,
                }"
              ></div>
            </div>
            <div v-else class="d-flex">
              <FileUpload
                :image-id="certificateOfRegisteredMatters1"
                :name="`${prefix}.certification.${certMaster1}.imageId`"
                class="mr-4"
                @upload="onUploadApplicationImages($event, certMaster1)"
                @destroy="deleteApplicationImage(certMaster1)"
              ></FileUpload>
              <FileUpload
                :image-id="certificateOfRegisteredMatters2"
                :name="`${prefix}.certification.${certMaster2}.imageId`"
                @upload="onUploadApplicationImages($event, certMaster2)"
                @destroy="deleteApplicationImage(certMaster2)"
              ></FileUpload>
            </div>

            <div v-if="!confirm" class="input-note">{{ note }}</div>
          </FormValidator>

          <FormValidator :confirm="confirm" class="mt-3" label="印鑑証明書">
            <div v-if="confirm" class="images-content">
              <div
                class="result-image"
                :style="{
                  backgroundImage: `url(${imageSource(
                    certificateOfOfficialRegistrationOfASeal
                  )})`,
                }"
              ></div>
            </div>

            <FileUpload
              v-else
              :image-id="certificateOfOfficialRegistrationOfASeal"
              :name="`${prefix}.certification.${certOfficial}.imageId`"
              @upload="onUploadApplicationImages($event, certOfficial)"
              @destroy="deleteApplicationImage(certOfficial)"
            ></FileUpload>
            <div v-if="!confirm" class="input-note">{{ note }}</div>
          </FormValidator>

          <FormValidator :confirm="confirm" class="mt-3" label="決算申告書">
            <div v-if="confirm" class="images-content">
              <div
                class="result-image"
                :style="{
                  backgroundImage: `url(${imageSource(
                    declarationOfSettlement
                  )})`,
                }"
              ></div>
            </div>

            <FileUpload
              v-else
              :image-id="declarationOfSettlement"
              :name="`${prefix}.certification.${declareSettlement}.imageId`"
              @upload="onUploadApplicationImages($event, declareSettlement)"
              @destroy="deleteApplicationImage(declareSettlement)"
            ></FileUpload>

            <div v-if="!confirm" class="input-note">{{ note }}</div>
          </FormValidator>

          <FormValidator
            :confirm="confirm"
            class="mt-3"
            label="担当者の個人証明書類"
          >
            <div v-if="confirm" class="images-content">
              <div
                class="result-image"
                :style="{
                  backgroundImage: `url(${imageSource(
                    personalCertificationOfThePersonInCharge1
                  )})`,
                }"
              ></div>
              <div
                class="result-image"
                :style="{
                  backgroundImage: `url(${imageSource(
                    personalCertificationOfThePersonInCharge2
                  )})`,
                }"
              ></div>
            </div>
            <div v-else class="d-flex">
              <FileUpload
                :image-id="personalCertificationOfThePersonInCharge1"
                :name="`${prefix}.certification.${perCert1}.imageId`"
                class="mr-4"
                @upload="onUploadApplicationImages($event, perCert1)"
                @destroy="deleteApplicationImage(perCert1)"
              ></FileUpload>
              <FileUpload
                :image-id="personalCertificationOfThePersonInCharge2"
                :name="`${prefix}.certification.${perCert2}.imageId`"
                @upload="onUploadApplicationImages($event, perCert2)"
                @destroy="deleteApplicationImage(perCert2)"
              ></FileUpload>
            </div>
          </FormValidator>

          <div v-if="!confirm" class="input-note">
            <p>
              ※
              保険者番号、被保険者等記号・番号・QRコードについては撮影時に隠してください。
            </p>
            <p>※ マイナンバーは通知カードには対応しておりません。</p>
            <p>
              ※ パスポートは顔写真と所持人記入欄をアップロードしてください。
            </p>
            <p>
              ※
              パスポートは2020年1月以降に発行されたものである必要がございます。
            </p>
            <p>
              ※
              住民票の写しは本籍・マイナンバーの表記がないものをアップロードしてください。
            </p>
            <p>
              ※ 推奨ブラウザ以外ではうまく画像の設定ができない場合がございます。
            </p>
            <p>
              ※ 推奨ブラウザ：Google
              Chrome(最新版)・FireFox(最新版)・Safari(最新版)
            </p>
            <p>※ サポート対象外： Internet Explorer・モバイルアプリ</p>
            <p>※ アップロードできるファイル形式はPNG/JPG/JPEG/GIFのみです。</p>
          </div>
        </div>
      </b-form-group>
    </form>
  </b-card>
</template>
<script>
// import SvgExpand from "@/components/common/svg/SvgExpand";
import FormValidator from "@/components/common/FormValidator";
import FileUpload from "@/components/common/FileUpload";

import { prefectureNames } from "jp-prefectures";

export default {
  components: {
    // SvgExpand,
    FormValidator,
    FileUpload,
  },

  props: {
    confirm: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      certMaster1: "certificateOfRegisteredMatters1",
      certMaster2: "certificateOfRegisteredMatters2",
      certOfficial: "certificateOfOfficialRegistrationOfASeal",
      declareSettlement: "declarationOfSettlement",
      perCert1: "personalCertificationOfThePersonInCharge1",
      perCert2: "personalCertificationOfThePersonInCharge2",
      prefix: "submitApplicationRequest.company",
      note: "※ アップロードできるファイル形式はPNG/JPG/JPEG/GIFのみです。",
      ceoYear: "",
      ceoMonth: "",
      ceoDay: "",
      establishYear: "",
      establishMonth: "",
      establishDay: "",
      prefOptions: [],
      certificateOptions: [
        { value: "registration-certificate", text: "登記事項証明書" },
        { value: "seal-certificate", text: "印鑑証明書" },
        { value: "financial-statements", text: "決算申告書" },
        { value: "Personal-proof", text: "担当者の個人証明書類" },
      ],
      kindCertificate: null,
      readyWatch: false,
    };
  },

  computed: {
    yearOtions() {
      const currentYear = new Date().getFullYear();
      let startYear = 1970;
      const years = [];
      while (startYear <= currentYear) {
        years.push(startYear++);
      }
      return years;
    },

    monthOptions() {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    },

    dayOptions() {
      return Array.from({ length: 31 }, (_, i) => i + 1);
    },
  },

  watch: {
    "company.zipCode"(newValue) {
      if (newValue.length !== 7) return;
      this.$yubinbango(newValue).then((results) => {
        if (results) {
          this.prefecture = results.region;
          this.city = results.locality;
          this.street = results.street;
        }
      });
    },
  },

  async mounted() {
    this.prefOptions = await prefectureNames();
    if (this.ceoBirthdate) {
      const ceoBirthdation = new Date(this.ceoBirthdate);
      this.ceoYear = ceoBirthdation.getFullYear();
      this.ceoMonth = ceoBirthdation.getMonth();
      this.ceoDay = ceoBirthdation.getDate();
    }

    if (this.established) {
      const establishion = new Date(this.established);
      this.establishYear = establishion.getFullYear();
      this.establishMonth = establishion.getMonth();
      this.establishDay = establishion.getDate();
    }
  },

  methods: {
    onUploadApplicationImages($event, type) {
      this.addApplicationImage({ type, id: $event });
    },

    isNumber(event) {
      if (!/\d/.test(event.key) && (event.key !== "." || /\./))
        return event.preventDefault();
    },

    imageSource(id) {
      return `${process.env.consumerApiUrl}/file/${id}`;
    },

    convertDate(type) {
      if (type === "ceoBirthday") {
        this.ceoBirthdate = new Date(
          `${this.ceoYear}-${this.ceoMonth}-${this.ceoDay}`
        );
      } else if (type === "established") {
        this.established = new Date(
          `${this.establishYear}-${this.establishMonth}-${this.establishDay}`
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.confirm {
  background: unset !important;
  background-color: #efefef !important;
}
.custom-select:disabled {
  color: black;
}

.images-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  .result-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 47%;
    height: 200px;
    background-color: #bbbbbb;
    margin: 24px 0 28px 0;
  }
}
</style>
