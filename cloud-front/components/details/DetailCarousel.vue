<template>
  <b-card class="detail-carousel">
    <div>
      <!-- Chỉ có 1 ảnh: hiển thị ảnh đơn, không carousel -->
      <div v-if="validImages.length === 0">
        <img
          class="d-block img-fluid w-100"
          width="1024"
          height="480"
          :src="mainImage"
          alt="image slot"
        />
      </div>

      <!-- Nhiều ảnh: hiển thị carousel -->
      <b-carousel v-else controls indicators>
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
          v-for="(item, imageIndex) in validImages"
          :key="imageIndex"
        >
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              :src="formatImage(item)"
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

  computed: {
    validImages() {
      if (!this.images) return [];
      return this.images.filter((item) => {
        if (!item) return false;
        // Loại bỏ item chỉ là prefix rỗng như "data:image/png;base64" không có data
        const stripped = item.replace(/^data:image\/[a-z]+;base64,?/, "");
        return stripped.length > 0;
      });
    },
  },

  mounted() {},

  methods: {
    formatImage(item) {
      if (!item) return "";
      if (item.startsWith("data:image")) {
        return item;
      }
      return "data:image/jpeg;base64," + item;
    },
  },
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
