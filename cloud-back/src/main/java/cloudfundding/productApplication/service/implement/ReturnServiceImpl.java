package cloudfundding.productApplication.service.implement;

import cloudfundding.productApplication.model.ReturnDTO;
import cloudfundding.productApplication.repository.ReturnRepository;
import cloudfundding.productApplication.service.ReturnService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
class ReturnServiceImpl implements ReturnService {
    @Autowired
    ReturnRepository returnRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<ReturnDTO> getReturnByProductId(int productId) {
        return returnRepository.getReturnByProductId(productId);
    }

    @Override
    public ReturnDTO getReturnById(int id) {
        return returnRepository.getReturnById(id);
    }

    @Override
    public ResponseEntity<String> updateReturn(ReturnDTO returnDTO) {
        return returnRepository.updateReturn(returnDTO);
    }

    @Override
    public ResponseEntity<String> createReturn(ReturnDTO returnDTO) {
        return returnRepository.createReturn(returnDTO);
    }

    @Override
    public ResponseEntity<String> deleteReturn(int id) {
        return returnRepository.deleteReturn(id);
    }
}
