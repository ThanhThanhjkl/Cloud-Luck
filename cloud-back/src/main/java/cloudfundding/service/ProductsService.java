package cloudfundding.service;

import cloudfundding.model.Products;

import java.util.List;
public interface ProductsService {
    List<Products> getAllProducts();
    Products getProductsById(Long id);
    void addProduct(Products products);
}
