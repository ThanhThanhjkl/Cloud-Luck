// Consummer
import consumerCampaignRepository from "./consumers/campaignRepository";
import consumerAccountRepository from "./consumers/accountRepository";

// Business
import businessCapaignRepositories from "./business/campaignRepository";
import businessApplicationRepositories from "./business/applicationRepository";

export default ($api) => ({
  // Consummer
  consumerCampaigns: consumerCampaignRepository($api),
  consumerAccounts: consumerAccountRepository($api),

  // Business
  businessCampaigns: businessCapaignRepositories($api),
  businessApplication: businessApplicationRepositories($api),
});
