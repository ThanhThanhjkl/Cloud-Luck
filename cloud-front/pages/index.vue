<template>
  <div class="page-home">
    <HomePageContent />
  </div>
</template>

<script>
import HomePageContent from "@/components/HomePageContent";

export default {
  name: "IndexPage",

  layout: "consumer",

  components: {
    HomePageContent,
  },
};
</script>
