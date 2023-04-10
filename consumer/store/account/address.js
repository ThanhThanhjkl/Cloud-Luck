import { omit } from "lodash";
import { getField, updateField } from "vuex-map-fields";
const SET_ACCOUNT_ADDRESS = "SET_ACCOUNT_ADDRESS";
const SET_MAIL = "SET_MAIL";

export default {
  state: () => ({
    accountAddress: [],
    createAddress: {},
    accountMail: [],
  }),

  actions: {
    async getAccountAddress({ commit }, params) {
      const res =
        await this.$consumerRepositories.consumerAccounts.getAccountAddress(
          params
        );
      commit(SET_ACCOUNT_ADDRESS, res.body);
    },

    createAccountAddress(_, { accountId, params }) {
      return this.$consumerRepositories.consumerAccounts.createAccountAddress(
        accountId,
        params
      );
    },

    updateAccountAddress(_, { accountId, payload }) {
      const address = omit(payload, ["id", "default", "isPrimary"]);
      return this.$consumerRepositories.consumerAccounts.updateAccountAddress(
        accountId,
        payload.id,
        address
      );
    },

    deleteAccountAddress(_, { accountId, addressId }) {
      return this.$consumerRepositories.consumerAccounts.deleteAccountAddress(
        accountId,
        addressId
      );
    },
    postChangingDefaultAddress(_, { accountId, addressId }) {
      return this.$consumerRepositories.consumerAccounts.postChangingDefaultAddress(
        accountId,
        addressId
      );
    },

    async getAccountMail({ commit }, accountId) {
      const res =
        await this.$consumerRepositories.consumerAccounts.getAccountMail(
          accountId
        );
      commit(SET_MAIL, res.body);
    },

    updateAccountMail(_, { accountId, mailSettingId, params }) {
      return this.$consumerRepositories.consumerAccounts.updateAccountMail(
        accountId,
        mailSettingId,
        params
      );
    },
  },

  getters: {
    getField,
  },

  mutations: {
    updateField,

    SET_ACCOUNT_ADDRESS(state, payload) {
      state.accountAddress = payload;
    },

    SET_MAIL(state, payload) {
      state.accountMail = payload;
    },
  },
};
