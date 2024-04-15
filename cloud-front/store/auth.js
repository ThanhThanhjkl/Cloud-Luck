import { getField, updateField } from "vuex-map-fields";
import jwt from "jsonwebtoken";

const SET_LOGGED_USER = "SET_LOGGED_USER";
const RESET_CURRENT_USER = "RESET_CURRENT_USER";
const SET_TOKEN = "SET_TOKEN";

export default {
  state: () => ({
    user: null,
    token: "",
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
        const decodedToken = jwt.decode(res.token);
        commit(SET_TOKEN, res.token);
        commit(SET_LOGGED_USER, decodedToken.sub);
        commit("account/SET_ACCOUNT", decodedToken.sub, { root: true });
        return res;
      }
    },
    accountLogout({ commit }) {
      try {
        Promise.all([
          commit(RESET_CURRENT_USER),
          this.$authRepositories.accountLogout(),
        ]);
      } catch (error) {}
    },

    // ABCD

    accountActivate(_, params) {
      return this.$authRepositories.activeAccount(params);
    },
    resetPassword(_, params) {
      return this.$authRepositories.resetPassword(params);
    },
    async getLoggedUser({ commit }) {
      try {
        const response = await this.$authRepositories.getLoggedUser();
        commit(SET_LOGGED_USER, response.body);
      } catch {}
    },

    changePassword(_ctx, params) {
      return this.$authRepositories.changePassword(params);
    },

    createToken(_ctx, params) {
      return this.$authRepositories.createToken(params);
    },
    deactivateUser(_ctx) {
      return this.$authRepositories.deactivateUser();
    },

    getRedirectInstagram(_) {
      return this.$authRepositories.getRedirectInstagram();
    },
    getRedirectTwitter(_) {
      return this.$authRepositories.getRedirectTwitter();
    },

    getRedirectLine(_) {
      return this.$authRepositories.getRedirectLine();
    },

    resetUser({ commit }) {
      commit(RESET_CURRENT_USER);
    },
  },

  mutations: {
    updateField,
    SET_LOGGED_USER(state, payload) {
      state.user = payload;
    },
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    RESET_CURRENT_USER(state) {
      state.user = null;
    },
  },
};
