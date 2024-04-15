<template>
  <b-card v-if="product" class="detail-carousel">
    <div>
      <b-carousel v-if="product" controls indicators>
        <b-carousel-slide v-if="playVideo">
          <template #img>
            <iframe
              width="100%"
              height="480px"
              :src="`https://www.youtube.com/watch?v=apKEWKNEj7E`"
              frameborder="0"
              allowfullscreen
            ></iframe>
          </template>
        </b-carousel-slide>

        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src=""
              alt="image slot"
            />
          </template>
        </b-carousel-slide>

        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="imageSource(item.id)"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>
      </b-carousel>
      <b-card-text class="d-none d-lg-block mt-2">
        {{ product.name }}
      </b-card-text>
    </div>
  </b-card>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("home");

export default {
  props: {
    large: Boolean,
  },

  data() {
    return {
      playVideo: false,
      videoId: "",
    };
  },

  computed: {
    ...mapState(["product"]),
  },

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
