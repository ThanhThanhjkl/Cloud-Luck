<template>
  <div class="list-form">
    <form>
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-list"
      >
        <div class="campaign-content">
          <div class="product-info">
            <div class="product-img">
              <b-img fluid :src="product.main_image" />
            </div>
            <div class="product-info-right">
              <div class="product-title">{{ product.title }}</div>
              <div class="list-btn list-btn-pc">
                <nuxt-link
                  :to="`/account/${accountId}/project/${product.id}/`"
                  class="btn btn-primary campaigns-btn"
                  >To edit</nuxt-link
                >
                <nuxt-link
                  :to="`/project/${product.id}`"
                  class="btn btn-secondary view-project campaigns-btn"
                  >View project page</nuxt-link
                >
                <nuxt-link
                  :to="`/project/${product.id}`"
                  class="btn btn-secondary view-project campaigns-btn"
                  >Delete project page</nuxt-link
                >
              </div>
            </div>
          </div>
          <div class="list-btn-sp">
            <nuxt-link
              :to="`/account/${accountId}/project/${product.id}/`"
              class="btn btn-primary campaigns-btn"
              >To edit</nuxt-link
            >
            <nuxt-link
              :to="`/project/${product.id}`"
              class="btn btn-secondary view-project campaigns-btn"
              >View project page</nuxt-link
            >
            <nuxt-link
              :to="`/project/${product.id}`"
              class="btn btn-secondary view-project campaigns-btn"
              >Delete project page</nuxt-link
            >
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    noteable: {
      type: Boolean,
      default: false,
    },
    products: {
      type: Array,
      default: () => [],
    },
    accountId: {
      type: String,
      default: () => "",
    },
  },

  data() {
    return {};
  },
  computed: {},

  methods: {},
};
</script>
