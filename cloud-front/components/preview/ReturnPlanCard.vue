<template>
  <b-card v-if="item" class="return-plan-card">
    <template #header>
      <b-carousel v-if="item.images">
        <b-carousel-slide
          v-for="image in isImages(item.images)"
          :key="image.id"
          class="w-100"
        >
          <template #img>
            <img class="w-100" :src="imageSource(image.id)" />
          </template>
        </b-carousel-slide>
      </b-carousel>
    </template>
    <h4>{{ item.title }}</h4>
    <div class="row no-gutters align-items-center">
      <div class="price">{{ item.amount | japanMoney }}</div>
      <div class="users">
        残り：{{ item.stockQuantity | numberFormat }}人まで
      </div>
    </div>

    <div class="px-3 d-flex justify-content-center">
      <a class="w-100 btn btn-crimson" block>このリターンを選択する </a>
    </div>

    <div class="card-text">{{ item.bio }}</div>

    <b-card-sub-title>
      <label>サポーター</label>
      <strong>{{ "0" | numberFormat }}人</strong>
      <label>お届け予定</label>
      <strong>{{ item.arrivalDate | japanDate }}</strong>
    </b-card-sub-title>
  </b-card>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    imageSource(id) {
      return `${process.env.consumerApiUrl}/file/${id}`;
    },
    isImages(listImages) {
      return listImages.filter((item) => item.id !== "");
    },
  },
};
</script>
