<template>
  <div class="page-home">
    <section class="section-top">
      <div class="section-banner">
        <div class="banner-header"></div>
      </div>
    </section>
    <b-container fluid="xl">
      <section>
        <div class="section-header">
          <h2 class="section-title">
            Các Sáng Chế Mới Nhất Đã Được Cập Nhật Trên Sàn Ứng Dụng
          </h2>
          <h4 class="section-subtitle">
            Sản Phẩm Kêu Gọi Hàng Đầu Với Sự Đầu Tư Cơ Bản Đến Nâng Cao
          </h4>
          <b-form-select
            v-model="sortCampaign"
            :options="options"
            class="sort-campaign d-block mx-auto"
          ></b-form-select>
        </div>
      </section>

      <section class="section-recommend">
        <!-- Skeleton loading -->
        <div v-if="loading" class="top-list-card">
          <div class="top-1">
            <SkeletonBox width="100%" height="320px" radius="8px" />
          </div>
          <div class="top-5">
            <div v-for="i in 4" :key="i" class="skeleton-card-item">
              <SkeletonBox width="100%" height="180px" radius="8px" />
              <SkeletonBox width="70%" height="16px" class="mt-2" />
              <SkeletonBox width="40%" height="14px" class="mt-1" />
            </div>
          </div>
        </div>

        <!-- Content -->
        <div v-else-if="products.length > 0" class="top-list-card">
          <div class="top-1">
            <TopCard
              v-for="(item, index) in products.slice(0, 1)"
              :key="index"
              :item="item"
              large
              @click="$router.push(`/project/${item.id}`)"
            />
          </div>
          <div class="top-5">
            <div v-for="(item, index) in products.slice(1, 5)" :key="index">
              <TopCard
                :item="item"
                @click="$router.push(`/project/${item.id}`)"
              />
            </div>
          </div>
          <div
            v-for="(start, index) in starts"
            :key="index"
            :class="showMore ? `top-5` : `d-none`"
          >
            <div
              v-for="(item, innerIndex) in products.slice(start, start + 4)"
              :key="innerIndex"
            >
              <TopCard
                :item="item"
                @click="$router.push(`/project/${item.id}`)"
              />
            </div>
          </div>
        </div>
      </section>

      <div class="view-all">
        <b-button variant="primary" @click="seeAllProjects"
          >Xem tất cả dự án</b-button
        >
      </div>
    </b-container>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import TopCard from "@/components/common/TopCard.vue";
import SkeletonBox from "@/components/common/SkeletonBox.vue";

const { mapState, mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");
export default {
  components: {
    TopCard,
    SkeletonBox,
  },

  data() {
    return {
      options: [
        { value: 1, text: "Mới Nhất" },
        { value: 1, text: "Cũ Nhất" },
        { value: 1, text: "Giá Cao Nhất" },
        { value: 1, text: "Giá Thấp Nhất" },
      ],
      sortCampaign: 1,
      showMore: false,
      loading: true,
    };
  },

  computed: {
    ...mapState(["products"]),
    ...authMapper.mapState(["userId"]),

    accountId() {
      return this.userId;
    },

    starts() {
      const starts = [];
      for (let i = 5; i < this.products.length; i += 4) {
        starts.push(i);
      }
      return starts;
    },
  },

  async mounted() {
    this.loading = true;
    await this.getProducts({ keyword: null });
    this.loading = false;
  },

  methods: {
    ...mapActions(["getProducts"]),
    seeAllProjects() {
      this.showMore = !this.showMore;
    },
  },
};
</script>
<style lang="scss" scoped>
.section-header {
  padding-top: 20px;
}
.skeleton-card-item {
  padding: 10px;
}
.mt-2 {
  margin-top: 8px;
}
.mt-1 {
  margin-top: 4px;
}
</style>
