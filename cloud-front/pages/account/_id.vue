<template>
  <div :class="{ changeinfo: !route.includes('project') }">
    <AuthRegisterInfo class="mb-4"></AuthRegisterInfo>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import AuthRegisterInfo from "@/components/auth/AuthRegisterInfo";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("account");
const authMapper = createNamespacedHelpers("auth");

export default {
  components: { AuthRegisterInfo },

  layout: "auth",

  computed: {
    ...mapState(["account"]),
    ...authMapper.mapState(["user"]),
    isIndex() {
      return this.$route.name === "account-id";
    },
    route() {
      return this.$route.name;
    },
  },

  mounted() {
    try {
      // if (this.user) {
      //   if (this.user.id !== this.$route.params.id) {
      this.$router.push(`/account/1`);
      //   } else {
      //     this.getProfile();
      //   }
      // } else {
      //   this.$router.push("/auth/login");
      // }
    } catch (error) {
      this.$router.push("/auth/login");
    }
  },

  methods: {
    ...mapActions(["getProfile"]),
  },
};
</script>
