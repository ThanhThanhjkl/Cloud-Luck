package cloudfundding.accountApplication.repository;

import cloudfundding.accountApplication.entity.Suport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SuportRepository extends JpaRepository<Suport, Integer> {
    List<Suport> findAllByProductId(int productId);
}
