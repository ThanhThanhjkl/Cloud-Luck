package cloudfundding.accountApplication.service;

import cloudfundding.accountApplication.entity.Account;
import cloudfundding.accountApplication.model.AccountDTO;
import cloudfundding.accountApplication.model.AccountLoginDTO;
import cloudfundding.accountApplication.model.AccountResetPasswordDTO;
import cloudfundding.accountApplication.model.AccountTokenDTO;
import cloudfundding.accountApplication.repository.AccountRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

public interface AccountService {
    void add(AccountDTO accountDTO);

    void update(AccountDTO accountDTO);

    void updatePassword(AccountResetPasswordDTO accountResetPasswordDTO);

    void delete(Long id);

    AccountTokenDTO login(AccountLoginDTO accountLoginDTO, HttpServletResponse response);

    void logout(String email);

    List<AccountDTO> getAll();

    AccountDTO getOne(Long id);
}

@Transactional
@Service
class AccountServiceImpl implements AccountService {
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    TokenService tokenService;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public void add(AccountDTO accountDTO) {
        Account account = modelMapper.map(accountDTO, Account.class);
        account.setPassword(new BCryptPasswordEncoder().encode(accountDTO.getPassword()));
        accountRepository.save(account);
        accountDTO.setId(account.getId());
    }

    @Override
    public AccountTokenDTO login(AccountLoginDTO accountLoginDTO, HttpServletResponse response) {
        Account account = accountRepository.findByEmail(accountLoginDTO.getEmail());
        if (account != null) {
            if (new BCryptPasswordEncoder().matches(accountLoginDTO.getPassword(), account.getPassword())) {
                String token = tokenService.generateToken(account);
                response.setHeader("Authorization", "Bearer " + token);
                AccountTokenDTO accountTokenDTO = new AccountTokenDTO();
                accountTokenDTO.setToken(token);
                accountTokenDTO.setMessage("Success");
                return accountTokenDTO;

            } else {
                AccountTokenDTO accountTokenDTO = new AccountTokenDTO();
                accountTokenDTO.setMessage("Login failed! Incorrect password.");
                return accountTokenDTO;
            }
        } else {
            AccountTokenDTO accountTokenDTO = new AccountTokenDTO();
            accountTokenDTO.setMessage("Login failed! Account with provided email does not exist.");
            return accountTokenDTO;
        }
    }

    @Override
    public void logout(String email) {
        tokenService.revokeToken(email);
    }

    @Override
    public void update(AccountDTO accountDTO) {
        Account account = accountRepository.getById(accountDTO.getId());
        modelMapper.typeMap(AccountDTO.class, Account.class).addMappings(mapper -> mapper.skip(Account::setPassword)).map(accountDTO, account);
        accountRepository.save(account);
    }

    @Override
    public void updatePassword(AccountResetPasswordDTO accountResetPasswordDTO) {
        if (!accountResetPasswordDTO.getPassword().equals(accountResetPasswordDTO.getConfirmPassword())) {
            throw new IllegalArgumentException("Password and confirmPassword do not match");
        }
        String encodedPassword = new BCryptPasswordEncoder().encode(accountResetPasswordDTO.getPassword());
        String email = accountResetPasswordDTO.getEmail();
        Account account = accountRepository.findByEmail(email);
        if (account == null) {
            throw new IllegalArgumentException("Account not found for email: " + email);
        }
        account.setPassword(encodedPassword);
        accountRepository.save(account);
    }


    @Override
    public void delete(Long id) {
        Account account = accountRepository.getById(id);
        accountRepository.delete(account);
    }

    @Override
    public List<AccountDTO> getAll() {
        List<AccountDTO> accountDTOs = new ArrayList<>();
        accountRepository.findAll().forEach((account) -> {
            accountDTOs.add(modelMapper.map(account, AccountDTO.class));
        });
        return accountDTOs;
    }

    @Override
    public AccountDTO getOne(Long id) {
        Account account = accountRepository.getById(id);
        return modelMapper.map(account, AccountDTO.class);
    }
}

