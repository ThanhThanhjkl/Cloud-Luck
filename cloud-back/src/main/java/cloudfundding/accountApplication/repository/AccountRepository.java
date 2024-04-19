package cloudfundding.accountApplication.repository;

import cloudfundding.accountApplication.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByEmail(String email);
    static void deleteByEmail(String email) {
    }
}
