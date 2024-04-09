<template>
  <div>
    <AppTopbarLayout></AppTopbarLayout>
    <AppHeader></AppHeader>
    <nuxt />
    <AppFooter simple></AppFooter>
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

  data() {
    return {
      simple: true,
    };
  },
};
</script>
