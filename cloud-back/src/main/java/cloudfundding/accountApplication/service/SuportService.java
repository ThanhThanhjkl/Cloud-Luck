package cloudfundding.accountApplication.service;

import cloudfundding.accountApplication.entity.Suport;
import cloudfundding.accountApplication.model.SuportDTO;
import cloudfundding.accountApplication.repository.SuportRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public interface SuportService {
    SuportDTO createSuport(SuportDTO suportDTO);

    List<SuportDTO> getByProductId(int productId);
}

@Transactional
@Service
class SuportServiceImpl implements SuportService {
    @Autowired
    SuportRepository suportRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public SuportDTO createSuport(SuportDTO suportDTO) {
        Suport suport = modelMapper.map(suportDTO, Suport.class);
        suport.setDate(String.valueOf(LocalDateTime.now()));
        Suport savedSuport = suportRepository.save(suport);
        return modelMapper.map(savedSuport, SuportDTO.class);
    }

    @Override
    public List<SuportDTO> getByProductId(int productId) {
        List<SuportDTO> suportDTOs = new ArrayList<>();
        List<Suport> Suport = suportRepository.findAllByProductId(productId);
        for (Suport suport : Suport) {
            suportDTOs.add(modelMapper.map(suport, SuportDTO.class));
        }
        return suportDTOs;
    }
//
//    @Override
//    public boolean deleteComment(int id) {
//        if (commentRepository.existsById(id)) {
//            commentRepository.deleteById(id);
//            return true;
//        }
//        return false;
//    }
}
