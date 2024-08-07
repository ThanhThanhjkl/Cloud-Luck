<template>
  <div class="changeinfo detail">
    <FormAddress
      :address="accountAddressDetail"
      @submit="onUpdateAddress"
    ></FormAddress>
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

  data() {
    return {};
  },

  computed: {
    ...mapState(["accountAddressDetail", "userId"]),
    accountId() {
      return this.userId;
    },
  },

  async mounted() {
    await this.getAccountAddress(this.$route.params.addressId);
  },

  methods: {
    ...mapActions(["getAccountAddress", "updateAccountAddress"]),
    async onUpdateAddress(payload) {
      try {
        payload.accountId = this.accountId;
        payload.id = this.accountAddressDetail.id;
        await this.updateAccountAddress(payload);
        this.$toast.success("成功");
        this.$router.push(`/account/${this.$route.params.id}/address`);
      } catch {}
    },
  },
};
</script>
<style lang="scss" scoped>
.container-xl {
  margin-bottom: 60px;
}
</style>
