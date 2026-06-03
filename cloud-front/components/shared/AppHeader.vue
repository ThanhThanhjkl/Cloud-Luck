<template>
  <div :class="{ logged: isAuthenticated }" class="header app-header">
    <b-container fluid="xl">
      <b-row class="m-md-0">
        <div class="company-name">
          <div class="d-flex align-items-center">
            <nuxt-link to="/" class="header-title">CLOUDFunding</nuxt-link>
            <div class="header-subtitle">
              Cùng tạo nên nơi biến ước mơ thành hiện thực.
            </div>
          </div>
        </div>

        <div class="search-bar">
          <div class="header-actions">
            <div v-if="searchAble" class="action">
              <svg-search></svg-search>
              <input
                v-model="keyword"
                type="search"
                placeholder="Tìm kiếm từ khóa"
                @keyup.enter="onSearchCampaign"
              />
            </div>

            <b-dropdown
              v-if="isAuthenticated"
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <SvgUser></SvgUser>
              </template>
              <b-dropdown-item>
                <nuxt-link :to="`/account/${accountId}`">Tài khoản của tôi</nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item @click="onLogout">
                <a>Đăng xuất</a>
              </b-dropdown-item>
            </b-dropdown>

            <nuxt-link v-else to="/auth/login" class="btn-login">
              <SvgLogout></SvgLogout>
              Đăng nhập
            </nuxt-link>
          </div>
        </div>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import SvgSearch from "@/components/common/svg/SvgSearch";
import primaryMenu from "@/helpers/primaryMenu";
import SvgLogout from "@/components/common/svg/SvgLogout";
import SvgUser from "@/components/common/svg/SvgUser";

const { mapState, mapActions } = createNamespacedHelpers("auth");
const campaignMapper = createNamespacedHelpers("home");
export default {
  components: {
    SvgSearch,
    SvgLogout,
    SvgUser,
  },

  data() {
    return {
      keyword: "",
      primaryTree: primaryMenu,
    };
  },

  computed: {
    ...mapState(["userId", "token", "account"]),

    isAuthenticated() {
      return Boolean(this.userId || this.token);
    },

    accountId() {
      return this.userId;
    },

    searchAble() {
      return this.$route.name === "index";
    },
  },

  watch: {
    keyword(value) {
      if (!value) {
        this.getCampaigns({ keyword: null });
      }
    },
  },

  methods: {
    ...mapActions(["accountLogout"]),
    ...campaignMapper.mapActions(["getCampaigns"]),

    async onLogout() {
      await this.accountLogout();
      this.$router.push("/auth/login");
    },

    onSearchCampaign() {
      this.getCampaigns({ keyword: this.keyword });
    },
  },
};
</script>
<style lang="scss" scoped></style>
