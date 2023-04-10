<template>
  <div>
    <AppTopbarLayout></AppTopbarLayout>
    <AppHeader></AppHeader>
    <div class="main-layout">
      <nuxt />
    </div>
    <AppFooter :simple="isSimpleLayout"></AppFooter>
  </div>
</template>

<script>
import AppTopbarLayout from "@/components/shared/AppTopbarLayout";
import AppHeader from "@/components/shared/AppHeader";
import AppFooter from "@/components/shared/AppFooter";

export default {
  components: {
    AppTopbarLayout,
    AppHeader,
    AppFooter,
  },

  computed: {
    routePath() {
      return this.$route.fullPath;
    },

    isSimpleLayout() {
      const requireSimpleFooterPages = [
        "overview",
        "visual",
        "body",
        "return",
        "identifications",
        "buy/confirm",
        "buy",
      ];

      return requireSimpleFooterPages.some((e) => this.routePath.includes(e));
    },
  },
};
</script>

<style lang="scss" scoped>
.main-layout {
  min-height: calc(100vh - 100px - 400px);
}
</style>
