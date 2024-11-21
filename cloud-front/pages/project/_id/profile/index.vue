<template>
  <div class="pt-md-5">
    <ProfilePage :account="account" />
  </div>
</template>

<script>
import ProfilePage from "@/components/profile/ProfilePage.vue";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("auth");

export default {
  name: "IndexPage",
  components: {
    ProfilePage,
  },

  computed: {
    ...mapState(["account"]),
    accountId() {
      return this.$route.query.id;
    },
  },

  async mounted() {
    await this.getAccount(this.accountId);
  },

  methods: {
    ...mapActions(["getAccount"]),
  },
};
</script>
