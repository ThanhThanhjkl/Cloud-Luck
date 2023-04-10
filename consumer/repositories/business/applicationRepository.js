const ENDPOINT = "/application";
export default ($businessApi) => ({
  getApplication() {
    return $businessApi.get(`${ENDPOINT}`, {
      toasted: false,
    });
  },

  updateApplication(params) {
    return $businessApi.put(`${ENDPOINT}`, params);
  },

  postApplication() {
    return $businessApi.post(`${ENDPOINT}`);
  },
});
