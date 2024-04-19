<template>
  <b-card v-if="campaign" class="detail-carousel">
    <div>
      <b-carousel controls indicators>
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
      <b-card-text class="d-none d-md-block mt-2"> ádfasdasfd˝ </b-card-text>
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
  },
  data() {
    return {
      isLiked: false,
      playVideo: false,
      videoId: "",
    };
  },

  computed: {},

  mounted() {
    console.log(this.images);
  },

  methods: {},
};
</script>
<style lang="scss" scoped>
::v-deep {
  .card-body {
    padding-bottom: 15px;
    @include min-width(md) {
      padding-top: 0;
    }
  }
}
</style>
