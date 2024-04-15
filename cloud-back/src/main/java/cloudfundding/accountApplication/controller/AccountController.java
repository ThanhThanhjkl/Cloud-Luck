package cloudfundding.accountApplication.controller;

import cloudfundding.accountApplication.model.AccountDTO;
import cloudfundding.accountApplication.model.AccountLoginDTO;
import cloudfundding.accountApplication.model.AccountResetPasswordDTO;
import cloudfundding.accountApplication.model.AccountTokenDTO;
import cloudfundding.accountApplication.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
public class AccountController {
    @Autowired
    private AccountService accountService;

    // add new
    @PostMapping("/account")
    public AccountDTO addAccount(@RequestBody AccountDTO accountDTO) {
        accountService.add(accountDTO);
        return accountDTO;
    }

    // Login
    @PostMapping("/account/login")
    public ResponseEntity<AccountTokenDTO> login(@RequestBody AccountLoginDTO accountLoginDTO, HttpServletResponse response) {
        AccountTokenDTO accountTokenDTO = accountService.login(accountLoginDTO, response);
        return ResponseEntity.ok(accountTokenDTO);
    }

    // Logout
    @DeleteMapping("/account/logout")
    public ResponseEntity<String> logout(@RequestBody String email) {
        accountService.logout(email);
        return ResponseEntity.ok("Logout successful");
    }

    // get all
    @GetMapping("/accounts")
    public List<AccountDTO> getAll() {
        return accountService.getAll();
    }

    // get by id
    @GetMapping("/account/{id}")
    public ResponseEntity<AccountDTO> getOne(@PathVariable(name = "id") Long id) {
        return Optional.of(new ResponseEntity<AccountDTO>(accountService.getOne(id), HttpStatus.OK)).orElse(new ResponseEntity<AccountDTO>(HttpStatus.NOT_FOUND));
    }

    // delete
    @DeleteMapping("/account/{id}")
    public void delete(@PathVariable(name = "id") Long id) {
        accountService.delete(id);
    }

    // update
    @PutMapping("/account")
    public void update(@RequestBody AccountDTO accountDTO) {
        accountService.update(accountDTO);
    }

    // update password
    @PutMapping("/account/password")
    public ResponseEntity<String> updatePassword(@RequestBody AccountResetPasswordDTO accountResetPasswordDTO) {
        if (!accountResetPasswordDTO.getPassword().equals(accountResetPasswordDTO.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Password and confirm password do not match");
        }
        accountService.updatePassword(accountResetPasswordDTO);
        return ResponseEntity.ok("Password updated successfully");
    }
}
