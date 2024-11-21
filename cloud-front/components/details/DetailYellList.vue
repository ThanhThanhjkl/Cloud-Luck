<template>
  <div class="card">
    <div class="card-header">
      <b-avatar>
        <b-img fluid :src="avatar" />
      </b-avatar>
      <div>
        <div>
          <div class="profile-name">
            <a href="#">{{ name }}</a>
          </div>
          <div class="profile-date text-secondary">
            {{ suport.date | fullDateTime }}
          </div>
        </div>
        <div>
          {{ suport.suportContent }}
        </div>
        <button
          v-if="Number(accountId) === suport.accountId"
          type="button"
          class="btn-delete-support mt-3"
          @click="deleteSuport(suport.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const authMapper = createNamespacedHelpers("auth");
const { mapActions } = createNamespacedHelpers("home");
export default {
  props: {
    suport: {
      type: Object,
      default: () => {},
    },

    accountId: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      name: null,
      avatar: null,
    };
  },

  computed: {
    projectId() {
      return this.$route.params.id;
    },
  },

  async mounted() {
    const res = await this.getAccount(this.suport.accountId);
    this.name = res.name;
    this.avatar = "data:image/jpeg;base64," + res.avatar;
  },

  methods: {
    ...authMapper.mapActions(["getAccount"]),
    ...mapActions(["deleteSupportById", "getSuportsByProductId"]),

    deleteSuport(id) {
      this.deleteSupportById(id).then((res) => {
        this.getSuportsByProductId(this.projectId);
        this.$toast.success(res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-delete-support {
  border: medium none currentcolor;
  border: initial;
  background: #466cb0 0% 0% no-repeat padding-box;
  border-radius: 4px;
  opacity: 1;
  padding: 5px 10px;
  color: white;
}
</style>
