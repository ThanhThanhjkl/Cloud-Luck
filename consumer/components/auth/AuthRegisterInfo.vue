<template>
  <div>
    <b-card class="register-info">
      <div class="form-title text-center">マイページ</div>
      <div class="register-info-form">
        <div class="settings-list">
          <div v-for="(item, index) in menu" :key="index" class="item-info">
            <nuxt-link
              class="menu-item"
              :class="{ active: path.includes(item.url) }"
              :to="`/account/${account ? account.id : 1}/${item.url}`"
              ><span>{{ item.title }}</span></nuxt-link
            >
          </div>
        </div>
        <div class="text-right">
          <nuxt-link to="/with_drawal" class="note-info">
            kokodeTUKURU を退会する
          </nuxt-link>
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("account");

export default {
  data() {
    return {
      menu: [
        { id: 1, title: "プロフィール編集", url: "profile" },
        { id: 2, title: "パスワード設定", url: "password" },
        { id: 3, title: "お届け先の住所", url: "address" },
        {
          id: 4,
          title: "メール設定",
          url: "email",
        },
        { id: 5, title: "応援履歴", url: "donation" },
        {
          id: 6,
          title: "クレジットカード\n情報",
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
    ...mapState(["account"]),
    path() {
      return this.$route.path;
    },
  },
};
</script>
