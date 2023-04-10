import { getField, updateField } from "vuex-map-fields";
const SET_LOGGED_USER = "SET_LOGGED_USER";
const RESET_CURRENT_USER = "RESET_CURRENT_USER";
export default {
  state: () => ({
    user: null,
  }),
  getters: {
    getField,
  },

  actions: {
    async accountLogin({ commit }, params) {
      const res = await this.$authRepositories.accountLogin(params);
      if (res.body) {
        const response = await this.$authRepositories.getLoggedUser();
        commit(SET_LOGGED_USER, response.body);
        commit("account/SET_ACCOUNT", response.body, { root: true });
        return response.body;
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
    accountActivate(_, params) {
      return this.$authRepositories.activeAccount(params);
    },
    resetPassword(_, params) {
      return this.$authRepositories.resetPassword(params);
    },
    accountRegister(_, params) {
      return this.$authRepositories.accountRegister(params);
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
    forgotPassword(_ctx, params) {
      return this.$authRepositories.forgotPassword(params);
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
    RESET_CURRENT_USER(state) {
      state.user = null;
    },
  },
};
