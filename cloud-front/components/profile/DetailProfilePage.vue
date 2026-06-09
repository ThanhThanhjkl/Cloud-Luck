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
        ><svg-mail></svg-mail>Gửi câu hỏi</b-button
      >
    </div>

    <a class="text-law cursor-pointer" @click="showPopUp = !showPopUp">
      Thông tin theo Luật Giao dịch Thương mại
    </a>

    <b-modal id="modal-popup" v-model="showPopUp"
      ><div class="header-popup">
        <h4>Thông tin giao dịch thương mại</h4>
        <p>
          Về dự án, vui lòng liên hệ chủ dự án qua
          <span>chức năng nhắn tin</span>.
        </p>
      </div>
      <div class="body-popup mt-2">
        <div class="mb-4">
          <p class="mb-0">Tên công ty</p>
          <span class="ml-3">Công ty TNHH Mẫu</span>
        </div>
        <div class="mb-4">
          <p class="mb-0">Người đại diện</p>
          <span class="ml-3">Nguyễn Văn A</span>
        </div>
        <div class="mb-4">
          <p class="mb-0">Địa chỉ kinh doanh</p>
          <span class="ml-3">123 Đường ABC, Quận 1, TP.HCM</span>
        </div>
        <div class="mb-4">
          <p class="mb-0">Số điện thoại</p>
          <span class="ml-3">0123456789</span>
        </div>
        <div class="mb-4">
          <p class="mb-0">Các yêu cầu khác ngoài thanh toán</p>
          <span class="ml-3">Không có</span>
        </div>
        <div class="mb-4">
          <p class="mb-0">Lưu ý khác</p>
          <span class="ml-3"
            >Vui lòng kiểm tra trang dự án và phần gói hỗ trợ để biết thêm chi
            tiết.
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
