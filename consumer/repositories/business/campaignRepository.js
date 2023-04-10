const ENDPOINT = "/campaign";
export default ($businessApi) => ({
  // TODO remove
  createDummy() {
    return $businessApi.post("/dummy");
  },

  getCampaignReturn(id) {
    return $businessApi.get(`${ENDPOINT}/${id}/return`);
  },

  updateReturnPlan(payload) {
    return $businessApi.put(
      `/campaign/${payload.id}/return/${payload.returnId}`,
      payload.body
    );
  },

  publishCampaign(id, params) {
    return $businessApi.put(`${ENDPOINT}/${id}`, params);
  },

  createReturnPlan(params) {
    return $businessApi.post(`/campaign/${params.id}/return`, params.body);
  },

  deleteReturnPlan(params) {
    return $businessApi.delete(
      `/campaign/${params.id}/return/${params.returnId}`
    );
  },

  getCampaigns() {
    return $businessApi.get(`${ENDPOINT}`);
  },

  getCampaignDetail(id) {
    return $businessApi.get(`${ENDPOINT}/${id}`);
  },

  postCampaignDetail(campaignId, params) {
    return $businessApi.post(`/campaign/${campaignId}`, params);
  },

  postImagesReturn(params) {
    return $businessApi.post(
      `/campaign/${params.id}/return/${params.returnId}/image`,
      params.formData
    );
  },

  deleteImageReturn(params) {
    return $businessApi.delete(
      `/campaign/${params.id}/return/${params.returnId}/image/${params.imageId}`
    );
  },

  // Image
  getImage(id) {
    return `${process.env.businessApiUrl}/file/${id}`;
  },

  postImage(params) {
    return $businessApi.post("/file", params);
  },

  deleteImage(id) {
    return $businessApi.delete(`/file/${id}`);
  },

  // report
  postReport(params) {
    return $businessApi.post(`/campaign/${params.id}/note`, params.report);
  },
});
