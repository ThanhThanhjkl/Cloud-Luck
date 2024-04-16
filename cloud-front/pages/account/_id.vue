<template>
  <div class="changeinfo">
    <AuthRegisterInfo class="mb-4"></AuthRegisterInfo>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import AuthRegisterInfo from "@/components/auth/AuthRegisterInfo";
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("auth");
export default {
  components: { AuthRegisterInfo },

  layout: "auth",

  computed: {
    ...mapState(["userId"]),
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
