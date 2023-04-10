// import _ from "lodash";
import { getField, updateField } from "vuex-map-fields";

const SET_ACCOUNT_CARD = "SET_ACCOUNT_CARD";
const SET_ACCOUNT = "SET_ACCOUNT";
const SET_AVATAR = "SET_AVATAR";
export default {
  namespaced: true,

  state: () => ({
    accountCards: [],
    account: null,
  }),

  getters: {
    getField,
  },

  actions: {
    async getProfile({ commit }) {
      try {
        const response =
          await this.$consumerRepositories.consumerAccounts.getProfile();
        commit(SET_ACCOUNT, response.body);
        return response.body;
      } catch (e) {}
    },

    getAccountDetail(_ctx, id) {
      return this.$consumerRepositories.consumerAccounts.getAccountDetail(id);
    },

    updateProfile(_ctx, account) {
      return this.$consumerRepositories.consumerAccounts.updateProfile(account);
    },

    async uploadAvatar({ dispatch, commit }, params) {
      const res = await dispatch("global/postImage", params, { root: true });
      commit(SET_AVATAR, res.body);
      return res;
    },
    // card account
    async getAccountCards({ commit }, id) {
      const res =
        await this.$consumerRepositories.consumerAccounts.getAccountCards(id);
      commit(SET_ACCOUNT_CARD, res.body);
    },
    async putAccountCard(_, params) {
      await this.$consumerRepositories.consumerAccounts.putAccountCard(params);
      this.$toast.success("成功");
    },
    async postAccountCard(_, params) {
      await this.$consumerRepositories.consumerAccounts.postAccountCard(params);
      this.$toast.success("成功");
    },
    async deleteAccountCard(_, params) {
      await this.$consumerRepositories.consumerAccounts.deleteAccountCard(
        params
      );
      this.$toast.success("成功");
    },
  },

  mutations: {
    updateField,

    SET_ACCOUNT_CARD(state, payload) {
      state.accountCards = payload;
    },
    SET_ACCOUNT(state, payload) {
      state.account = payload;
    },
    SET_AVATAR(state, payload) {
      state.account.image = payload;
    },
  },
};
