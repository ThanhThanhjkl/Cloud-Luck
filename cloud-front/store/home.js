const SET_CAMPAIGNS = "SET_CAMPAIGNS";

export default {
  state: () => ({
    campaigns: [],
  }),

  actions: {
    async getCampaigns({ commit }, params) {
      try {
        const response =
          await this.$consumerRepositories.consumerCampaigns.getCampaign({
            keyword: params.keyword || null,
            limit: 10,
            offset: 0,
          });

        commit(SET_CAMPAIGNS, response.body);
      } catch (e) {
        // TODO
      }
    },
  },

  mutations: {
    SET_CAMPAIGNS(state, payload) {
      state.campaigns = payload;
    },
  },
};
