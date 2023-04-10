import _ from "lodash";
import { getField, updateField } from "vuex-map-fields";
const SET_VALIDATION_ERRORS = "SET_VALIDATION_ERRORS";

export default {
  state: () => ({
    validationErrors: {},
    keepError: false,
  }),

  getters: {
    getField,
    getErrors: (state) => (name) => {
      return _.get(state.validationErrors, name);
    },
  },

  actions: {
    setValidationErrors({ commit }, payload) {
      commit(SET_VALIDATION_ERRORS, payload);
    },

    getImage(_, params) {
      return this.$businessRepositories.businessCampaigns.getImage(params);
    },

    postImage(_, params) {
      const formData = new FormData();
      formData.append("file", params);
      return this.$businessRepositories.businessCampaigns.postImage(formData);
    },

    deleteImage(_, params) {
      return this.$businessRepositories.businessCampaigns.deleteImage(params);
    },
  },

  mutations: {
    updateField,
    SET_VALIDATION_ERRORS(state, payload) {
      const errors = _.cloneDeep(payload);

      Object.entries(errors).forEach(([key, value]) => {
        _.set(errors, key, value.message);
      });

      state.validationErrors = errors;
    },
  },
};
