<template>
  <div :class="{ logged: user }" class="header app-header">
    <b-container fluid="xl">
      <b-row class="m-md-0">
        <div class="company-name">
          <div class="d-flex align-items-center">
            <nuxt-link to="/" class="header-title">CLOUDFunding</nuxt-link>
            <div class="header-subtitle">
              Let's create a place and make our dreams come true.
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
                placeholder="Keyword search"
                @keyup.enter="onSearchCampaign"
              />
            </div>

            <b-dropdown
              v-if="user"
              size="lg"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template #button-content>
                <SvgUser></SvgUser>
              </template>
              <b-dropdown-item>
                <nuxt-link :to="`/account/${user.id}`">MY ACCOUNT</nuxt-link>
              </b-dropdown-item>
              <b-dropdown-item @click="onLogout">
                <a>ログアウト</a>
              </b-dropdown-item>
            </b-dropdown>

            <!-- <nuxt-link
              v-else
              class="btn-login"
              to="/auth/login"
              @click.native="onLogout"
            >
              <SvgLogout></SvgLogout>
              Logot
            </nuxt-link> -->

            <b-button
              type="submit"
              variant="primary"
              block
              class="btn-login"
              @click="onLogout"
              ><SvgLogout></SvgLogout>Login</b-button
            >
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
    ...mapState(["user", "account"]),

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
      try {
        await this.accountLogout("thanhnv@lgcns.com");
        // this.$router.push("/auth/login");
      } catch (error) {
        this.$toast.error("Logout failed. Please try again.");
      }
    },

    onSearchCampaign() {
      this.getCampaigns({ keyword: this.keyword });
    },
  },
};
</script>
<style lang="scss" scoped></style>
