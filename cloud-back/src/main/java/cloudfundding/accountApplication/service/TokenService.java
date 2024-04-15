package cloudfundding.accountApplication.service;

import cloudfundding.accountApplication.entity.Account;

public interface TokenService {
    String generateToken(Account account);
    void revokeToken(String email);
}
