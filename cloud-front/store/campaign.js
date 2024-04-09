import { getField, updateField } from "vuex-map-fields";
import _ from "lodash";

const SET_CAMPAIGN_NOTE = "SET_CAMPAIGN_NOTE";
const SET_CAMPAIGN_NOTE_DETAIL = "SET_CAMPAIGN_NOTE_DETAIL";
const SET_CAMPAIGN_DETAIL = "SET_CAMPAIGN_DETAIL";
const SET_CAMPAIGN_YELLS = "SET_CAMPAIGN_YELLS";
const SET_COMMENTS = "SET_COMMENTS";
const SET_DONATIONS = "SET_DONATIONS";
const SET_LOCAL_DONATION = "SET_LOCAL_DONATION";
const GET_LOCAL_DONATION = "GET_LOCAL_DONATION";
const SET_RETURN = "SET_RETURN";
const SET_RETURN_DETAIL = "SET_RETURN_DETAIL";
const SET_RETURN_OPTION_DONATION = "SET_RETURN_OPTION_DONATION";
const SET_CAMPAIGN_FAVORITE = "SET_CAMPAIGN_FAVORITE";
const SET_LOCAL_CARD = "SET_LOCAL_CARD";
const SET_LOCAL_ADDRESS = "SET_LOCAL_ADDRESS";
const RESET_DONATION = "RESET_DONATION";
const RESET_CAMPAIGN = "RESET_CAMPAIGN";
const SET_QUOTATION = "SET_QUOTATION";
const SET_CURRENT_CAMPAIGN_ACCOUNT = "SET_CURRENT_CAMPAIGN_ACCOUNT";
const SET_DONATION_SELECTED_OPTIONS = "SET_DONATION_SELECTED_OPTIONS";

class Donation {
  constructor() {
    this.additional = 0;
    this.remark = "";
    this.comment = "";
    this.campaign = {
      id: "",
      return: {
        id: "",
        options: [],
        count: 1,
      },
    };
    this.addressId = null;
    this.address = {
      city: "",
      name: "",
      phoneNumber: "",
      prefecture: "",
      street: "",
      zipCode: "",
    };
    this.shippingAddressId = 0;
    this.isNewAddress = false;
    this.wantToAddListAddress = false;
    this.paymentMethod = null;
    this.payment = {
      type: "card",
      id: 0,
      token: "",
    };
    this.cardType = "card";
    this.cardInfo = {
      holder: "",
      number: "",
      expiredMonth: "",
      expiredYear: "",
      securityPass: "",
      brand: "",
    };
    this.quotation = {
      support: null,
      systemFee: null,
      shippingFee: null,
      subTotal: null,
      tax: null,
      total: null,
    };
  }
}

