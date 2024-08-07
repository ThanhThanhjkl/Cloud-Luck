package cloudfundding.productApplication.repository;

import cloudfundding.productApplication.model.FundedDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FundedRepository {
    ResponseEntity<String> addFunded(FundedDTO funded);

    List<FundedDTO> getFundedByAccountId(Long id);

    List<FundedDTO> getFundedByOwnerId(Long id);

    ResponseEntity<String> deleteFunded(int id);
}
