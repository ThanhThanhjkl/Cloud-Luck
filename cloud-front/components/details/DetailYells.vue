<template>
  <div class="owner-card owner-card-list">
    <div v-if="Number(accountId) === product.account_id" class="comment-box">
      <b-textarea
        v-model="suportContent"
        cols="45"
        rows="8"
        maxlength="65525"
        class="comment-input"
        type="text"
        placeholder="Post your thoughts and support about the project"
      />
      <div class="btn-comment">
        <button type="button" @click="submitSuport">To Support</button>
        <a class="about-comment-btn text-primary">※ About Support</a>
      </div>
    </div>

    <DetailYellList
      v-for="suport in suports"
      :key="suport.id"
      :suport="suport"
      :account-id="accountId"
    />
  </div>
</template>
<script>
import DetailYellList from "@/components/details/DetailYellList";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");
export default {
  components: {
    DetailYellList,
  },
  data() {
    return {
      suportContent: "",
    };
  },

  computed: {
    ...mapState(["suports", "product"]),
    ...authMapper.mapState(["userId"]),
    projectId() {
      return this.$route.params.id;
    },
    accountId() {
      return this.userId;
    },
  },

  async mounted() {
    await this.getSuportsByProductId(this.projectId);
  },

  methods: {
    ...mapActions(["getSuportsByProductId", "createSuport"]),
    async submitSuport() {
      if (this.suportContent && this.projectId) {
        const params = {
          suportContent: this.suportContent,
          productId: Number(this.projectId),
          accountId: Number(this.accountId),
        };
        await this.createSuport(params);
        this.getSuportsByProductId(this.projectId);
        this.suportContent = "";
      }
    },
  },
};
</script>
