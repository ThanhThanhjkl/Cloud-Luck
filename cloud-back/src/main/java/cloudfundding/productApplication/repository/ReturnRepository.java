package cloudfundding.productApplication.repository;

import cloudfundding.productApplication.model.ReturnDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReturnRepository {
    List<ReturnDTO> getReturnByProductId(int productId);

    ReturnDTO getReturnById(int id);

    ResponseEntity<String> updateReturn(ReturnDTO returnDTO);

    ResponseEntity<String> createReturn(ReturnDTO returnDTO);

    ResponseEntity<String> deleteReturn(int id);
}
