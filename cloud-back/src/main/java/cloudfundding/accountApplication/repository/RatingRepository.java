package cloudfundding.accountApplication.repository;

import cloudfundding.accountApplication.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Integer> {
    List<Rating> findAllByProductId(int accountId);
}
