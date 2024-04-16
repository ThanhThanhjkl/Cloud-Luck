package cloudfundding.accountApplication.model;

import lombok.Data;

@Data
public class AccountDTO {
    private Long id;

    private String name;

    private String password;

    private String email;

    private String role;

    private String avatar;

    private String url;

    private String about;
}
