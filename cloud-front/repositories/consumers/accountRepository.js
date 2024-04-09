const ENDPOINT = "/account";

export default ($consumerApi) => ({
  getProfile() {
    return $consumerApi.get(`${ENDPOINT}`);
  },
  updateProfile(params) {
    return $consumerApi.put(`${ENDPOINT}`, params);
  },
  getAccountDetail(id) {
    return $consumerApi.get(`${ENDPOINT}/${id}`);
  },

  /* ACCOUNT ADDRESS */
  getAccountAddress(params) {
    return $consumerApi.get(`${ENDPOINT}/${params}/address`);
  },

  createAccountAddress(accountId, params) {
    return $consumerApi.post(`${ENDPOINT}/${accountId}/address`, params);
  },

  updateAccountAddress(id, addressId, payload) {
    return $consumerApi.put(`${ENDPOINT}/${id}/address/${addressId}`, payload);
  },

  deleteAccountAddress(accountId, addressId) {
    return $consumerApi.delete(`${ENDPOINT}/${accountId}/address/${addressId}`);
  },
  postChangingDefaultAddress(accountId, addressId) {
    return $consumerApi.post(`${ENDPOINT}/${accountId}/address/${addressId}`);
  },

  getAccountMail(accountId) {
    return $consumerApi.get(`${ENDPOINT}/${accountId}/mail`, accountId);
  },

  updateAccountMail(accountId, mailSettingId, params) {
    return $consumerApi.put(
      `${ENDPOINT}/${accountId}/mail/${mailSettingId}`,
      params
    );
  },

  /* ACCOUNT CARD */
  getAccountCards(id) {
    return $consumerApi.get(`/account/${id}/card`);
  },
  putAccountCard(params) {
    return $consumerApi.put(
      `/account/${params.id}/card/${params.cardId}`,
      params.body
    );
  },
  postAccountCard(params) {
    return $consumerApi.post(`/account/${params.id}/card`, params.body);
  },
  deleteAccountCard(params) {
    return $consumerApi.delete(`/account/${params.id}/card/${params.cardId}`);
  },
});
