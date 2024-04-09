import { getField, updateField } from "vuex-map-fields";
import { set, omit } from "lodash";
// const SET_APPLICATION = "SET_APPLICATION";
const SET_APPLICATION_IMAGE = "SET_APPLICATION_IMAGE";
const DELETE_APPLICATION_IMAGE = "DELETE_APPLICATION_IMAGE";
const RESET_APPLICATION = "RESET_APPLICATION";

class Application {
  constructor() {
    this.company = {
      name: "",
      nameKana: "",
      companyNumber: "",
      established: "",
      zipCode: "",
      prefecture: "",
      city: "",
      street: "",
      phoneNumber: "",
      website1: "",
      website2: "",
      ceoName: "",
      ceoNameKana: "",
      ceoBirthdate: "",
      industrial: "",
      contact: {
        name: "",
        nameKana: "",
        department: "",
        position: "",
        email: "",
        emailConfirm: "",
        emailSub: "",
        emailSubConfirm: "",
        phoneNumber: "",
        phoneNumberMain: "",
      },
      certification: {
        certificateOfRegisteredMatters1: {
          imageId: null,
        },
        certificateOfRegisteredMatters2: {
          imageId: null,
        },
        certificateOfOfficialRegistrationOfASeal: {
          imageId: null,
        },
        declarationOfSettlement: {
          imageId: null,
        },
        personalCertificationOfThePersonInCharge1: {
          imageId: null,
        },
        personalCertificationOfThePersonInCharge2: {
          imageId: null,
        },
      },
    };
    this.project = {
      aboutProject: "",
      preferredPublicationDateStart: "",
      preferredPublicationDateEnd: "",
      targetAmount: "",
    };
    this.publisher = {
      website: "",
      body: "",
    };
  }
}

export default {
  state: () => ({
    applicationFiles: {},
    application: new Application(),
  }),

  actions: {
    async getApplication({ commit }) {
      const response =
        await this.$businessRepositories.businessApplication.getApplication();
      // commit(SET_APPLICATION, response.body);
      return response.body;
    },

    updateApplication(_, payload) {
      return this.$businessRepositories.businessApplication.updateApplication(
        omit(payload, [
          "company.contact.emailConfirm",
          "company.contact.emailSubConfirm",
        ])
      );
    },

    postApplication(_) {
      return this.$businessRepositories.businessApplication.postApplication();
    },

    addApplicationImage({ commit }, payload) {
      commit(SET_APPLICATION_IMAGE, payload);
    },

    deleteApplicationImage({ commit }, payload) {
      commit(DELETE_APPLICATION_IMAGE, payload);
    },
    resetApplication({ commit }) {
      commit(RESET_APPLICATION);
    },
  },
  getters: {
    getField,
  },

  mutations: {
    updateField,
    // SET_APPLICATION(state, payload) {
    //   state.applicationFiles = payload;
    // },
    SET_APPLICATION_IMAGE(state, payload) {
      set(
        state.application.company.certification[payload.type],
        "imageId",
        payload.id
      );
    },
    DELETE_APPLICATION_IMAGE(state, payload) {
      set(state.application.company.certification[payload], "imageId", null);
    },
    RESET_APPLICATION(state) {
      state.application = new Application();
    },
  },
};
