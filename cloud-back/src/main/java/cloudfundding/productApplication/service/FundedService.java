package cloudfundding.productApplication.service;

import cloudfundding.productApplication.model.FundedDTO;
import cloudfundding.productApplication.model.ProductsDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FundedService {
    ResponseEntity<String> addFunded(FundedDTO funded);

    List<FundedDTO> getFundedByAccountId(Long accountId);

    ResponseEntity<String> deleteFunded(int id);
}
