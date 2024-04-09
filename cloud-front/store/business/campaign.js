import { getField, updateField } from "vuex-map-fields";
import { cloneDeep, omit, pick } from "lodash";
import CampaignStatus from "@/helpers/campaignStatus";
import { defaultData } from "@/helpers/dummyData";
// Campaign
const SET_CAMPAIGNS = "SET_CAMPAIGNS";
const SET_CAMPAIGNS_DETAIL = "SET_CAMPAIGNS_DETAIL";

// Campaign Return
const SET_CAMPAIGN_RETURN = "SET_CAMPAIGN_RETURN";
const REMOVE_SUBIMAGE_ID = "REMOVE_SUBIMAGE_ID";
const ADD_SUBIMAGE_ID = "ADD_SUBIMAGE_ID";
const ADD_RETURN_PLAN = "ADD_RETURN_PLAN";
const DELETE_RETURN_PLAN = "DELETE_RETURN_PLAN";
const UPDATE_RETURN_PLAN = "UPDATE_RETURN_PLAN";
const SET_LAW_INPUT = "SET_LAW_INPUT";
const RESET_REPORT = "RESET_REPORT";
const GET_LOCAL_CAMPAIGN = "GET_LOCAL_CAMPAIGN";
const SET_LOCAL_CAMPAIGN = "SET_LOCAL_CAMPAIGN";
class Report {
  constructor() {
    this.title = "";
    this.body = "";
    this.image = {
      id: "",
    };
  }
}

class CampaignDetail {
  constructor() {
    this.campaign = {
      id: null,
      accountId: null,
      target: {
        amount: 0,
        method: "all_in",
        endedAt: new Date(),
      },
      detail: {
        categoryId: null,
        areaId: null,
        brandId: null,
        title: null,
        summary: null,
      },
      body: {
        body: defaultData,
      },
      visual: {
        videoUrl: null,
        mainImage: {
          id: null,
        },
        subImage: [
          {
            id: null,
          },
          {
            id: null,
          },
          {
            id: null,
          },
          {
            id: null,
          },
        ],
      },
      returns: [],
      identification: {
        name: null,
        images: [
          {
            id: null,
          },
        ],
        zipCode: null,
        prefecture: null,
        city: null,
        street: null,
        phoneNumber: null,
        birthdate: null,
      },
      law: {
        type: "input",
        input: {
          sellerName: null,
          responsiblePersonName: null,
          zipCode: null,
          prefecture: null,
          city: null,
          street: null,
          phoneNumber: null,
        },
      },
      bankAccount: {
        bankName: null,
        bankCode: null,
        branchCode: null,
        accountType: "saving",
        accountNumber: null,
        accountName: null,
      },
      status: null,
      submitted: false,
    };
  }
}

