package cloudfundding.accountApplication.controller;

import cloudfundding.accountApplication.model.AddressDTO;
import cloudfundding.accountApplication.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AddressController {
    @Autowired
    private AddressService addressService;

    // get all
    @GetMapping("/address")
    public List<AddressDTO> getAll() {
        return addressService.getAll();
    }

    // get by id
    @GetMapping("/address/{accountId}")
    public List<AddressDTO> getByAccountId(@PathVariable(name = "accountId") int accountId) {
        return addressService.getByAccountId(accountId);
    }

    // get by id
    @GetMapping("/address/detail/{id}")
    public AddressDTO getOne(@PathVariable(name = "id") int id) {
        return addressService.getOne(id);
    }
}
