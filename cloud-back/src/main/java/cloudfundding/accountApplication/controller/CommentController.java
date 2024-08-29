package cloudfundding.accountApplication.controller;

import cloudfundding.accountApplication.model.CommentDTO;
import cloudfundding.accountApplication.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {
    @Autowired
    private CommentService commentService;
    // create address
    @PostMapping("/comment")
    public ResponseEntity<String> createAddress(@RequestBody CommentDTO commentDTO) {
        commentService.createComment(commentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body("Address created successfully");
    }

    // get by product id
    @GetMapping("/comment/{productId}")
    public List<CommentDTO> getByProductId(@PathVariable(name = "productId") int productId) {
        return commentService.getByProductId(productId);
    }

    // delete comment by id
    @DeleteMapping("/comment/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable int id) {
        boolean isRemoved = commentService.deleteComment(id);
        if (!isRemoved) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Address not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body("Address deleted successfully");
    }
}
