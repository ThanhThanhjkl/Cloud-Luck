package cloudfundding.productApplication.service;

import cloudfundding.productApplication.model.ReturnDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReturnService {
    List<ReturnDTO> getReturnByProductId(int productId);

    ReturnDTO getReturnById(int id);

    ResponseEntity<String> updateReturn(ReturnDTO returnDTO);

    ResponseEntity<String> createReturn(ReturnDTO returnDTO);

    ResponseEntity<String> deleteReturn(int id);

}

