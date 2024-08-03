<template>
  <div class="changeinfo detail">
    <FormAddress @submit="onCreateAddress"></FormAddress>
  </div>
</template>
<script>
import FormAddress from "@/components/profile/changeinfo/FormAddress";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("auth");

export default {
  components: {
    FormAddress,
  },

  layout: "auth",

  computed: {
    ...mapState(["userId"]),
    accountId() {
      return this.userId;
    },
  },

  methods: {
    ...mapActions(["createAccountAddress"]),
    async onCreateAddress(address) {
      try {
        address.accountId = this.accountId;
        await this.createAccountAddress(address);
        this.$toast.success("成功");
        this.$router.push(`/account/${this.accountId}/address`);
      } catch (error) {
        this.$toast.error(error.message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container-xl {
  margin-bottom: 60px;
}
</style>
