package cloudfundding.accountApplication.controller;

import cloudfundding.accountApplication.model.AddressDTO;
import cloudfundding.accountApplication.model.RatingDTO;
import cloudfundding.accountApplication.service.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RatingController {
    @Autowired
    private RatingService ratingService;

    // get by id
    @GetMapping("/rating/{productId}")
    public List<RatingDTO> getByAccountId(@PathVariable(name = "productId") int productId) {
        return ratingService.getByProductId(productId);
    }

    // create address
    @PostMapping("/rating")
    public ResponseEntity<String> createAddress(@RequestBody RatingDTO ratingDTO) {
        ratingService.createRating(ratingDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Rating created successfully");
    }

    // Delete address
    @DeleteMapping("/rating/{id}")
    public ResponseEntity<String> deleteAddress(@PathVariable int id) {
        boolean isRemoved = ratingService.deleteRating(id);
        if (!isRemoved) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Rating not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Rating deleted successfully");
    }
}
