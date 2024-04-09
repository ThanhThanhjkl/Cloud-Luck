<template>
  <div class="customer-layout">
    <AppTopbar></AppTopbar>
    <AppHeader></AppHeader>
    <nuxt />
    <AppFooterLayout></AppFooterLayout>
  </div>
</template>

<script>
import AppTopbar from "@/components/shared/AppTopbar";
import AppHeader from "@/components/shared/AppHeader.vue";
import AppFooterLayout from "@/components/shared/AppFooterLayout";

export default {
  components: {
    AppTopbar,
    AppHeader,
    AppFooterLayout,
  },
};
</script>
<style lang="scss" scoped>
.customer-layout {
  display: flex;
  flex-direction: column;
  background-color: $bg-primary;
}
</style>
