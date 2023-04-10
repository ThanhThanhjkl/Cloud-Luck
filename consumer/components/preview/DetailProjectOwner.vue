<template>
  <b-card v-if="account" class="owner-section">
    <template #header>
      <b-avatar>
        <b-img
          v-if="account.image && account.image.id"
          fluid
          :src="imageSource(account.image.id)"
        />
      </b-avatar>

      <div>
        <div class="profile-name text-break">{{ account.name }}</div>
      </div>
    </template>
    <div>
      {{ account.bio }}
      <div v-if="account.url" class="mt-2">
        URL: <a class="text-primary" :href="account.url">{{ account.url }}</a>
      </div>
    </div>
  </b-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("account");

export default {
  computed: {
    ...mapState(["account"]),
  },

  methods: {
    imageSource(id) {
      return `${process.env.businessApiUrl}/file/${id}`;
    },
  },
};
</script>
