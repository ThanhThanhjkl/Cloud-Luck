const SET_PRODUCTS = "SET_PRODUCTS";
const SET_PRODUCTS_DETAIL = "SET_PRODUCTS_DETAIL";
const SET_MY_PRODUCTS = "SET_MY_PRODUCTS";
const SET_MY_RETURNS = "SET_MY_RETURNS";
const SET_RETURN = "SET_RETURN";
const SET_FUNDED = "SET_FUNDED";
const SET_MY_FUNDED = "SET_MY_FUNDED";
const SET_COMMENTS = "SET_COMMENTS";
const SET_SUPORTS = "SET_SUPORTS";
const SET_PRODUCTS_FOR_CREATE = "SET_PRODUCTS_FOR_CREATE";

export default {
  state: () => ({
    products: [],
    myProducts: [],
    product: {},
    myReturns: [],
    return: {},
    funded: [],
    myFunded: [],
    comments: [],
    suports: [],
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

    setProductToCreate({ commit }) {
      commit(SET_PRODUCTS_FOR_CREATE, {});
    },

    async updateProduct({ commit }, params) {
      return await this.$consumerRepositories.consumerCampaigns.updateProduct(
        params
      );
    },

    async createProduct({ commit }, params) {
      return await this.$consumerRepositories.consumerCampaigns.createProduct(
        params
      );
    },

    deleteProduct({ commit }, params) {
      return this.$consumerRepositories.consumerCampaigns.deleteProduct(params);
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

    async createFunded({ commit }, params) {
      return await this.$consumerRepositories.consumerCampaigns.createFunded(
        params
      );
    },

    async getFundedByAccountId({ commit }, params) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getFundedByAccountId(
            params
          );
        commit(SET_FUNDED, response);
      } catch (e) {
        // aaaa
      }
    },

    async deleteFundedById({ commit }, params) {
      return await this.$consumerRepositories.consumerCampaigns.deleteFundedById(
        params
      );
    },

    async getFundedByOwnerId({ commit }, params) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getFundedByOwnerId(
            params
          );
        commit(SET_MY_FUNDED, response);
      } catch (e) {
        // aaaa
      }
    },

    async createComment({ commit }, params) {
      return await this.$consumerRepositories.consumerCampaigns.createComment(
        params
      );
    },

    async getCommentsByProductId({ commit }, params) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getCommentsByProductId(
            params
          );
        commit(SET_COMMENTS, response);
      } catch (e) {
        // aaaa
      }
    },

    deleteCommentById({ commit }, params) {
      return this.$consumerRepositories.consumerCampaigns.deleteCommentById(
        params
      );
    },

    async createSuport({ commit }, params) {
      return await this.$consumerRepositories.consumerCampaigns.createSuport(
        params
      );
    },

    async getSuportsByProductId({ commit }, params) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getSuportsByProductId(
            params
          );
        commit(SET_SUPORTS, response);
      } catch (e) {
        // aaaa
      }
    },
    deleteSupportById({ commit }, params) {
      return this.$consumerRepositories.consumerCampaigns.deleteSupportById(
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
    SET_FUNDED(state, payload) {
      state.funded = payload;
    },
    SET_MY_FUNDED(state, payload) {
      state.myFunded = payload;
    },
    SET_COMMENTS(state, payload) {
      state.comments = payload;
    },
    SET_SUPORTS(state, payload) {
      state.suports = payload;
    },
    SET_PRODUCTS_FOR_CREATE(state, payload) {
      state.product = payload;
    },
  },
};
