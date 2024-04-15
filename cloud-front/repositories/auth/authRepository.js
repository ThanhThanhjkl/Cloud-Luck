const ENDPOINT = "/account";
export default ($authApi) => ({
  // NEW UPDATE
  accountRegister(params) {
    return $authApi.post(`${ENDPOINT}`, params);
  },
  forgotPassword(params) {
    return $authApi.put(`${ENDPOINT}/password`, params);
  },
  accountLogin(params) {
    return $authApi.post(`${ENDPOINT}/login`, params);
  },
  // getLoggedUser() {
  //   return $authApi.get(`${ENDPOINT}` + "s");
  // },
  accountLogout() {
    return $authApi.delete(`${ENDPOINT}/login`);
  },

  // ABCD
  activeAccount(params) {
    return $authApi.put(`${ENDPOINT}/activate`, params);
  },
  resetPassword(params) {
    return $authApi.put(`${ENDPOINT}/password`, params);
  },
  changePassword(params) {
    return $authApi.put(`${ENDPOINT}/password`, params);
  },
  createToken(params) {
    return $authApi.post(`${ENDPOINT}/token`, params);
  },
  deactivateUser() {
    return $authApi.delete(`${ENDPOINT}`);
  },
  getRedirectInstagram() {
    return $authApi.get(`${ENDPOINT}/instagram`);
  },
  getRedirectTwitter() {
    return $authApi.get(`${ENDPOINT}/twitter`);
  },
  getRedirectLine() {
    return $authApi.get(`${ENDPOINT}/line`);
  },
});
