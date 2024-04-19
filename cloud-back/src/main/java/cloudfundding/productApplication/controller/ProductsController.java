package cloudfundding.productApplication.controller;

import cloudfundding.productApplication.model.Products;
import cloudfundding.productApplication.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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
    public List<Products> productsList() {
        return productsService.getAllProducts();
    }

    @GetMapping("/products/{id}")
    public Products getProductById(@PathVariable Long id) {
        return productsService.getProductsById(id);
    }

    @PostMapping("/product")
    public String addProduct(HttpServletRequest request, @ModelAttribute(name = "product") Products products) {
        productsService.addProduct(products);
        return "redirect:/products/list";
    }
}
