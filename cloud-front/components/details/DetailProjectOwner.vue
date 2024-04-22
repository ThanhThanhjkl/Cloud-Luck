<template>
  <section class="project-owner">
    <div class="section-header">
      <h2 class="section-title">PROJECT OWNER</h2>
      <h4 class="section-subtitle">project owner</h4>
    </div>

    <b-card class="owner-section">
      <template #header>
        <b-avatar class="cursor-pointer" @click="seeProfile">
          <b-img fluid :src="avatar" />
        </b-avatar>

        <div class="profile">
          <div
            class="profile-name cursor-pointer text-break"
            @click="seeProfile"
          >
            {{ name }}
          </div>
        </div>
      </template>
      <div>
        {{ email }}
        <div class="mt-2">
          URL:
          <a href="currentCampaignAccount.url">{{ url }} </a>
        </div>
      </div>
    </b-card>
  </section>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("auth");
export default {
  props: {
    product: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showPopUp: false,
      avatar: "",
      email: "",
      name: "",
      url: "",
    };
  },

  computed: {
    ...mapState(["account"]),
    accountId() {
      return this.product.account_id;
    },
  },

  async mounted() {
    await this.getAccount(this.accountId);
    this.email = this.account.email;
    this.name = this.account.name;
    this.url = this.account.url;
    this.avatar = "data:image/jpeg;base64," + this.account.avatar;
  },

  methods: {
    ...mapActions(["getAccount"]),
    seeProfile() {
      const params = this.$route.params.id;
      this.$router.push({
        path: `/project/${params}/profile`,
        query: { id: this.accountId },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.profile {
  max-width: calc(100% - 56px);
}
</style>
