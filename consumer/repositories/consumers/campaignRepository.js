import qs from "qs";
const LIMIT = 12;
const PAGE = 0;

const paramsSerializer = (params = {}) =>
  qs.stringify(params, { arrayFormat: "brackets" });

export default ($consumerApi) => ({
  getCampaign(params) {
    return $consumerApi.get("/campaign", {
      params,
      paramsSerializer,
    });
  },
  getCampaignDetail(id) {
    return $consumerApi.get(`/campaign/${id}`);
  },
  getCampaignNote(id) {
    return $consumerApi.get(`/campaign/${id}/note?limit=10&offset=0`);
  },
  getCampaignNoteDetail(id, noteId) {
    return $consumerApi.get(`/campaign/${id}/note/${noteId}`);
  },
  getCampaignFavorite(id) {
    return $consumerApi.get(`/campaign/${id}/favorite`);
  },
  postCampaignFavorite(id) {
    return $consumerApi.post(`/campaign/${id}/favorite`);
  },
  deleteCampaignFavorite(id) {
    return $consumerApi.delete(`/campaign/${id}/favorite`);
  },
  getCampaignYell(params) {
    const page = params.page || PAGE;
    return $consumerApi.get(
      `/campaign/${params.id}/yell?limit=${LIMIT}&offset=${page}`
    );
  },
  getComments(params) {
    const page = params.page || PAGE;
    return $consumerApi.get(
      `/campaign/${params.id}/comment?limit=${LIMIT}&offset=${page}`
    );
  },
  postComment(id, params) {
    return $consumerApi.post(`/campaign/${id}/comment`, params);
  },
  deleteComment(id, commentId) {
    return $consumerApi.delete(`/campaign/${id}/comment/${commentId}`);
  },

  // Donation;

  postDonation(params) {
    return $consumerApi.post(`/donation`, params.body);
  },
  getQuotation(params) {
    return $consumerApi.post(`/donation/quotation`, params);
  },
  getDonations() {
    return $consumerApi.get(`/donation`);
  },

  // campaign return api
  getCampaignReturn(id) {
    return $consumerApi.get(`/campaign/${id}/return`);
  },
  getCampaignReturnDetail(params) {
    return $consumerApi.get(`/campaign/${params.id}/return/${params.returnId}`);
  },
});
