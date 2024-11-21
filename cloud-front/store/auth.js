import { getField, updateField } from "vuex-map-fields";

const RESET_CURRENT_USER = "RESET_CURRENT_USER";
const SET_TOKEN = "SET_TOKEN";
const SET_LOGGED_USER_ID = "SET_LOGGED_USER_ID";
const SET_ACCOUNT = "SET_ACCOUNT";
const SET_ACCOUNT_ADDRESS = "SET_ACCOUNT_ADDRESS";
const SET_ACCOUNT_ADDRESS_DETAIL = "SET_ACCOUNT_ADDRESS_DETAIL";
const UPDATE_DEFAULT_ADDRESS = "UPDATE_DEFAULT_ADDRESS";

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
        commit(SET_TOKEN, res.token);
        commit(SET_LOGGED_USER_ID, res.id);
        return res;
      }
    },

    accountLogout({ commit }) {
      commit(RESET_CURRENT_USER);
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

    updateDefaultAddress({ commit }, params) {
      return this.$authRepositories.updateDefaultAddress(params);
    },

    changedDefaultAddress({ commit }, params) {
      commit(UPDATE_DEFAULT_ADDRESS, params);
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
      state.account = null;
      state.token = null;
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

    UPDATE_DEFAULT_ADDRESS(state, addressId) {
      state.accountAddress.forEach((address) => {
        if (address.id === addressId) {
          address.defaultSelect = "true";
        } else {
          address.defaultSelect = "false";
        }
      });
    },
  },
};
