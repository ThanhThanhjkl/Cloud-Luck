<template>
  <div class="pt-md-5">
    <ProfilePage :account="account" />
  </div>
</template>

<script>
import ProfilePage from "@/components/profile/ProfilePage.vue";
import { createNamespacedHelpers, mapActions } from "vuex";
const { mapState } = createNamespacedHelpers("auth");

export default {
  name: "IndexPage",
  components: {
    ProfilePage,
  },

  computed: {
    ...mapState(["userId", "account"]),
    accountId() {
      return this.userId;
    },
  },

  mounted() {
    this.getAccount(this.accountId);
  },

  methods: {
    ...mapActions(["getAccount"]),
  },
};
</script>
