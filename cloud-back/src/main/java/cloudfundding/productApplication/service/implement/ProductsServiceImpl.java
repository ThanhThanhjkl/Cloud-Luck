package cloudfundding.productApplication.service.implement;


import cloudfundding.productApplication.model.Products;
import cloudfundding.productApplication.repository.ProductsRepository;
import cloudfundding.productApplication.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Override
    public List<Products> getAllProducts() {
        return productsRepository.getAllProducts();
    }

    @Override
    public Products getProductsById(Long id) {
        return productsRepository.getProductsById(id);
    }

    @Override
    public void addProduct(Products products) {
        productsRepository.addProduct(products);
    }
}
