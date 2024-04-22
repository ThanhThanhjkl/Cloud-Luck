const SET_PRODUCTS = "SET_PRODUCTS";
const SET_PRODUCTS_DETAIL = "SET_PRODUCTS_DETAIL";
const SET_MY_PRODUCTS = "SET_MY_PRODUCTS";
const SET_MY_RETURNS = "SET_MY_RETURNS";
const SET_RETURN = "SET_RETURN";

export default {
  state: () => ({
    products: [],
    myProducts: [],
    product: {},
    myReturns: [],
    return: {},
  }),

  actions: {
    async getProducts({ commit }) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getProducts();
        commit(SET_PRODUCTS, response);
      } catch (e) {
        // aaaa
      }
    },

    async getProductsByAccountId({ commit }, params) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getProductsByAccountId(
            params
          );
        commit(SET_MY_PRODUCTS, response);
      } catch (e) {
        // aaaa
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
        // aaaa
      }
    },

    async updateProduct({ commit }, params) {
      return await this.$consumerRepositories.consumerCampaigns.updateProduct(
        params
      );
    },

    async getReturnsByProductId({ commit }, params) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getReturnsByProductId(
            params
          );
        commit(SET_MY_RETURNS, response);
      } catch (e) {
        // aaaa
      }
    },
    async getReturnById({ commit }, params) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getReturnById(
            params
          );
        commit(SET_RETURN, response);
      } catch (e) {
        // aaaa
      }
    },

    async updateReturn({ commit }, params) {
      return await this.$consumerRepositories.consumerCampaigns.updateReturn(
        params
      );
    },

    async createReturn({ commit }, params) {
      return await this.$consumerRepositories.consumerCampaigns.createReturn(
        params
      );
    },

    async deleteReturn({ commit }, params) {
      return await this.$consumerRepositories.consumerCampaigns.deleteReturn(
        params
      );
    },
  },

  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_PRODUCTS_DETAIL(state, payload) {
      state.product = payload;
    },
    SET_MY_PRODUCTS(state, payload) {
      state.myProducts = payload;
    },
    SET_MY_RETURNS(state, payload) {
      state.myReturns = payload;
    },
    SET_RETURN(state, payload) {
      state.return = payload;
    },
  },
};
