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
});
