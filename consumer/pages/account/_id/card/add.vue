<template>
  <div class="changeinfo detail">
    <AuthRegisterInfo class="mb-4"></AuthRegisterInfo>
    <div id="register-setting-2" class="shipping-address">
      <CreditCard></CreditCard>
    </div>
  </div>
</template>

<script>
import AuthRegisterInfo from "@/components/auth/AuthRegisterInfo";
import CreditCard from "@/components/profile/changeinfo/CreditCard.vue";

export default {
  components: {
    CreditCard,
    AuthRegisterInfo,
  },

  layout: "auth",
};
</script>
<style lang="scss" scoped>
table tbody {
  tr {
    border-bottom: 1px solid #ccc;
  }
}
.btn-update {
  margin-top: 24px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
.register-setting-2 {
  form {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    @include max-width(md) {
      width: 100%;
    }
  }
}
</style>
