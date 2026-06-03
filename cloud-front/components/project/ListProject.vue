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
                  >Chỉnh sửa</nuxt-link
                >
                <nuxt-link
                  :to="`/project/${product.id}`"
                  class="btn btn-secondary view-project campaigns-btn"
                  >Xem trang dự án</nuxt-link
                >
                <b-button
                  to=""
                  class="btn btn-secondary view-project campaigns-btn"
                  @click="showModal(product.id)"
                >
                  Xoá dự án
                </b-button>
              </div>
            </div>
          </div>
          <div class="list-btn-sp">
            <nuxt-link
              :to="`/account/${accountId}/project/${product.id}/`"
              class="btn btn-primary campaigns-btn"
              >Chỉnh sửa</nuxt-link
            >
            <nuxt-link
              :to="`/project/${product.id}`"
              class="btn btn-secondary view-project campaigns-btn"
              >Xem trang dự án</nuxt-link
            >
            <nuxt-link
              :to="`/project/${product.id}`"
              class="btn btn-secondary view-project campaigns-btn"
              >Xoá dự án</nuxt-link
            >
          </div>
        </div>
      </div>
    </form>

    <b-modal
      v-model="showConfirmDeleteModal"
      size="md"
      title="Xác nhận xoá dự án"
      ok-title="Xoá"
      cancel-title="Huỷ"
      ok-variant="danger"
      @ok="submitDelete"
    >
      <p>Bạn có chắc chắn muốn xoá dự án này không?</p></b-modal
    >
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("home");
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
    return {
      showConfirmDeleteModal: false,
      idSelected: 0,
    };
  },

  methods: {
    ...mapActions(["deleteProduct", "getProductsByAccountId"]),
    showModal(id) {
      this.showConfirmDeleteModal = true;
      this.idSelected = id;
    },

    submitDelete() {
      this.deleteProduct(this.idSelected).then((res) => {
        this.getProductsByAccountId(this.accountId);
        this.$toast.success(res);
      });
    },
  },
};
</script>
