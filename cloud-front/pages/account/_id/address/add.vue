<template>
  <div class="changeinfo detail">
    <FormAddress @submit="onCreateAddress"></FormAddress>
  </div>
</template>
<script>
import FormAddress from "@/components/profile/changeinfo/FormAddress";

export default {
  components: {
    FormAddress,
  },

  layout: "auth",

  computed: {},

  methods: {
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
