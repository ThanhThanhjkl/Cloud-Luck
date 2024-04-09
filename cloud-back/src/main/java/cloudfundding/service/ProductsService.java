package cloudfundding.service;

import cloudfundding.model.Products;

import java.util.List;
public interface ProductsService {
    public List<Products> getAllProducts();
    public void addProduct(Products products);
}
