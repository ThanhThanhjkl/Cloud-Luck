package cloudfundding.repository;

import cloudfundding.model.Products;

import java.util.List;

public interface ProductsRepository {
    public List<Products> getAllProducts();
    public void addProduct(Products products);
}
