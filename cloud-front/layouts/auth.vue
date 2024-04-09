<template>
  <div class="auth-layout">
    <AppTopbarLayout></AppTopbarLayout>
    <AppHeader></AppHeader>
    <div id="main" class="mt-4">
      <b-container fluid="xl">
        <nuxt></nuxt>
      </b-container>
    </div>
    <AppFooter></AppFooter>
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
};
</script>

<style lang="scss" scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-flow: column;

  #main {
    margin-top: 24px;
    padding-bottom: 80px;
    min-height: calc(100vh - 400px);

    @include max-width(md) {
      padding: 150px 0;
      margin-top: 60px;
    }

    .container-fluid {
      max-width: 490px;
    }
    @include max-width(md) {
      margin-top: 0;
      padding: 0 0 50px 0;
    }
  }
}
</style>
