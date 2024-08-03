package cloudfundding.productApplication.controller;

import cloudfundding.productApplication.model.ProductsDTO;
import cloudfundding.productApplication.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class ProductsController {
    @Autowired
    private ProductsService productsService;

    @Autowired
    Environment environment;

    @GetMapping("/products")
    public List<ProductsDTO> productsList() {
        return productsService.getAllProducts();
    }

    @GetMapping("/products/{accountId}")
    public List<ProductsDTO> getProductsByAccountId(@PathVariable Long accountId) {
        return productsService.getProductsByAccountId(accountId);
    }

    @GetMapping("/product/{id}")
    public ProductsDTO getProductById(@PathVariable Long id) {
        return productsService.getProductsById(id);
    }

    @PutMapping("/product")
    public ResponseEntity<String> updateProduct(@RequestBody ProductsDTO products) {
        return productsService.updateProduct(products);
    }

    @PostMapping("/product")
    public ResponseEntity<String> addProduct(@RequestBody ProductsDTO products) {
        return productsService.addProduct(products);
    }
}
