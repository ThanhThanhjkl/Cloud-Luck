<template>
  <div class="changeinfo detail">
    <AuthRegisterInfo class="mb-4"></AuthRegisterInfo>
    <FormAddress @submit="onCreateAddress"></FormAddress>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import AuthRegisterInfo from "@/components/auth/AuthRegisterInfo";
import FormAddress from "@/components/profile/changeinfo/FormAddress";
const { mapActions } = createNamespacedHelpers("account/address");
const accountMapper = createNamespacedHelpers("account");

export default {
  components: {
    FormAddress,
    AuthRegisterInfo,
  },

  layout: "auth",

  computed: {
    ...accountMapper.mapState(["account"]),
  },

  methods: {
    ...mapActions(["createAccountAddress"]),
    async onCreateAddress(address) {
      try {
        await this.createAccountAddress({
          accountId: this.account.id,
          params: address,
        });
        this.$toast.success("成功");
        this.$router.push(`/account/${this.account.id}/address`);
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
