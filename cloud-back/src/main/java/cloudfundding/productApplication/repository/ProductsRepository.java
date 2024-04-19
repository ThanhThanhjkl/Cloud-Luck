package cloudfundding.productApplication.repository;

import cloudfundding.productApplication.model.Products;

import java.util.List;

public interface ProductsRepository {
    List<Products> getAllProducts();

    Products getProductsById(Long id);

    void addProduct(Products products);
}
