<template>
  <b-card class="detail-carousel">
    <div>
      <b-carousel controls indicators>
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              :src="mainImage"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>
        <b-carousel-slide
          v-for="(item, imageIndex) in images"
          :key="imageIndex"
        >
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              :src="'data:image/jpeg;base64,' + item"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>
      </b-carousel>
      <b-card-text class="d-none d-lg-block mt-2">
        {{ name }}
      </b-card-text>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: "",
    },
    mainImage: {
      type: String,
      default: "",
    },
  },

  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {},
};
</script>
<style lang="scss" scoped>
::v-deep {
  .card-body {
    padding: 0;
    padding-bottom: 15px;
  }
}
</style>
