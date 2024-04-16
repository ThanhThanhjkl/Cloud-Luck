<template>
  <div class="container">
    <div class="list-project">
      <b-card class="card">
        <div class="form-title text-center">編集中プロジェクト</div>
        <ListProject editable />
      </b-card>
    </div>
    <div>
      <h3 class="mt-2 text-primary text-center">
        まずは
        <nuxt-link to="/consultation" class="text-primary">
          プロジェクト掲載・相談フォーム
        </nuxt-link>
        からご相談ください
      </h3>
    </div>
  </div>
</template>
<script>
import ListProject from "./ListProject.vue";

export default {
  components: {
    ListProject,
  },
  computed: {},

  mounted() {},

  methods: {},
};
</script>