export default {
  namespaced: true,

  state: () => ({
    campaign: null,
    campaignAccount: null,
    CampaignNote: [],
    CampaignNoteDetail: null,
    campaignYells: [],
    comments: [],
    donations: [],
    donation: new Donation(),
    campaignReturns: [],
    campaignReturnDetail: {},
    campaignFavorite: {},
  }),

  getters: {
    getField,

    currentCampaignAccount(state) {
      if (state.campaign && state.campaign.accountId) {
        return state.campaignAccount;
      } else {
        return null;
      }
    },
  },

  actions: {
    async getCampaignDetail({ commit }, id) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getCampaignDetail(
            id
          );
        commit(SET_CAMPAIGN_DETAIL, response.body);
        return response.body;
      } catch (e) {}
    },

    async getAccountCampaign({ commit }, id) {
      const response =
        await this.$consumerRepositories.consumerAccounts.getAccountDetail(id);

      commit(SET_CURRENT_CAMPAIGN_ACCOUNT, response.body);
    },

    async getCampaignNote({ commit }, id) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getCampaignNote(
            id
          );

        commit(SET_CAMPAIGN_NOTE, response.body);
      } catch (e) {}
    },
    async getCampaignNoteDetail({ commit }, params) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getCampaignNoteDetail(
            params.id,
            params.noteId
          );

        commit(SET_CAMPAIGN_NOTE_DETAIL, response.body);
      } catch (e) {}
    },

    async getCampaignFavorite({ commit }, id) {
      const res =
        await this.$consumerRepositories.consumerCampaigns.getCampaignFavorite(
          id
        );

      commit(SET_CAMPAIGN_FAVORITE, res.body);
    },

    postCampaignFavorite(_, params) {
      return this.$consumerRepositories.consumerCampaigns.postCampaignFavorite(
        params
      );
    },

    deleteCampaignFavorite(_, params) {
      return this.$consumerRepositories.consumerCampaigns.deleteCampaignFavorite(
        params
      );
    },
    async getCampaignYell({ commit }, params) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getCampaignYell(
            params
          );

        commit(SET_CAMPAIGN_YELLS, response.body);
      } catch (e) {}
    },
    async getComments({ commit }, params) {
      const response =
        await this.$consumerRepositories.consumerCampaigns.getComments(params);
      commit(SET_COMMENTS, response.body);
    },

    postComment(_, params) {
      return this.$consumerRepositories.consumerCampaigns.postComment(
        params.id,
        { message: params.message }
      );
    },

    deleteComment(_, params) {
      return this.$consumerRepositories.consumerCampaigns.deleteComment(
        params.id,
        params.commentId
      );
    },

    // Donation;
    postDonation({ state }, params) {
      const paramMapper = _.cloneDeep(params);
      const paymentId = _.omit(paramMapper, "body.payment.token");
      const paymentCard = _.omit(paramMapper, "body.payment.id");

      let donation =
        state.donation.cardType === "card" ? paymentId : paymentCard;

      donation = _.omit(donation, [
        "body.isNewAddress",
        "body.addressId",
        "body.address",
        "body.wantToAddListAddress",
      ]);

      const isNewAddress = _.get(paramMapper, "body.isNewAddress", "false");
      const wantToAddList = _.get(
        paramMapper,
        "body.wantToAddListAddress",
        "false"
      );

      donation.body.address = isNewAddress
        ? {
            ..._.cloneDeep(paramMapper.body.address),
            wantToAddList,
          }
        : { id: paramMapper.body.addressId };

      return this.$consumerRepositories.consumerCampaigns.postDonation(
        donation
      );
    },

    async getQuotation({ commit }, params) {
      const outputParams = {
        additional: params.additional,
        campaign: {
          id: params.campaign.id,
          return: [
            {
              count: params.campaign.return.count,
              id: params.campaign.return.id,
            },
          ],
        },
        payment: {
          type: params.payment.type,
        },
      };

      const res =
        await this.$consumerRepositories.consumerCampaigns.getQuotation(
          outputParams
        );
      commit(SET_QUOTATION, res.body);
      return res.body;
    },
    addReturnOptionDonation({ commit }, params) {
      commit(SET_RETURN_OPTION_DONATION, params);
    },
    setLocalDonation({ commit }, params) {
      commit(SET_LOCAL_DONATION, params);
    },
    getLocalDonation({ commit }) {
      commit(GET_LOCAL_DONATION);
    },
    resetLocalDonation({ commit }) {
      commit(RESET_DONATION);
    },

    async getDonations({ commit }) {
      const res =
        await this.$consumerRepositories.consumerCampaigns.getDonations();
      commit(SET_DONATIONS, res.body);
    },
    // campaign return api
    async getCampaignReturn({ commit }, id) {
      const response =
        await this.$consumerRepositories.consumerCampaigns.getCampaignReturn(
          id
        );
      commit(SET_RETURN, response.body);
    },
    async getCampaignReturnDetail({ commit }, params) {
      const res =
        await this.$consumerRepositories.consumerCampaigns.getCampaignReturnDetail(
          params
        );

      commit(SET_RETURN_DETAIL, res.body);
      return res.body;
    },
    resetCampaignDetail({ commit }) {
      commit(RESET_CAMPAIGN);
    },
    setLocalCardInfo({ commit }, params) {
      commit(SET_LOCAL_CARD, params);
    },
    setLocalAddress({ commit }, params) {
      commit(SET_LOCAL_ADDRESS, params);
    },

    setDonationSelectedOptions({ commit }, params) {
      commit(SET_DONATION_SELECTED_OPTIONS, params);
    },
  },

  mutations: {
    updateField,
    SET_CAMPAIGN_DETAIL(state, payload) {
      state.campaign = payload;
    },
    SET_DONATION_SELECTED_OPTIONS(state, payload) {
      state.donation.campaign.return.options = payload;
    },
    SET_CAMPAIGN_NOTE(state, payload) {
      state.CampaignNote = payload;
    },
    SET_CAMPAIGN_NOTE_DETAIL(state, payload) {
      state.CampaignNoteDetail = payload;
    },
    SET_CAMPAIGN_YELLS(state, payload) {
      state.campaignYells = payload;
    },
    SET_COMMENTS(state, payload) {
      state.comments = payload;
    },
    SET_DONATIONS(state, payload) {
      state.donations = payload;
    },
    SET_LOCAL_DONATION(state, payload) {
      state.donation = payload;
      localStorage.setItem("donation", JSON.stringify(state.donation));
    },
    GET_LOCAL_DONATION(state) {
      state.donation = JSON.parse(localStorage.getItem("donation"));
    },
    SET_RETURN(state, payload) {
      state.campaignReturns = payload;
    },
    SET_RETURN_DETAIL(state, payload) {
      state.campaignReturnDetail = payload;
    },
    SET_RETURN_OPTION_DONATION(state, payload) {
      // TODO
      const options = [];
      options[payload.idx] = {
        item: {
          id: payload.itemID,
        },
        id: payload.optionID,
      };
      state.donation.campaign.return.options[payload.idx] =
        options[payload.idx];
    },
    SET_CAMPAIGN_FAVORITE(state, payload) {
      state.campaignFavorite = payload;
    },
    SET_LOCAL_CARD(state, payload) {
      state.donation.cardInfo = { ...state.donation.cardInfo, ...payload };
    },
    SET_LOCAL_ADDRESS(state, payload) {
      state.donation.address = { ...state.donation.address, ...payload };
    },
    SET_QUOTATION(state, payload) {
      state.donation.quotation = payload;
    },
    RESET_DONATION(state) {
      localStorage.removeItem("donation");
      state.donation = new Donation();
    },
    RESET_CAMPAIGN(state) {
      state.campaign = null;
      state.campaignReturns = [];
      state.campaignFavorite = {};
      state.campaignAccount = null;
    },
    SET_CURRENT_CAMPAIGN_ACCOUNT(state, payload) {
      state.campaignAccount = payload;
    },
  },
};
