<template>
  <b-container class="page-detail skeleton-detail" fluid="xl">
    <!-- Alert message skeleton -->
    <div class="box alert-message">
      <div class="box-header">
        <SkeletonBox width="200px" height="20px" />
      </div>
      <div class="box-body">
        <SkeletonBox width="60%" height="18px" />
      </div>
    </div>

    <div class="page-detail-content">
      <!-- Left content -->
      <section class="left-content">
        <div class="d-none mb-3 d-lg-block text-center">
          <SkeletonBox width="70%" height="24px" />
        </div>

        <section class="d-grid g-32">
          <!-- Carousel skeleton -->
          <b-card class="detail-carousel">
            <SkeletonBox width="100%" height="320px" radius="8px" />
            <div class="d-none d-lg-block mt-2">
              <SkeletonBox width="80%" height="16px" />
            </div>
          </b-card>

          <!-- Summary skeleton (mobile) -->
          <div class="right-content d-md-none">
            <DetailSummarySkeleton />
          </div>

          <!-- Tabs skeleton -->
          <div class="right-section">
            <section class="section-tabs">
              <div class="product-body col-12 p-0">
                <div class="d-none d-lg-block section-header">
                  <SkeletonBox width="180px" height="22px" />
                  <SkeletonBox width="120px" height="16px" class="mt-1" />
                </div>
                <div class="tabs mt-3">
                  <div class="d-flex gap-3">
                    <SkeletonBox width="80px" height="36px" />
                    <SkeletonBox width="80px" height="36px" />
                    <SkeletonBox width="100px" height="36px" />
                    <SkeletonBox width="80px" height="36px" />
                  </div>
                </div>
                <!-- Article skeleton -->
                <b-card class="mt-3">
                  <SkeletonBox width="50%" height="20px" />
                  <div class="mt-3">
                    <SkeletonBox width="100%" height="14px" class="mb-2" />
                    <SkeletonBox width="100%" height="14px" class="mb-2" />
                    <SkeletonBox width="90%" height="14px" class="mb-2" />
                    <SkeletonBox width="95%" height="14px" class="mb-2" />
                    <SkeletonBox width="70%" height="14px" />
                  </div>
                </b-card>
              </div>
            </section>
          </div>
        </section>
      </section>

      <!-- Right content -->
      <section class="right-content">
        <!-- Summary skeleton (desktop) -->
        <DetailSummarySkeleton class="d-none d-md-block" />

        <!-- Project Owner skeleton -->
        <section class="project-owner">
          <div class="section-header">
            <SkeletonBox width="160px" height="20px" />
            <SkeletonBox width="100px" height="14px" class="mt-1" />
          </div>
          <b-card class="owner-section">
            <div class="d-flex align-items-center mb-3">
              <SkeletonBox width="48px" height="48px" rounded />
              <div class="ml-3" style="flex: 1">
                <SkeletonBox width="120px" height="16px" />
              </div>
            </div>
            <SkeletonBox width="180px" height="14px" class="mb-2" />
            <SkeletonBox width="200px" height="14px" />
          </b-card>
        </section>

        <!-- Return Plan skeleton -->
        <section class="return-plan">
          <div class="section-header">
            <SkeletonBox width="120px" height="20px" />
            <SkeletonBox width="100px" height="14px" class="mt-1" />
          </div>
          <div class="d-grid g-16">
            <ReturnPlanSkeleton />
            <ReturnPlanSkeleton />
          </div>
        </section>
      </section>
    </div>
  </b-container>
</template>

<script>
import SkeletonBox from "@/components/common/SkeletonBox.vue";

const DetailSummarySkeleton = {
  components: { SkeletonBox },
  template: `
    <b-card class="card-infor">
      <div class="mb-3 d-block d-md-none">
        <SkeletonBox width="70%" height="20px" />
      </div>
      <div class="mb-3">
        <SkeletonBox width="140px" height="12px" class="mb-1" />
        <SkeletonBox width="180px" height="32px" />
      </div>
      <div class="mb-3">
        <SkeletonBox width="100px" height="12px" class="mb-1" />
        <SkeletonBox width="100%" height="20px" radius="10px" />
      </div>
      <div class="mb-3">
        <SkeletonBox width="100px" height="12px" class="mb-1" />
        <SkeletonBox width="120px" height="28px" />
      </div>
      <div class="mb-3">
        <SkeletonBox width="160px" height="14px" class="mb-1" />
        <SkeletonBox width="80px" height="28px" />
      </div>
      <div>
        <SkeletonBox width="150px" height="14px" />
      </div>
    </b-card>
  `,
};

const ReturnPlanSkeleton = {
  components: { SkeletonBox },
  template: `
    <b-card class="return-plan-card">
      <SkeletonBox width="100%" height="160px" radius="8px" class="mb-3" />
      <SkeletonBox width="60%" height="18px" class="mb-2" />
      <SkeletonBox width="100px" height="22px" class="mb-3" />
      <SkeletonBox width="100%" height="38px" radius="4px" class="mb-3" />
      <SkeletonBox width="100%" height="14px" class="mb-1" />
      <SkeletonBox width="80%" height="14px" />
    </b-card>
  `,
};

export default {
  components: {
    SkeletonBox,
    DetailSummarySkeleton,
    ReturnPlanSkeleton,
  },
};
</script>

<style lang="scss" scoped>
.skeleton-detail {
  .box-body {
    padding: 15px;
  }
  .gap-3 {
    gap: 12px;
    display: flex;
  }
  .mb-1 {
    margin-bottom: 4px;
  }
  .mb-2 {
    margin-bottom: 8px;
  }
  .mb-3 {
    margin-bottom: 16px;
  }
  .mt-1 {
    margin-top: 4px;
  }
  .mt-3 {
    margin-top: 16px;
  }
  .ml-3 {
    margin-left: 16px;
  }
}
</style>
