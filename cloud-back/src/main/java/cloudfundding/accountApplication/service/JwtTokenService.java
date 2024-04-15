package cloudfundding.accountApplication.service;

import cloudfundding.accountApplication.entity.Account;

import cloudfundding.accountApplication.repository.AccountRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Key;
import io.jsonwebtoken.security.Keys;
@Transactional
@Service
public class JwtTokenService implements TokenService {
    private static final long EXPIRATION_TIME = 864_000_000;
    private static final String SECRET_KEY = "thanhnv";

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public String generateToken(Account account) {
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        return Jwts.builder()
                .setSubject(account.getEmail())
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }
    @Override
    public void revokeToken(String email) {
        AccountRepository.deleteByEmail(email);
    }
}
