<template>
  <b-card v-if="account" class="detail-profile-section">
    <template #header>
      <b-avatar>
        <b-img v-if="account.image" fluid :src="account.image.id" />
      </b-avatar>
      <div>
        <div class="profile-name">{{ account.name }}</div>
      </div>
    </template>
    <div class="mb-5">
      {{ account.bio }}
    </div>
    <div class="link-website">
      <div class="mr-auto d-flex flex-column">
        <a
          href="https://www.kobunsha.com/"
          target="_blank"
          class="text-primary"
        >
          <svg-globe></svg-globe>
          www.kobunsha.com
        </a>
        <a class="text-primary">
          <svg-instagram-circle></svg-instagram-circle>
          kobunsha
        </a>
      </div>
      <div class="d-flex flex-column">
        <a href="https://twitter.com/koko_tuku" target="_blank">
          <svg-twitter-circle></svg-twitter-circle>
          kobunsha
        </a>
        <a class="text-primary">
          <svg-youtube-circle></svg-youtube-circle>
          kobunsha
        </a>
        <a
          href="https://www.facebook.com/kokotuku/"
          target="_blank"
          class="svg-fb text-primary"
        >
          <svg-facebook></svg-facebook>
          kobunsha
        </a>
      </div>
    </div>

    <div class="send-question">
      <b-button variant="primary" block
        ><svg-mail></svg-mail>メッセージで意見や質問を送る</b-button
      >
    </div>

    <a class="text-law cursor-pointer" @click="showPopUp = !showPopUp">
      特定商取引法に基づく表記
    </a>

    <b-modal id="modal-popup" v-model="showPopUp"
      ><div class="header-popup">
        <h4>特定商取引に基づく表記</h4>
        <p>
          プロジェクトに関しては
          <span>メッセージ機能</span> でプロジェクトオーナーへお問合せください。
        </p>
      </div>
      <div class="body-popup mt-2">
        <div class="mb-4">
          <p class="mb-0">販売事業者名</p>
          <span class="ml-3">株式会社AAsample </span>
        </div>
        <div class="mb-4">
          <p class="mb-0">代表者または通信販売に関する業務の責任者の氏名</p>
          <span class="ml-3">光文 太郎</span>
        </div>
        <div class="mb-4">
          <p class="mb-0">事業者の住所/所在地</p>
          <span class="ml-3"
            >東京都千代田区1-1-1皇居sampleレジデンシャル101
          </span>
        </div>
        <div class="mb-4">
          <p class="mb-0">事業者の電話番号</p>
          <span class="ml-3">0312345678 </span>
        </div>
        <div class="mb-4">
          <p class="mb-0">対価以外に必要な必要</p>
          <span class="ml-3">無し </span>
        </div>
        <div class="mb-4">
          <p class="mb-0">その他特記事項</p>
          <span class="ml-3"
            >プロジェクトページ、リターン記載欄、共有記載欄(http://camp-fire.jp/legal)をご確認ください。
          </span>
        </div>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

import SvgMail from "@/components/common/svg/SvgMail";
import SvgGlobe from "@/components/common/svg/SvgGlobe";
import SvgInstagramCircle from "@/components/common/svg/SvgInstagramCircle";
import SvgTwitterCircle from "@/components/common/svg/SvgTwitterCircle";
import SvgYoutubeCircle from "@/components/common/svg/SvgYoutubeCircle";
import SvgFacebook from "@/components/common/svg/SvgFacebook";

const { mapActions } = createNamespacedHelpers("account");

export default {
  components: {
    SvgMail,
    SvgGlobe,
    SvgInstagramCircle,
    SvgTwitterCircle,
    SvgYoutubeCircle,
    SvgFacebook,
  },

  props: {
    accountId: {
      type: [String, Number],
      default: "",
    },
    campaign: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      account: null,
      showPopUp: false,
    };
  },

  async mounted() {
    try {
      const response = await this.getAccountDetail(this.accountId);
      this.account = response.body;
    } catch (e) {
      alert(e.message);
    }
  },

  methods: {
    ...mapActions(["getAccountDetail"]),
  },
};
</script>
