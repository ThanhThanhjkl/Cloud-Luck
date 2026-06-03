<template>
  <div>
    <b-card class="register-info">
      <div class="form-title text-center">Tài khoản của tôi</div>
      <div class="register-info-form">
        <div class="settings-list">
          <div v-for="(item, index) in menu" :key="index" class="item-info">
            <nuxt-link
              class="menu-item"
              :class="{ active: path.includes(item.url) }"
              :to="`/account/${accountId}/${item.url}`"
              ><span>{{ item.title }}</span></nuxt-link
            >
          </div>
        </div>
        <div class="text-right">
          <nuxt-link to="/with_drawal" class="note-info">
            Rút khỏi CloudFunding
          </nuxt-link>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
export default {
  data() {
    return {
      menu: [
        { id: 1, title: "Chỉnh sửa hồ sơ", url: "profile" },
        { id: 2, title: "Cài đặt mật khẩu", url: "password" },
        { id: 3, title: "Địa chỉ nhận hàng", url: "address" },
        {
          id: 4,
          title: "Cài đặt dự án",
          url: "project",
        },
        { id: 5, title: "Lịch sử ủng hộ", url: "funding" },
        {
          id: 6,
          title: "Danh sách ủng hộ dự án của bạn",
          url: "funded",
        },
      ],
    };
  },

  computed: {
    ...mapState(["userId"]),
    path() {
      return this.$route.path;
    },
    accountId() {
      if (this.userId) {
        return this.userId;
      } else {
        return null;
      }
    },
  },
};
</script>
