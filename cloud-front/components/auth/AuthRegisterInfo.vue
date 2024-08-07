<template>
  <div>
    <b-card class="register-info">
      <div class="form-title text-center">MY ACCOUNT</div>
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
            Withdraw from CloudFunding
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
        { id: 1, title: "Edit profile", url: "profile" },
        { id: 2, title: "Password setting", url: "password" },
        { id: 3, title: "Shipping Address", url: "address" },
        {
          id: 4,
          title: "Project settings",
          url: "project",
        },
        { id: 5, title: "Funding history", url: "donation" },
        {
          id: 6,
          title: "Funded List Your Project",
          url: "card",
        },
      ],
      products: [
        {
          id: 1,
          img: require("@/assets/img/img_product.png"),
          title:
            "フェーズフリーというコンセプトから生まれた本当に使える浄水器「SESERA」",
          order_date: "2022/12/31 06:48",
          money: "¥123,456（税込）",
          payment_status: "yes",
        },
        {
          id: 2,
          img: require("@/assets/img/img_product.png"),
          title:
            "フェーズフリーというコンセプトから生まれた本当に使える浄水器「SESERA」",
          order_date: "2022/12/31 06:48",
          money: "¥123,456（税込）",
          payment_status: "no",
        },
      ],
      prefs: [
        { value: null, text: "選択" },
        { value: 1, text: "東京都" },
      ],
      previewImage: null,
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
