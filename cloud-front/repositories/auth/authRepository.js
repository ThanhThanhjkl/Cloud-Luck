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
  accountLogout() {
    return $authApi.delete(`${ENDPOINT}/login`);
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
});
