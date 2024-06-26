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
