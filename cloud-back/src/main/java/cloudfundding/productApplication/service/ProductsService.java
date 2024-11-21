package cloudfundding.productApplication.service;

import cloudfundding.productApplication.model.ProductsDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductsService {
    List<ProductsDTO> getAllProducts();

    List<ProductsDTO> getProductsByAccountId(Long accountId);

    ProductsDTO getProductsById(Long id);

    ResponseEntity<String> updateProduct(ProductsDTO products);

    ResponseEntity<String> addProduct(ProductsDTO products);

    ResponseEntity<String> deleteProduct(Long id);
}
