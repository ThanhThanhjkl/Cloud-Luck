package cloudfundding.service.implement;


import cloudfundding.model.Products;
import cloudfundding.repository.ProductsRepository;
import cloudfundding.service.ProductsService;
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
    public void addProduct(Products products) {
        productsRepository.addProduct(products);
    }
}
