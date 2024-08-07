const ENDPOINT = "/account";
export default ($authApi) => ({
  // NEW UPDATE
  accountRegister(params) {
    return $authApi.post(`${ENDPOINT}`, params);
  },
  forgotPassword(params) {
    return $authApi.put(`${ENDPOINT}/forgot`, params);
  },
  accountLogin(params) {
    return $authApi.post(`${ENDPOINT}/login`, params);
  },
  accountLogout(params) {
    return $authApi.delete(`${ENDPOINT}/logout`, params);
  },
  getAccount(params) {
    return $authApi.get(`${ENDPOINT}/${params}`);
  },

  updateAccount(params) {
    return $authApi.put(`${ENDPOINT}`, params);
  },

  changePassword(params) {
    return $authApi.put(`${ENDPOINT}/password`, params);
  },
  getAddressByAccountId(params) {
    return $authApi.get(`/address/${params}`);
  },
  getAccountAddress(params) {
    return $authApi.get(`/address/detail/${params}`);
  },
  createAccountAddress(params) {
    return $authApi.post(`/address`, params);
  },
  updateAccountAddress(params) {
    return $authApi.put(`/address`, params);
  },
  deleteAccountAddress(id) {
    return $authApi.delete(`/address/${id}`);
  },
});
