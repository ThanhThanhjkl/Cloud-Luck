package cloudfundding.accountApplication.model;

import lombok.Data;

@Data
public class AccountChangePasswordDTO {
    private Long id;
    private String password;
    private String newPassword;
    private String confirmPassword;
}
