package cloudfundding.productApplication.service.implement;

import cloudfundding.productApplication.model.FundedDTO;
import cloudfundding.productApplication.model.ProductsDTO;
import cloudfundding.productApplication.repository.FundedRepository;
import cloudfundding.productApplication.service.FundedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FundedServiceImpl implements FundedService {
    @Autowired
    private FundedRepository fundedRepository;

    @Override
    public ResponseEntity<String> addFunded(FundedDTO funded) {
        return fundedRepository.addFunded(funded);
    }

    @Override
    public List<FundedDTO> getFundedByAccountId(Long accountId) {
        return fundedRepository.getFundedByAccountId(accountId);
    }

    @Override
    public ResponseEntity<String> deleteFunded(int id) {
        return fundedRepository.deleteFunded(id);
    }
}
