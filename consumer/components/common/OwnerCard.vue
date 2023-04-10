<template>
  <div class="owner-card">
    <b-card>
      <template #header>
        <b-avatar>
          <b-img fluid :src="owner.avatar" />
        </b-avatar>
        <div>
          <div>
            <div class="profile-name">
              <a href="#">{{ owner.name }}</a>
            </div>
            <div class="profile-date text-secondary">{{ owner.time }}</div>
          </div>
          <div class="message-content">
            {{ owner.message }}
          </div>
        </div>
      </template>
    </b-card>
  </div>
</template>
<script>
export default {
  props: {
    owner: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
