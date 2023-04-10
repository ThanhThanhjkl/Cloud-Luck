<template>
  <div class="mt-2">
    <ConsultationCompany />
  </div>
</template>

<script>
import ConsultationCompany from "@/components/consultation/ConsultationCompany.vue";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("business/application");
const authMapper = createNamespacedHelpers("auth");

export default {
  components: {
    ConsultationCompany,
  },
  layout: "default",

  computed: {
    ...authMapper.mapState(["user"]),
  },

  mounted() {
    if (this.user && this.user.id == null) {
      this.$router.push("/auth/login");
    }
    this.getApplication();
  },

  methods: {
    ...mapActions(["getApplication"]),
  },
};
</script>
