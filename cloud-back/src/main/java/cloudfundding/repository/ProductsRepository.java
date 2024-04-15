package cloudfundding.repository;

import cloudfundding.model.Products;

import java.util.List;

public interface ProductsRepository {
    List<Products> getAllProducts();

    Products getProductsById(Long id);

    void addProduct(Products products);
}
