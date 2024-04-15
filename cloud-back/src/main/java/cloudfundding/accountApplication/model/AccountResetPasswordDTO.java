package cloudfundding.accountApplication.model;

import lombok.Data;

@Data
public class AccountResetPasswordDTO {
    private String email;
    private String password;
    private String confirmPassword;
}
