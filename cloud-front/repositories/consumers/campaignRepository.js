export default ($consumerApi) => ({
  getProducts(params) {
    return $consumerApi.get("/products");
  },
  getProductsByAccountId(params) {
    return $consumerApi.get(`/products/${params}`);
  },
  getProductsDetail(params) {
    return $consumerApi.get(`/product/${params}`);
  },
  updateProduct(params) {
    return $consumerApi.put(`/product/`, params);
  },
  createProduct(params) {
    return $consumerApi.post(`/product/`, params);
  },
  deleteProduct(params) {
    return $consumerApi.delete(`/product/${params}`);
  },
  getReturnsByProductId(params) {
    return $consumerApi.get(`/returns/${params}`);
  },
  getReturnById(params) {
    return $consumerApi.get(`/return/${params}`);
  },
  updateReturn(params) {
    return $consumerApi.put(`/return/update`, params);
  },
  createReturn(params) {
    return $consumerApi.post(`/return/create`, params);
  },
  deleteReturn(params) {
    return $consumerApi.delete(`/return/${params}`);
  },
  createFunded(params) {
    return $consumerApi.post(`/funded`, params);
  },
  getFundedByAccountId(params) {
    return $consumerApi.get(`/funded/${params}`);
  },
  getFundedByOwnerId(params) {
    return $consumerApi.get(`/funded/mine/${params}`);
  },
  deleteFundedById(params) {
    return $consumerApi.delete(`/funded/${params}`);
  },
  createComment(params) {
    return $consumerApi.post(`/comment`, params);
  },
  getCommentsByProductId(params) {
    return $consumerApi.get(`/comment/${params}`);
  },
  deleteCommentById(params) {
    return $consumerApi.delete(`/comment/${params}`);
  },
  createSuport(params) {
    return $consumerApi.post(`/support`, params);
  },
  getSuportsByProductId(params) {
    return $consumerApi.get(`/support/${params}`);
  },
  deleteSupportById(params) {
    return $consumerApi.delete(`/support/${params}`);
  },
  createRating(params) {
    return $consumerApi.post(`/rating`, params);
  },
  getRatingByProductId(params) {
    return $consumerApi.get(`/rating/${params}`);
  },
  deleteRatingById(params) {
    return $consumerApi.delete(`/rating/${params}`);
  },
});
