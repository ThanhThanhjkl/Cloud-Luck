<template>
  <div class="changeinfo detail">
    <FormAddress
      v-if="address && address.id"
      :address="address"
      prefix="editAddressRequest"
      @submit="onUpdateAddress"
    ></FormAddress>
  </div>
</template>
<script>
import { cloneDeep } from "lodash";
import FormAddress from "@/components/profile/changeinfo/FormAddress";
export default {
  components: {
    FormAddress,
  },

  layout: "auth",

  data() {
    return {
      address: null,
    };
  },
  computed: {},
  async mounted() {
    if (this.$route.params.address) {
      this.address = cloneDeep(this.$route.params.address);
    } else {
      await this.getAccountAddress(this.$route.params.id);

      const detailAddress = this.accountAddress.find((item) => {
        return item.id === this.$route.params.addressId;
      });

      this.address = cloneDeep(detailAddress);
    }
  },

  methods: {
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
