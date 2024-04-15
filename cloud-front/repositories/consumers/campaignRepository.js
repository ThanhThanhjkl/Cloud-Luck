export default ($consumerApi) => ({
  getProducts(params) {
    return $consumerApi.get("/products");
  },

  getProductsDetail(params) {
    return $consumerApi.get(`/products/${params}`);
  },
});
