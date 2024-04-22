package cloudfundding.productApplication.repository;

import cloudfundding.productApplication.model.ProductsDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductsRepository {
    List<ProductsDTO> getAllProducts();

    List<ProductsDTO> getProductsByAccountId(Long id);

    ProductsDTO getProductsById(Long id);

    ResponseEntity<String> updateProduct(ProductsDTO products);

    void addProduct(ProductsDTO products);
}
