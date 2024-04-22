package cloudfundding.productApplication.controller;

import cloudfundding.productApplication.model.ReturnDTO;
import cloudfundding.productApplication.service.ReturnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReturnController {
    @Autowired
    private ReturnService returnService;

    @GetMapping("/returns/{productId}")
    public List<ReturnDTO> getReturnByProductId(@PathVariable(name = "productId") int productId) {
        return returnService.getReturnByProductId(productId);
    }

    @GetMapping("/return/{id}")
    public ReturnDTO getProductById(@PathVariable int id) {
        return returnService.getReturnById(id);
    }

    @PutMapping("/return/update")
    public ResponseEntity<String> updateReturn(@RequestBody ReturnDTO returnDTO) {
        return returnService.updateReturn(returnDTO);
    }

    @PostMapping("/return/create")
    public ResponseEntity<String> createReturn(@RequestBody ReturnDTO returnDTO) {
        return returnService.createReturn(returnDTO);
    }

    @DeleteMapping("/return/{id}")
    public ResponseEntity<String> deleteReturn(@PathVariable int id) {
        return returnService.deleteReturn(id);
    }
}
