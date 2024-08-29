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
        <div class="mt-3">
          {{ suport.suportContent }}
        </div>
        <div
          v-if="Number(accountId) === suport.accountId"
          class="btn-comment"
          style="text-align: left"
        >
          <button type="button" @click="deleteComment(comment.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const authMapper = createNamespacedHelpers("auth");
export default {
  props: {
    suport: {
      type: Object,
      default: () => {},
    },
    // deleteComment: {
    //   type: Function,
    //   default: () => {},
    // },
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

  async mounted() {
    const res = await this.getAccount(this.suport.accountId);
    this.name = res.name;
    this.avatar = "data:image/jpeg;base64," + res.avatar;
  },

  methods: {
    ...authMapper.mapActions(["getAccount"]),
  },
};
</script>
