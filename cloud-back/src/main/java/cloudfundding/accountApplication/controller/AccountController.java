package cloudfundding.accountApplication.controller;

import cloudfundding.accountApplication.model.*;
import cloudfundding.accountApplication.service.AccountService;
import cloudfundding.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
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
    public ResponseEntity<String> update(@RequestBody AccountDTO accountDTO) {
        if (accountDTO.getAvatar() != null) {
            String imageUrl = accountDTO.getAvatar();
            byte[] avatar = ImageUtils.extractImageData(imageUrl);
            accountDTO.setAvatar(Base64.getEncoder().encodeToString(avatar));
        }
        accountService.update(accountDTO);
        return ResponseEntity.status(HttpStatus.OK).body("updated successfully");
    }

    // update password
    @PutMapping("/account/forgot")
    public ResponseEntity<String> updatePassword(@RequestBody AccountResetPasswordDTO accountResetPasswordDTO) {
        if (!accountResetPasswordDTO.getPassword().equals(accountResetPasswordDTO.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Password and confirm password do not match");
        }
        accountService.updatePassword(accountResetPasswordDTO);
        return ResponseEntity.ok("Password updated successfully");
    }

    // change password
    @PutMapping("/account/password")
    public ResponseEntity<String> changesPassword(@RequestBody AccountChangePasswordDTO accountChangePasswordDTO) {
        if (!accountChangePasswordDTO.getNewPassword().equals(accountChangePasswordDTO.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("New password and confirm password do not match");
        }
        accountService.changePassword(accountChangePasswordDTO);
        return ResponseEntity.ok("Password updated successfully");
    }
}
