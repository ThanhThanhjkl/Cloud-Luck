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
    ...mapState(["accountAddressDetail"]),
  },

  async mounted() {
    await this.getAccountAddress(this.$route.params.addressId).then((res) => {
      this.accountAddressDetail = res;
    });
  },

  methods: {
    ...mapActions(["getAccountAddress"]),
    async onUpdateAddress(payload) {
      try {
        await this.updateAccountAddress({
          accountId: this.account.id,
          payload,
        });
        this.$toast.success("成功");
        this.$router.push(`/account/${this.$route.params.id}/address`);
      } catch (error) {}
    },
  },
};
</script>
<style lang="scss" scoped>
.container-xl {
  margin-bottom: 60px;
}
</style>
