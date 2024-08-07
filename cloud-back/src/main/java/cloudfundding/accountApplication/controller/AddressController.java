package cloudfundding.accountApplication.controller;

import cloudfundding.accountApplication.model.AddressDTO;
import cloudfundding.accountApplication.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    // create address
    @PostMapping("/address")
    public ResponseEntity<String> createAddress(@RequestBody AddressDTO addressDTO) {
        addressService.createAddress(addressDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Address created successfully");
    }

    // update address
    @PutMapping("/address")
    public ResponseEntity<String> updateAddress(@RequestBody AddressDTO addressDTO) {
        addressService.updateAddress(addressDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Address updated successfully");
    }

    // Delete address
    @DeleteMapping("/address/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable int id) {
        boolean isRemoved = addressService.deleteAddress(id);
        if (!isRemoved) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Address not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Address deleted successfully");
    }

}
