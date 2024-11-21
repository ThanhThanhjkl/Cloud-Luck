package cloudfundding.accountApplication.service;

import cloudfundding.accountApplication.entity.Address;
import cloudfundding.accountApplication.entity.Rating;
import cloudfundding.accountApplication.model.AddressDTO;
import cloudfundding.accountApplication.model.RatingDTO;
import cloudfundding.accountApplication.repository.RatingRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

public interface RatingService {
    List<RatingDTO> getByProductId(int productId);

    RatingDTO createRating(RatingDTO ratingDTO);

    boolean deleteRating(int id);

}

@Transactional
@Service

class RatingServiceImpl implements RatingService {
    @Autowired
    RatingRepository ratingRepository;

    @Autowired
    TokenService tokenService;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<RatingDTO> getByProductId(int productId) {
        List<RatingDTO> ratingDTOs = new ArrayList<>();
        List<Rating> ratings = ratingRepository.findAllByProductId(productId);
        for (Rating rating : ratings) {
            ratingDTOs.add(modelMapper.map(rating, RatingDTO.class));
        }
        return ratingDTOs;
    }

    @Override
    public RatingDTO createRating(RatingDTO ratingDTO) {
        
        Rating rating = modelMapper.map(ratingDTO, Rating.class);
        rating.setProductId(Math.toIntExact(ratingDTO.getProductId()));
        rating.setAccountId(Math.toIntExact(ratingDTO.getAccountId()));
        rating.setContents(ratingDTO.getContents());
        rating.setImage(ratingDTO.getImage());

        Rating savedRating = ratingRepository.save(rating);
        return modelMapper.map(savedRating, RatingDTO.class);
    }

    @Override
    public boolean deleteRating(int id) {
        if (ratingRepository.existsById(id)) {
            ratingRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
