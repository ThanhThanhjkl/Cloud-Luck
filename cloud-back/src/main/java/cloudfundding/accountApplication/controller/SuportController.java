package cloudfundding.accountApplication.controller;

import cloudfundding.accountApplication.model.CommentDTO;
import cloudfundding.accountApplication.model.SuportDTO;
import cloudfundding.accountApplication.service.SuportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SuportController {
    @Autowired
    private SuportService suportService;
    // create suport
    @PostMapping("/support")
    public ResponseEntity<String> createAddress(@RequestBody SuportDTO suportDTO) {
        suportService.createSuport(suportDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Address created successfully");
    }

    // get by product id
    @GetMapping("/support/{productId}")
    public List<SuportDTO> getByProductId(@PathVariable(name = "productId") int productId) {
        return suportService.getByProductId(productId);
    }

    // delete suport by id
    @DeleteMapping("/support/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable int id) {
        boolean isRemoved = suportService.deleteSupport(id);
        if (!isRemoved) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Support not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Support deleted successfully");
    }
}
