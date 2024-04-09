<template>
  <div>
    <div>
      <b-card class="detail-article">
        <template #header>
          <b-card-title>
            {{ report.title }}
          </b-card-title>
        </template>

        <div class="ql-editor" v-html="report.body"></div>
      </b-card>

      <div class="btn group-btn">
        <b-button class="btn-fall mr-3 col-5" @click="viewReportList">
          <span>活動報告の一覧を見る</span>
        </b-button>

        <b-button class="btn-fall col-5" @click="viewProjectPage">
          <span>プロジェクトページを見る</span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    report: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    projectId() {
      return this.$route.params.projectId;
    },
  },

  methods: {
    viewReportList() {
      // this.$router.push(`/project/${this.projectId}/note`);
      return false;
    },
    viewProjectPage() {
      // this.$router.push(`/project/${this.projectId}`);
      return false;
    },
  },
};
</script>
