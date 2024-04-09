<template>
  <AuthLogin></AuthLogin>
</template>

<script>
import AuthLogin from "@/components/auth/AuthLogin";

import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("auth");

export default {
  components: { AuthLogin },

  layout(context) {
    return "auth";
  },

  async mounted() {
    const token = this.$route.query.token;
    if (token) {
      try {
        await this.accountActivate({ token });
        this.$router.push("/auth/registeration/complete");
      } catch (error) {
        this.$router.push("/auth/registeration");
        this.$toasted.error("トークン正しくありません");
      }
    }
  },

  methods: {
    ...mapActions(["accountActivate"]),
  },
};
</script>
