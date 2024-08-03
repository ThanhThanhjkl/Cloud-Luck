<template>
  <div class="container">
    <div class="list-project">
      <b-card class="card">
        <div class="form-title d-flex justify-content-between text-center">
          Editing project
          <div
            class="text-center"
            @click.prevent="
              $router.push(`/account/${$route.params.id}/project/add/`)
            "
          >
            <div class="register-now">Register new</div>
          </div>
        </div>
        <ListProject :products="myProducts" :account-id="accountId" editable />
      </b-card>
    </div>
    <div>
      <h3 class="mt-2 text-primary text-center">
        First
        <nuxt-link to="/consultation" class="text-primary">
          Project posting/consultation form
        </nuxt-link>
        Please contact us from
      </h3>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import ListProject from "./ListProject.vue";
const { mapState, mapActions } = createNamespacedHelpers("home");
const authMapper = createNamespacedHelpers("auth");

export default {
  components: {
    ListProject,
  },
  computed: {
    ...mapState(["myProducts"]),
    ...authMapper.mapState(["userId"]),
    accountId() {
      if (this.userId) {
        return this.userId;
      } else {
        return null;
      }
    },
  },

  mounted() {
    this.getProductsByAccountId(this.accountId);
  },

  methods: {
    ...mapActions(["getProductsByAccountId"]),
  },
};
</script>
