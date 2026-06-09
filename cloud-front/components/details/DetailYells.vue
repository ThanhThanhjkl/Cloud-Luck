<template>
  <div class="owner-card owner-card-list">
    <!-- Skeleton loading -->
    <div v-if="loading" class="skeleton-wrapper">
      <div v-for="i in 3" :key="i" class="skeleton-card mt-3">
        <div class="d-flex align-items-center">
          <SkeletonBox width="48px" height="48px" :rounded="true" />
          <div class="ml-3" style="flex: 1">
            <SkeletonBox width="30%" height="16px" />
            <SkeletonBox width="20%" height="12px" class="mt-1" />
          </div>
        </div>
        <SkeletonBox width="100%" height="14px" class="mt-2" />
        <SkeletonBox width="70%" height="14px" class="mt-1" />
      </div>
    </div>

    <!-- Content -->
    <template v-else>
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
        :account-info="accountsMap[suport.accountId]"
      />
    </template>
  </div>
</template>
<script>
import DetailYellList from "@/components/details/DetailYellList";
import SkeletonBox from "@/components/common/SkeletonBox";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");
export default {
  components: {
    DetailYellList,
    SkeletonBox,
  },
  data() {
    return {
      suportContent: "",
      loading: true,
      accountsMap: {},
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
    this.loading = true;
    await this.getSuportsByProductId(this.projectId);
    // Fetch tất cả account info cho các support
    if (this.suports && this.suports.length) {
      const results = await Promise.all(
        this.suports.map((s) => this.getAccount(s.accountId).catch(() => null))
      );
      const map = {};
      this.suports.forEach((s, i) => {
        if (results[i]) {
          map[s.accountId] = results[i];
        }
      });
      this.accountsMap = map;
    }
    this.loading = false;
  },

  methods: {
    ...mapActions(["getSuportsByProductId", "createSuport"]),
    ...authMapper.mapActions(["getAccount"]),
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
