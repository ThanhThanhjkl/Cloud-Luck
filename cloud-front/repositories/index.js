import consumerCampaignRepository from "./consumers/campaignRepository";

export default ($api) => ({
  consumerCampaigns: consumerCampaignRepository($api),
});
