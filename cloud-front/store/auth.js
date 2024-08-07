import { getField, updateField } from "vuex-map-fields";
// import jwt from "jsonwebtoken";

const RESET_CURRENT_USER = "RESET_CURRENT_USER";
const SET_TOKEN = "SET_TOKEN";
const SET_LOGGED_USER_ID = "SET_LOGGED_USER_ID";
const SET_ACCOUNT = "SET_ACCOUNT";
const SET_ACCOUNT_ADDRESS = "SET_ACCOUNT_ADDRESS";
const SET_ACCOUNT_ADDRESS_DETAIL = "SET_ACCOUNT_ADDRESS_DETAIL";

export default {
  state: () => ({
    userId: null,
    token: "",
    account: null,
    accountAddress: null,
    accountAddressDetail: null,
  }),

  getters: {
    getField,
  },

  actions: {
    // NEW UPDATE
    accountRegister(_, params) {
      return this.$authRepositories.accountRegister(params);
    },

    forgotPassword(_ctx, params) {
      return this.$authRepositories.forgotPassword(params);
    },

    async accountLogin({ commit }, params) {
      const res = await this.$authRepositories.accountLogin(params);
      if (res.token) {
        this.$axios.setToken(res.token, "Bearer");
        // const decodedToken = jwt.decode(res.token);
        commit(SET_TOKEN, res.token);
        commit(SET_LOGGED_USER_ID, res.id);
        return res;
      }
    },

    async accountLogout({ commit }, params) {
      try {
        await this.$authRepositories.accountLogout(params);
        commit(RESET_CURRENT_USER);
      } catch (error) {}
    },

    async getAccount({ commit }, params) {
      const res = await this.$authRepositories.getAccount(params);
      if (res) {
        commit(SET_ACCOUNT, res);
      }
      commit(SET_ACCOUNT, res);
      return res;
    },

    updateAccount(_, params) {
      return this.$authRepositories.updateAccount(params);
    },

    changePassword(_ctx, params) {
      return this.$authRepositories.changePassword(params);
    },

    async getAddressByAccountId({ commit }, params) {
      const res = await this.$authRepositories.getAddressByAccountId(params);
      if (res) {
        commit(SET_ACCOUNT_ADDRESS, res);
      }
      commit(SET_ACCOUNT_ADDRESS, res);
      return res;
    },

    async getAccountAddress({ commit }, params) {
      const res = await this.$authRepositories.getAccountAddress(params);
      if (res) {
        commit(SET_ACCOUNT_ADDRESS_DETAIL, res);
      }
      commit(SET_ACCOUNT_ADDRESS_DETAIL, res);
      return res;
    },

    createAccountAddress({ commit }, params) {
      return this.$authRepositories.createAccountAddress(params);
    },

    updateAccountAddress({ commit }, params) {
      return this.$authRepositories.updateAccountAddress(params);
    },

    deleteAccountAddress({ commit }, id) {
      return this.$authRepositories.deleteAccountAddress(id);
    },
  },

  mutations: {
    updateField,
    SET_LOGGED_USER_ID(state, payload) {
      state.userId = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    RESET_CURRENT_USER(state) {
      state.user = null;
    },
    SET_ACCOUNT(state, payload) {
      state.account = payload;
    },
    SET_ACCOUNT_ADDRESS(state, payload) {
      state.accountAddress = payload;
    },
    SET_ACCOUNT_ADDRESS_DETAIL(state, payload) {
      state.accountAddressDetail = payload;
    },
  },
};