export default {
  state: () => ({
    campaigns: [],
    edited: false,
    campaign: new CampaignDetail().campaign,
    campaignReturn: [],
    returnImage: null,
    report: new Report(),
  }),

  getters: {
    getField,
  },

  actions: {
    // CAMPAIGN
    async getCampaigns({ commit }) {
      const response =
        await this.$businessRepositories.businessCampaigns.getCampaigns();
      commit(SET_CAMPAIGNS, response.body);
    },

    async getCampaignDetail({ commit }, id) {
      const response =
        await this.$businessRepositories.businessCampaigns.getCampaignDetail(
          id
        );
      commit(SET_CAMPAIGNS_DETAIL, response.body);
    },

    async postCampaignDetail({ state }, payload) {
      // map visual
      const validSubImages = payload.visual.subImage.filter((item) => {
        return item.id;
      });
      const visual = { ...payload.visual, subImage: validSubImages };

      // map return
      const returnOption = payload.returns
        ?.filter((item) => item.status)
        .map((item) => {
          return {
            title: item.title,
            body: item.bio,
            amount: item.amount,
            scheduledDeliveryDate: item.arrivalDate,
            quantity: item.stockQuantity,
            hasIncludingAlcohol: item.hasIncludingAlcohol,
            doWantToGetEmail: item.doWantToGetEmail,
            doWantToGetAddress: item.doWantToGetAddress,
            doWantToGetRemarks: item.doWantToGetRemarks,
            options: item.options,
            files: item.images.filter((item) => {
              return item.id;
            }),
          };
        });

      // map idetification
      const identificationImage = payload.identification?.images.filter(
        (image) => image !== null && typeof image === "object"
      );

      // map param
      const params = {
        target: payload.target,
        detail: payload.detail,
        identification: {
          ...payload.identification,
          images: identificationImage,
        },
        visual,
        body: payload.body,
        law:
          payload.law.type !== "input"
            ? omit(payload.law, "input")
            : payload.law,
        bank: payload.bankAccount,
        returns: returnOption,
      };

      // define paramRequest

      let paramsRequest = {};

      switch (state.campaign.status) {
        case CampaignStatus.DRAFT:
        case CampaignStatus.REJECTED:
          paramsRequest = cloneDeep(params);
          break;
        case CampaignStatus.OFFLINE:
        case CampaignStatus.UPDATED:
        case CampaignStatus.PUBLISHED:
        case CampaignStatus.UPDATE_REJECTED:
          paramsRequest = pick(params, [
            "detail",
            "visual",
            "body",
            "returns",
            "status",
          ]);
          // Do Something
          break;

        case CampaignStatus.REVIEWING:
        case CampaignStatus.UPDATE_REVIEWING:
          paramsRequest = {};
          this.$toast.error("Status can't edit");
          return false;

        default:
          // Do Something
          break;
      }

      await this.$businessRepositories.businessCampaigns.postCampaignDetail(
        state.campaign.id,
        paramsRequest
      );
      this.$toast.success("成功");
    },

    getLocalCampaign({ commit }, id) {
      const campaign = JSON.parse(localStorage.getItem(`campaign-${id}`));
      commit(GET_LOCAL_CAMPAIGN, campaign);
      return campaign;
    },

    setLocalCampaign({ commit }, payload) {
      commit(SET_LOCAL_CAMPAIGN, payload);
    },

    // CAMPAIGN RETURN
    publishCampaign(_, params) {
      this.$businessRepositories.businessCampaigns.publishCampaign(
        params.campaignId,
        { releaseDateTime: params.releaseDateTime }
      );

      localStorage.removeItem(`campaign-${params.campaignId}`);
    },
    createReturnPlan({ commit }, params) {
      commit(ADD_RETURN_PLAN, params);
    },

    async getCampaignReturn({ commit }, id) {
      const response =
        await this.$businessRepositories.businessCampaigns.getCampaignReturn(
          id
        );
      commit(SET_CAMPAIGN_RETURN, response.body);
    },
    updateReturnPlan({ commit }, params) {
      commit(UPDATE_RETURN_PLAN, params);
    },

    deleteReturnPlan({ commit }, params) {
      commit(DELETE_RETURN_PLAN, params);
    },

    // IMAGES
    addSubImageId({ commit }, params) {
      commit(ADD_SUBIMAGE_ID, params);
    },

    removeSubImageId({ commit }, params) {
      commit(REMOVE_SUBIMAGE_ID, params);
    },

    getImage(_, params) {
      return this.$businessRepositories.businessCampaigns.getImage(params);
    },

    postImage(_, params) {
      return this.$businessRepositories.businessCampaigns.postImage(params);
    },

    deleteImage(_, params) {
      return this.$businessRepositories.businessCampaigns.deleteImage(params);
    },

    // REPORT
    postReport(_, params) {
      return this.$businessRepositories.businessCampaigns.postReport(params);
    },

    resetReport({ commit }) {
      commit(RESET_REPORT);
    },

    setLawInput({ commit }, param) {
      commit(SET_LAW_INPUT, param);
    },
  },

  mutations: {
    updateField,
    // CAMPAIGN
    SET_CAMPAIGNS(state, payload) {
      state.campaigns = payload;
    },
    SET_CAMPAIGNS_DETAIL(state, payload) {
      if (payload.status === "draft") {
        const campaign = new CampaignDetail().campaign;
        state.campaign = {
          ...campaign,
          id: payload.id,
          accountId: payload.accountId,
          returns: payload.returns,
          status: payload.status,
          submitted: false,
        };
      } else {
        state.campaign = { ...payload, submitted: false };
      }
      localStorage.setItem(
        `campaign-${state.campaign.id}`,
        JSON.stringify(state.campaign)
      );
    },
    SET_LOCAL_CAMPAIGN(state, payload) {
      if (payload) {
        state.campaign = cloneDeep(payload);
      }

      localStorage.setItem(
        `campaign-${state.campaign.id}`,
        JSON.stringify(state.campaign)
      );
    },

    GET_LOCAL_CAMPAIGN(state, payload) {
      state.campaign = payload;
    },

    // CAMPAIGN RETURN
    SET_CAMPAIGN_RETURN(state, payload) {
      state.campaignReturn = payload;
    },
    REMOVE_SUBIMAGE_ID(state, payload) {
      state.campaign.visual.subImage[payload] = null;
    },
    ADD_SUBIMAGE_ID(state, payload) {
      const subImages = state.campaign.visual.subImage;
      subImages[payload.idx] = { id: payload.id };
      state.campaign.visual.subImage = [...subImages];
    },
    ADD_RETURN_PLAN(state, payload) {
      state.campaign.returns.push(payload);
    },
    DELETE_RETURN_PLAN(state, payload) {
      state.campaign.returns.splice(payload, 1);
    },
    UPDATE_RETURN_PLAN(state, payload) {
      state.campaign.returns[payload.idx] = payload.return;
    },

    SET_LAW_INPUT(state, payload) {
      state.campaign.law.input = cloneDeep(payload);
    },

    RESET_REPORT(state) {
      state.report = new Report();
    },
  },
};
