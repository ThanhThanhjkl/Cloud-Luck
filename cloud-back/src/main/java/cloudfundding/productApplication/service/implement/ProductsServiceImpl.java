package cloudfundding.productApplication.service.implement;


import cloudfundding.productApplication.model.ProductsDTO;
import cloudfundding.productApplication.repository.ProductsRepository;
import cloudfundding.productApplication.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProductsServiceImpl implements ProductsService {

    @Autowired
    private ProductsRepository productsRepository;

    @Override
    public List<ProductsDTO> getAllProducts() {
        return productsRepository.getAllProducts();
    }

    @Override
    public List<ProductsDTO> getProductsByAccountId(Long accountId) {
        return productsRepository.getProductsByAccountId(accountId);
    }

    @Override
    public ProductsDTO getProductsById(Long id) {
        return productsRepository.getProductsById(id);
    }

    @Override
    public ResponseEntity<String> updateProduct(ProductsDTO products) {
        return productsRepository.updateProduct(products);
    }

    @Override
    public ResponseEntity<String> addProduct(ProductsDTO products) {
        return productsRepository.addProduct(products);
    }

    @Override
    public ResponseEntity<String> deleteProduct(Long id) {
        return productsRepository.deleteProduct(id);
    }
}
