<template>
  <b-card v-if="account" class="detail-profile-section">
    <template #header>
      <b-avatar>
        <b-img
          v-if="account.avatar"
          fluid
          :src="`data:image/jpeg;base64,` + account.avatar"
        />
      </b-avatar>
      <div>
        <div class="profile-name">{{ account.name }}</div>
      </div>
    </template>
    <div>
      {{ account.about }}
    </div>
    <div class="link-website">
      <div class="mr-auto d-flex flex-column">
        <a :href="account.url" target="_blank" class="text-primary">
          <svg-instagram-circle
            v-if="account.url.startsWith('https://www.instagram')"
          ></svg-instagram-circle>
          <svg-twitter-circle
            v-if="account.url.startsWith('https://www.twitter')"
          ></svg-twitter-circle>
          <svg-youtube-circle
            v-if="account.url.startsWith('https://www.youtube')"
          ></svg-youtube-circle>
          <svg-facebook
            v-if="account.url.startsWith('https://www.facebook')"
          ></svg-facebook>
          <svg-globe v-else></svg-globe>
          {{ account.url }}
        </a>
      </div>
    </div>

    <div class="send-question">
      <b-button variant="primary" block
        ><svg-mail></svg-mail>Send your questions</b-button
      >
    </div>

    <a class="text-law cursor-pointer" @click="showPopUp = !showPopUp">
      Description based on Specified Commercial Transactions Law
    </a>

    <b-modal id="modal-popup" v-model="showPopUp"
      ><div class="header-popup">
        <h4>Description based on specified commercial transactions</h4>
        <p>
          Regarding the project
          <span>Message function</span>
          Please contact the project owner at.
        </p>
      </div>
      <div class="body-popup mt-2">
        <div class="mb-4">
          <p class="mb-0">Sales company name</p>
          <span class="ml-3">AAsample Co., Ltd. </span>
        </div>
        <div class="mb-4">
          <p class="mb-0">
            Name of representative or person in charge of mail order operations
          </p>
          <span class="ml-3">Taro Kobun</span>
        </div>
        <div class="mb-4">
          <p class="mb-0">Business address/location</p>
          <span class="ml-3"
            >Imperial Palace Sample Residential 101, 1-1-1 Chiyoda-ku, Tokyo
          </span>
        </div>
        <div class="mb-4">
          <p class="mb-0">Business phone number</p>
          <span class="ml-3">0312345678 </span>
        </div>
        <div class="mb-4">
          <p class="mb-0">Necessary requirements other than consideration</p>
          <span class="ml-3">none </span>
        </div>
        <div class="mb-4">
          <p class="mb-0">other noteworthy things</p>
          <span class="ml-3"
            >Please check the project page, return entry section, and sharing
            entry section (http://camp-fire.jp/legal).
          </span>
        </div>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
import SvgMail from "@/components/common/svg/SvgMail";
import SvgGlobe from "@/components/common/svg/SvgGlobe";
import SvgInstagramCircle from "@/components/common/svg/SvgInstagramCircle";
import SvgTwitterCircle from "@/components/common/svg/SvgTwitterCircle";
import SvgYoutubeCircle from "@/components/common/svg/SvgYoutubeCircle";
import SvgFacebook from "@/components/common/svg/SvgFacebook";

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
    account: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showPopUp: false,
    };
  },

  async mounted() {},

  methods: {},
};
</script>
