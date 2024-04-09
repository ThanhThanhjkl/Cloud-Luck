package cloudfundding.controller;

import cloudfundding.model.Person;
import cloudfundding.model.Products;
import cloudfundding.service.PersonService;
import cloudfundding.service.ProductsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MainController {
    @Autowired
    private PersonService personService;

    @Autowired
    private ProductsService productsService;

    @Autowired
    Environment environment;

    @GetMapping("/products/list")
    public List<Products> productsList() {
        return productsService.getAllProducts();
    }

    @PostMapping("/product")
    public String addProduct(HttpServletRequest request, @ModelAttribute(name = "product") Products products) {
        productsService.addProduct(products);
        return "redirect:/products/list";
    }

    @GetMapping(value = "/persons")
    public String persons(HttpServletRequest request, Model model) {
        List<Person> persons = personService.getAllPersons();
        request.setAttribute("persons", persons);
        model.addAttribute("person", new Person(1, "thanhnv"));
        return "persons";
    }

    @GetMapping("/person/list")
    public List<Person> personList() {
        return personService.getAllPersons();
    }
}
