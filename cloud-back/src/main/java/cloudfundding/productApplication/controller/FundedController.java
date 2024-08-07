package cloudfundding.productApplication.controller;

import cloudfundding.productApplication.model.FundedDTO;
import cloudfundding.productApplication.model.ProductsDTO;
import cloudfundding.productApplication.service.FundedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FundedController {
    @Autowired
    private FundedService fundedService;
    @Autowired
    Environment environment;

    @PostMapping("/funded")
    public ResponseEntity<String> addFunded(@RequestBody FundedDTO funded) {
        return fundedService.addFunded(funded);
    }

    @DeleteMapping("/funded/{id}")
    public ResponseEntity<String> deleteFunded(@PathVariable int id) {
        return fundedService.deleteFunded(id);
    }

    @GetMapping("/funded/{accountId}")
    public List<FundedDTO> getFundedByAccountId(@PathVariable Long accountId) {
        return fundedService.getFundedByAccountId(accountId);
    }

    @GetMapping("/funded/mine/{ownerId}")
    public List<FundedDTO> getFundedByOwnerId(@PathVariable Long ownerId) {
        return fundedService.getFundedByOwnerId(ownerId);
    }
}
