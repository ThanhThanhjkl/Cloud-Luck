// Consummer
import consumerCampaignRepository from "./consumers/campaignRepository";
import consumerAccountRepository from "./consumers/accountRepository";

export default ($api) => ({
  // Consummer
  consumerCampaigns: consumerCampaignRepository($api),
  consumerAccounts: consumerAccountRepository($api),
});
