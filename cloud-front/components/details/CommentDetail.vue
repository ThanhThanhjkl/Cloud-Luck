<template>
  <div v-if="comment" class="commenter comment-thread">
    <b-img
      v-if="comment.account.image && comment.account.image.id"
      fluid
      :src="imageSource(comment.account.image.id)"
    />
    <b-img v-else fluid src="@/assets/img/avatar-iframe.png"></b-img>
    <div>
      <div class="comment-body">
        {{ comment.message }}
      </div>
      <div>
        <div class="profile-name">
          <a>{{ comment.account?.id }}</a>
        </div>
        <div class="profile-date text-secondary">
          {{ comment.updatedAt | fullDateTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const accountMapper = createNamespacedHelpers("account");

export default {
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
  },

  methods: {
    ...accountMapper.mapActions(["getAccountDetail"]),

    imageSource(id) {
      return `${process.env.consumerApiUrl}/file/${id}`;
    },
  },
};
</script>
