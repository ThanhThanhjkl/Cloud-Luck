package cloudfundding.productApplication.service;

import cloudfundding.productApplication.model.Products;

import java.util.List;
public interface ProductsService {
    List<Products> getAllProducts();
    Products getProductsById(Long id);
    void addProduct(Products products);
}
