const SET_PRODUCTS = "SET_PRODUCTS";
const SET_PRODUCTS_DETAIL = "SET_PRODUCTS_DETAIL";

export default {
  state: () => ({
    products: [],
    product: {},
  }),

  actions: {
    async getProducts({ commit }) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getProducts();
        commit(SET_PRODUCTS, response);
      } catch (e) {
        // TODO
      }
    },
    async getProductsDetail({ commit }, params) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getProductsDetail(
            params
          );
        commit(SET_PRODUCTS_DETAIL, response);
      } catch (e) {
        // TODO
      }
    },
  },

  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_PRODUCTS_DETAIL(state, payload) {
      state.product = payload;
    },
  },
};
