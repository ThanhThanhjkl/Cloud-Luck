package cloudfundding.accountApplication.model;

import lombok.Data;

@Data
public class AddressDTO {
    private int id;
    private String name;
    private String postCode;
    private String prefectures;
    private String district;
    private String street;
    private String phone;
    private String accountId;
    private String defaultSelect;
}
