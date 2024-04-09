const ENDPOINT = "/authenticate";
export default ($authApi) => ({
  accountLogin(params) {
    return $authApi.post(`${ENDPOINT}/login`, params);
  },
  accountLogout() {
    return $authApi.delete(`${ENDPOINT}/login`);
  },
  activeAccount(params) {
    return $authApi.put(`${ENDPOINT}/activate`, params);
  },
  getLoggedUser() {
    return $authApi.get(`${ENDPOINT}`);
  },
  resetPassword(params) {
    return $authApi.put(`${ENDPOINT}/password`, params);
  },
  forgotPassword(params) {
    return $authApi.post(`${ENDPOINT}/forgot`, params);
  },
  accountRegister(params) {
    return $authApi.post(`${ENDPOINT}`, params);
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
